import useMessagePerPeriod from "../hooks/dataPages/useMessagePerPeriod";
import CircularBarplot from "../ui/graphs/CircularBarPlot";

function MessagePerHour({ graph }) {
  const { data } = useMessagePerPeriod();
  const { hour } = data || {};

  return (
    <section>
      <div>
        <h1 className="nomargin">Mensagens por hora</h1>
        <div className="graph">
          {hour && <CircularBarplot data={hour} width={graph} height={graph} />}{" "}
        </div>
      </div>
    </section>
  );
}

export default MessagePerHour;
