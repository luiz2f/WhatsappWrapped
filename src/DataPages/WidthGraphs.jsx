import { useEffect, useState } from "react";
import MessagePerDay from "./MessagePerDay";
import MessagePerYear from "./MessagePerYear";
import MessagePerHour from "./MessagePerHour";

function WidthGraphs({ graphData }) {
  const [graph, setGraph] = useState({ w: 300, h: 300 });
  useEffect(() => {}, [graphData]);
  useEffect(() => {
    // Função para obter o valor da variável CSS
    const getCSSVariable = (variable) => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
    };

    // Obtém o valor da variável CSS --graphW
    const w = parseInt(getCSSVariable("--graphW"));
    const h = parseInt(getCSSVariable("--graphH"));
    const value = { w, h };
    setGraph(value);
  }, []);

  return graphData ? (
    <>
      <MessagePerYear graph={graph} data={graphData.year} />
      <MessagePerDay graph={graph} data={graphData.day} />
      <MessagePerHour
        graph={graph.w > 700 ? 500 : graph.w}
        data={graphData.hour}
      />
    </>
  ) : null; // Ou algum componente de fallback, como um spinner de loading
}

export default WidthGraphs;
