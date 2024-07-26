import { useEffect, useState } from "react";
import MessagePerDay from "./MessagePerDay";
import MessagePerYear from "./MessagePerYear";

function WidthGraphs() {
  const [graph, setGraph] = useState({ w: 300, h: 300 });

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

  return (
    <>
      <MessagePerYear graph={graph} />
      <MessagePerDay graph={graph} />
    </>
  );
}

export default WidthGraphs;
