import React, { useMemo, useState, useEffect } from "react";
import * as d3 from "d3";
import WatchDashes from "./WatchDashes";

const MARGIN = 50;
const BAR_PADDING = 0;
const COLORS = ["#69c781", "#6689c6"];

export default function CircularBarplot({ width, height, data }) {
  const innerRadius = (Math.min(width, height) / 2) * 0.2;
  const outerRadius = Math.min(width, height) / 2 - MARGIN;

  const groups = [...new Set(data.map((d) => d.group))];
  const subGroups = [...new Set(data.map((d) => d.subgroup))];

  // Create an ordered list of subgroups based on initial data
  const orderedSubGroups = useMemo(() => {
    return [...new Set(data.map((d) => d.subgroup))];
  }, [data]);

  // Stack the data
  const stackGenerator = d3
    .stack()
    .keys(subGroups)
    .value((d) => data.filter((item) => item.group === d)[0].value);
  const series = stackGenerator(groups);

  // Find size of the longest bar and group rank.
  const lastStackGroup = series[series.length - 1] || [];
  const groupTotalValues = lastStackGroup.map((group) => {
    const biggest = group[group.length - 1] || 0;
    return { name: group.data, value: biggest };
  });

  const maxValue = d3.max(groupTotalValues, (d) => d.value);

  const xScale = d3
    .scaleBand()
    .domain(groups)
    .range([0, 2 * Math.PI])
    .padding(BAR_PADDING);

  const yScale = useMemo(() => {
    return d3
      .scaleRadial()
      .domain([0, maxValue])
      .range([innerRadius, outerRadius]);
  }, [data, width, height]);

  // Color Scale
  const colorScale = d3.scaleOrdinal().domain(subGroups).range(COLORS);

  // Build the ~rectangles
  const arcPathGenerator = d3.arc();
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleMouseOver = (event, groupName) => {
    const [x, y] = d3.pointer(event);
    setHoveredGroup(groupName);
    setHoverPosition({ x, y });
  };

  const handleMouseOut = () => {
    setHoveredGroup(null);
  };

  const allShapes = series.map((subgroup, i) => {
    return subgroup.map((group, j) => {
      const startAngle = xScale(group.data) || 0;

      const path = arcPathGenerator({
        innerRadius: yScale(group[0]),
        outerRadius: yScale(group[1]),
        startAngle,
        endAngle: startAngle + xScale.bandwidth(),
      });

      if (!path) {
        return;
      }

      return (
        <g key={i + "-" + j}>
          <path
            d={path}
            opacity={0.7}
            stroke="var(--background)"
            fill={colorScale(subgroup.key)}
            fillOpacity={0.9}
            strokeWidth={4}
            onMouseMove={(e) => handleMouseOver(e, group.data)}
            onMouseOut={handleMouseOut}
          />
        </g>
      );
    });
  });

  // Find data for the hovered group in the order of orderedSubGroups
  const hoveredGroupData = useMemo(() => {
    if (!hoveredGroup) return [];

    const dataForGroup = data.filter((d) => d.group === hoveredGroup);

    return orderedSubGroups.map((subgroup) => {
      const item = dataForGroup.find((d) => d.subgroup === subgroup);
      return item ? { ...item, value: item.value } : { subgroup, value: 0 };
    });
  }, [hoveredGroup, data, orderedSubGroups]);

  const allLabels = groupTotalValues.map((group, i) => {
    const startAngle = xScale(group.name) || 0;

    const turnLabelUpsideDown =
      (startAngle + xScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI;

    const labelRotation =
      ((startAngle + xScale.bandwidth() / 2) * 180) / Math.PI - 90;

    const labelXTranslation = yScale(group.value) + 10;

    const labelTransform =
      "rotate(" +
      labelRotation +
      ")" +
      ",translate(" +
      labelXTranslation +
      ",0)";

    return (
      <g transform={labelTransform} key={i}>
        <text
          textAnchor={turnLabelUpsideDown ? "end" : "start"}
          alignmentBaseline="middle"
          fontSize={16}
          transform={turnLabelUpsideDown ? "rotate(180)" : "rotate(0)"}
        >
          {group.name}
        </text>
      </g>
    );
  });

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
          {allShapes}
          {/* <circle
            id="SvgjsCircle1226"
            r="46"
            cx="0"
            cy="0"
            fill="#ffffff7a"
          ></circle> */}
          <g id="SvgjsG1231" stroke="#000" strokeWidth="1">
            <WatchDashes />
          </g>
          <text id="SvgjsText1256" fontSize="12" fill="#000" x="-8" y="-24">
            00
          </text>
          <text id="SvgjsText1257" fontSize="12" fill="#000" x="21" y="6">
            06
          </text>
          <text id="SvgjsText1258" fontSize="12" fill="#000" x="-6" y="34">
            12
          </text>
          <text id="SvgjsText1259" fontSize="12" fill="#000" x="-36" y="6">
            18
          </text>
        </g>
      </svg>
      {hoveredGroup && (
        <div
          style={{
            position: "absolute",
            left: hoverPosition.x + 250, // Ajuste esses valores para posicionar corretamente
            top: hoverPosition.y + 280,
            background: "white",
            padding: "12px 24px ",
            pointerEvents: "none",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          <div>
            <strong>{hoveredGroup}:00</strong>
          </div>
          {hoveredGroupData.map((item, index) => (
            <div key={index} style={{ color: colorScale(item.subgroup) }}>
              <>{item.subgroup}</> {item.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
