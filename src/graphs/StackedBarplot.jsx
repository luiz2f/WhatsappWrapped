import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

function StackedBarPlot({ graph, data }) {
  const hoverBox = useRef(null);
  const [hoverBoxSize, setHoverBoxSize] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  function handleMouseOver(e) {
    const { payload } = e;
    setHoveredBar(payload);
    // let hoverbox = document.querySelector(".hoverbox");

    if (hoveredBar) {
      window.addEventListener("mousemove", handleMouseMove);
    }
  }
  // const tete = hoverBox.current
  // ? hoverBox.current.getBoundingClientRect()
  // : null;
  // console.log(hoveredBar);
  // const { width } = tete || {};
  // const screenWidth = window.innerWidth;
  const handleMouseMove = (event) => {
    const [x, y] = d3.pointer(event);
    // const screenHeight = window.innerHeight;

    // if (hoverBox && width + event.x > screenWidth * 0.93) {
    //   setHoverPosition({ x: x - 120, y });
    // } else {
    setHoverPosition({ x, y });
    // }
  };

  function handleMouseOut() {
    window.removeEventListener("mousemove", handleMouseMove);
    setHoveredBar(null);
  }
  // console.log(hoverBox?.current?.getBoundingClientRect());
  const screenHeight = window.innerHeight;
  // console.log(screenWidth - hoverBox?.current?.getBoundingClientRect().right);

  useEffect(() => {}, []);

  return (
    <div>
      <BarChart width={graph.w} height={graph.h} data={data}>
        <CartesianGrid />
        <XAxis dataKey="x" />
        <YAxis />
        <Legend />

        {Object.entries(data[0])
          .filter(([key]) => key !== "x") // Filter out the key 'x'
          .map(([key]) => (
            <Bar
              key={`key-${key}`}
              dataKey={key}
              stackId="a"
              fill={`var(--${key})`}
              onMouseMove={(event) => handleMouseOver(event)}
              onMouseOut={handleMouseOut}
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
          }}
        >
          <div>
            <strong>{hoveredBar.x.split("-")[0]}</strong>
          </div>
          {Object.entries(hoveredBar)
            .filter(([key]) => key !== "x")
            .reverse()
            .map(([key, value]) => (
              <div key={key} className={key}>
                {key} {value}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default StackedBarPlot;
