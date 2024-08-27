import StackedBarPlot from "../ui/graphs/StackedBarplot";

function MessagePerYear({ graph, data }) {
  return (
    <section>
      <div>
        <h1>Mensagens por ano</h1>
        <div className="graph">
          {data ? <StackedBarPlot graph={graph} data={data} /> : ""}
        </div>
      </div>
    </section>
  );
}

export default MessagePerYear;
