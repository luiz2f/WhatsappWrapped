import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { userToClassName } from "../../functions/userToClassName";

function StackedBarPlot({ graph, data }) {
  const hoverBox = useRef(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  function handleMouseOver(e) {
    const { payload } = e;
    setHoveredBar(payload);
    if (hoveredBar) {
      window.addEventListener("mousemove", handleMouseMove);
    }
  }

  const handleMouseMove = (event) => {
    const [x, y] = d3.pointer(event);
    setHoverPosition({ x, y });
  };

  function handleMouseOut() {
    window.removeEventListener("mousemove", handleMouseMove);
    setHoveredBar(null);
  }

  return (
    <div>
      <BarChart
        isAnimationActive={false}
        width={graph.w}
        height={graph.h}
        data={data}
        // barGap={"10%"}
        barCategoryGap={"5%"}
      >
        <CartesianGrid />
        <XAxis dataKey="x" />
        <YAxis />
        <Legend />

        {data[0] &&
          Object?.entries(data[0])
            ?.filter(([key]) => key !== "x") // Filter out the key 'x'
            ?.map(([key]) => (
              <Bar
                isAnimationActive={false}
                key={`key-${key}`}
                dataKey={key}
                stackId="a"
                fill={`var(--${userToClassName(key)})`}
                onMouseMove={(event) => handleMouseOver(event)}
                onMouseOut={handleMouseOut}
                barCategoryGap={1}
              />
            ))}
      </BarChart>
      {hoveredBar && (
        <div
          ref={hoverBox}
          className="hoverbox"
          style={{
            position: "absolute",
            left: hoverPosition.x,
            top: hoverPosition.y + 30,
            background: "white",
            padding: "12px 24px",
            pointerEvents: "none",
            textAlign: "center",
            fontWeight: 500,
            width: "max-content",
          }}
        >
          <div>
            <strong>{hoveredBar.x.split("-")[0]}</strong>
          </div>
          {Object.entries(hoveredBar)
            .filter(([key]) => key !== "x")
            .reverse()
            .map(([key, value]) => (
              <div key={key} className={userToClassName(key)}>
                <strong>{key}</strong> {value}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default StackedBarPlot;
