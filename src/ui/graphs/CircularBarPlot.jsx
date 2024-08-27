import React, { useMemo, useState, useEffect } from "react";
import * as d3 from "d3";
import WatchDashes from "./WatchDashes";
import { useQuery } from "@tanstack/react-query";
import { userToClassName } from "../../functions/userToClassName";
import { formatNumber } from "../../functions/formatNumber";

const MARGIN = 0;
const BAR_PADDING = 0;

export default function CircularBarplot({ width, height, data }) {
  // tamanho do circulo exterior e interior
  const innerRadius = (Math.min(width, height) / 2) * 0.2;
  const outerRadius = Math.min(width, height) / 2 - MARGIN;

  // separa os horarios
  const groups = [...new Set(data?.map((d) => d.group))];
  // separa as categorias stack
  const subGroups = [...new Set(data?.map((d) => d.subgroup))];

  // ordena de acordo com o que aparece primeiro
  const orderedSubGroups = useMemo(() => {
    return [...new Set(data?.map((d) => d.subgroup))];
  }, [data]);

  // Stack the data
  const stackGenerator = d3
    .stack()
    .keys(orderedSubGroups)
    .value((d, key) => {
      const item = data.find(
        (item) => item.group === d && item.subgroup === key
      );
      return item ? item.value : 0;
    });

  const series = stackGenerator(groups);

  // Find size of the longest bar and group rank.
  const lastStackGroup = series[series?.length - 1] || [];
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
    // troquei o scaleRadial pra ser mais pela altura do que pela área de gráfico
    return d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([innerRadius, outerRadius]);
  }, [maxValue, innerRadius, outerRadius]);

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
  const allShapes = series?.map((subgroup, i) => {
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
            stroke="var(--background)"
            fill={`var(--${userToClassName(subgroup?.key)}`}
            strokeWidth={1}
            onMouseMove={(e) => handleMouseOver(e, group?.data)}
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
          className="hoverbox"
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
          {hoveredGroupData.reverse().map((item, index) => (
            <div key={index} className={`${userToClassName(item.subgroup)}`}>
              <strong>{item.subgroup}</strong> {item.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
