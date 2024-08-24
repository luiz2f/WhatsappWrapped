import useMessagePerPeriod from "../hooks/dataPages/useMessagePerPeriod";
import StackedBarPlot from "../ui/graphs/StackedBarplot";

function MessagePerYear({ graph }) {
  const { data } = useMessagePerPeriod();
  const { year } = data || {};
  return (
    <section>
      <div>
        <h1>Mensagens por ano</h1>
        <div className="graph">
          {year ? <StackedBarPlot graph={graph} data={year} /> : ""}
        </div>
      </div>
    </section>
  );
}

export default MessagePerYear;
