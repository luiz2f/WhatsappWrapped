// import StackedBarplot from "../graphs/StackedBarplot";

import StackedBarPlot from "../ui/graphs/StackedBarplot";
function MessagePerDay({ graph, data }) {
  return (
    <section>
      <div>
        <h1>Mensagens por dia da semana</h1>
        <div className="graph">
          {data ? <StackedBarPlot graph={graph} data={data} /> : ""}
        </div>
      </div>
    </section>
  );
}

export default MessagePerDay;
