import { useQuery } from "@tanstack/react-query";
import { percent } from "../functions/percent";
import { useEffect } from "react";

function ImageQuantity() {
  const { data } = useQuery({ queryKey: ["NonMessage"] });
  const totalAudio = data
    ? Object.values(data).reduce((sum, types) => {
        return sum + (types["imagem"] || 0);
      }, 0)
    : 0;
  return (
    <section>
      <div>
        <h1>{totalAudio} imagens</h1>

        <div className="box">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <div className="message" key={key}>
                <h4 className={key}>
                  {value.imagem}{" "}
                  <span>({percent(value.imagem / totalAudio)})</span> {key}
                </h4>
                <p>
                  {key} enviou 1 imagem a cada{" "}
                  {Math.floor(value.mensagem / value.imagem)} mensagens
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default ImageQuantity;
