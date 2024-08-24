import { useQuery } from "@tanstack/react-query";
import { percent } from "../functions/percent";
import { formatNumber } from "../functions/formatNumber";

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
        <h1>{formatNumber(totalAudio)} Figurinhas</h1>

        <div className="box">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <div className="message" key={key}>
                <h4 className="messagesender">{key}</h4>
                <h4>
                  {formatNumber(value.figurinha)}
                  <span>({percent(value.figurinha / totalAudio)})</span>
                </h4>
                <p>
                  enviou 1 figurinha a cada{" "}
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
