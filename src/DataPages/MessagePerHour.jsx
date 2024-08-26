import useMessagePerPeriod from "../hooks/dataPages/useMessagePerPeriod";
import CircularBarplot from "../ui/graphs/CircularBarPlot";

function MessagePerHour({ graph, data }) {
  return (
    <section>
      <div>
        <h1 className="nomargin">Mensagens por hora</h1>
        <div className="graph">
          {data && <CircularBarplot data={data} width={graph} height={graph} />}{" "}
        </div>
      </div>
    </section>
  );
}

export default MessagePerHour;
