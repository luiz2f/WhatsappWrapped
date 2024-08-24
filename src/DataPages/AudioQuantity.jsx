import { percent } from "../functions/percent";
import useNonMessage from "../hooks/dataPages/useNonMessage";
import { formatNumber } from "../functions/formatNumber";

function AudioQuantity() {
  const { data } = useNonMessage();

  const totalAudio = data
    ? Object.values(data).reduce((sum, types) => {
        return sum + (types["audio"] || 0);
      }, 0)
    : 0;
  return (
    <section>
      <div>
        <h1>{formatNumber(totalAudio)} Audios</h1>

        <div className="box">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <div className="message" key={key}>
                <h4 className="messagesender">{key}</h4>

                <h4>
                  {formatNumber(value.audio)}
                  <span>({percent(value.audio / totalAudio)})</span>
                </h4>
                <p>
                  enviou 1 audio a cada{" "}
                  {Math.floor(value.mensagem / value.audio)} mensagens
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default AudioQuantity;
