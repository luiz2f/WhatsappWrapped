// import useMessagePerPeriod from "../hooks/dataPages/useMessagePerPeriod";
import CircularBarPlot from "../graphs/CircularBarPlot";
import useMessagePerPeriod from "../hooks/dataPages/useMessagePerPeriod";

function MessagePerHour({ graph }) {
  const { data } = useMessagePerPeriod();
  const { hour } = data || {};

  return (
    <section>
      <div>
        <h1 className="nomargin">Mensagens por hora</h1>
        <div className="graph">
          {hour && <CircularBarPlot data={hour} width={graph} height={graph} />}{" "}
        </div>
      </div>
    </section>
  );
}

export default MessagePerHour;
