import { useQuery } from "@tanstack/react-query";
import { percent } from "../functions/percent";

function StickerQuantity() {
  const { data } = useQuery({ queryKey: ["NonMessage"] });
  const totalAudio = data
    ? Object.values(data).reduce((sum, types) => {
        return sum + (types["figurinha"] || 0);
      }, 0)
    : 0;
  return (
    <section>
      <div>
        <h1>Vocês trocaram {totalAudio} figurinhas</h1>

        <div className="box">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <div className="message" key={key}>
                <h4>
                  {value.figurinha}{" "}
                  <span>({percent(value.figurinha / totalAudio)})</span> {key}
                </h4>
                <p>
                  {key} enviou 1 figurinha a cada{" "}
                  {Math.floor(value.mensagem / value.figurinha)} mensagens
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default StickerQuantity;
