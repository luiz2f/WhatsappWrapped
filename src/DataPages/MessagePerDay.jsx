// import StackedBarplot from "../graphs/StackedBarplot";
import useMessagePerPeriod from "../hooks/dataPages/useMessagePerPeriod";
import StackedBarPlot from "../ui/graphs/StackedBarplot";
function MessagePerDay({ graph }) {
  const { data } = useMessagePerPeriod();
  const { day } = data || {};

  return (
    <section>
      <div>
        <h1>Mensagens por dia da semana</h1>
        <div className="graph">
          {day ? <StackedBarPlot graph={graph} data={day} /> : ""}
        </div>
      </div>
    </section>
  );
}

export default MessagePerDay;
