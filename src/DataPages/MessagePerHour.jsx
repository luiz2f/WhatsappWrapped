// import useMessagePerPeriod from "../hooks/dataPages/useMessagePerPeriod";
import CircularBarPlot from "../graphs/CircularBarPlot";
import useMessagePerPeriod from "../hooks/dataPages/useMessagePerPeriod";

function MessagePerHour() {
  const { data } = useMessagePerPeriod();
  const { hour } = data || {};

  return (
    <section>
      <div>
        <h1>Mensagens por hora</h1>
        <div className="graph">
          {hour && <CircularBarPlot data={hour} width={500} height={500} />}{" "}
        </div>
      </div>
    </section>
  );
}

export default MessagePerHour;
