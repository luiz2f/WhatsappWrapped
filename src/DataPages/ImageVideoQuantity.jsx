import { useQuery } from "@tanstack/react-query";
import { percent } from "../functions/percent";
import { useEffect } from "react";
import { formatNumber } from "../functions/formatNumber";
import { userToClassName } from "../functions/userToClassName";

function ImageQuantity() {
  const { data } = useQuery({ queryKey: ["NonMessage"] });
  const totalImage = data
    ? Object.values(data).reduce((sum, types) => {
        return sum + (types["imagem"] || 0);
      }, 0)
    : 0;
  return (
    <section>
      <div>
        <h1>{formatNumber(totalImage)} Imagens</h1>

        <div className="box">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <div className="message" key={key}>
                <h4 className="messagesender">{key}</h4>
                <h4>
                  {formatNumber(value.imagem)}
                  <span>({percent(value.imagem / totalImage)})</span>
                </h4>
                <p>
                  enviou 1 imagem a cada{" "}
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
