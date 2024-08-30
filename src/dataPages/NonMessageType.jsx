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
            Object.entries(data).map(([key, value]) => {
              const percentData = value[type] / totalType;
              return (
                <div className="message" key={key}>
                  <h4 className="messagesender">{key}</h4>
                  <h4>
                    {formatNumber(value[type])}
                    {percentData ? <span>({percent(percentData)})</span> : ""}
                  </h4>
                  <p>
                    {percentData ? (
                      <>
                        enviou 1 {type.toLowerCase()} a cada{" "}
                        {Math.floor(value.mensagem / value[type])} mensagens
                      </>
                    ) : (
                      "Enviadas 🙁"
                    )}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default NonMessageType;
