import { useQuery } from "@tanstack/react-query";
import { percent } from "../functions/percent";

function StickerQuantity() {
  const { data } = useQuery({ queryKey: ["NonMessage"] });
  const { data: usersColors } = useQuery({
    queryKey: ["userColor"],
  });
  const totalAudio = data
    ? Object.values(data).reduce((sum, types) => {
        return sum + (types["figurinha"] || 0);
      }, 0)
    : 0;
  return (
    <section>
      <div>
        <h1>{totalAudio} figurinhas</h1>

        <div className="box">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <div className="message" key={key}>
                <h4 className={key}>
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
