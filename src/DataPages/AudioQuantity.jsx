import { percent } from "../functions/percent";
import useNonMessage from "../hooks/DataPages/useNonMessage";

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
        <h1>Vocês trocaram {totalAudio} audios</h1>

        <div className="box">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <div className="message" key={key}>
                <h4>
                  {value.audio}{" "}
                  <span>({percent(value.audio / totalAudio)})</span> {key}
                </h4>
                <p>
                  {key} enviou 1 audio a cada{" "}
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
