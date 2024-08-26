import { useEffect, useState } from "react";
import MessagePerDay from "./MessagePerDay";
import MessagePerYear from "./MessagePerYear";
import MessagePerHour from "./MessagePerHour";
import useMessagePerPeriod from "../hooks/dataPages/useMessagePerPeriod";

function WidthGraphs() {
  const { data } = useMessagePerPeriod();
  const [graph, setGraph] = useState({ w: 300, h: 300 });
  useEffect(() => {}, [data]);
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

  return data ? (
    <>
      <MessagePerYear graph={graph} data={data.year} />
      <MessagePerDay graph={graph} data={data.day} />
      <MessagePerHour graph={graph.w > 700 ? 500 : graph.w} data={data.hour} />
    </>
  ) : null; // Ou algum componente de fallback, como um spinner de loading
}

export default WidthGraphs;
