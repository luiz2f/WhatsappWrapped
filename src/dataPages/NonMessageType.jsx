import { formatNumber } from "../functions/formatNumber";
import { percent } from "../functions/percent";

function NonMessageType({ data, type, title }) {
  const totalType = data
    ? Object.values(data).reduce((sum, types) => sum + (types[type] || 0), 0)
    : 0;

  return (
    <section>
      <div>
        <h1>
          {formatNumber(totalType)} {title}
        </h1>

        <div className="box">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <div className="message" key={key}>
                <h4 className="messagesender">{key}</h4>
                <h4>
                  {formatNumber(value[type])}
                  <span>({percent(value[type] / totalType)})</span>
                </h4>
                <p>
                  enviou 1 {type.toLowerCase()} a cada{" "}
                  {Math.floor(value.mensagem / value[type])} mensagens
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default NonMessageType;
