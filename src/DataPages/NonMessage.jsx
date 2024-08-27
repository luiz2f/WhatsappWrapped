import { useData } from "../context/dataContext";
import useNonMessage from "../hooks/dataPages/useNonMessage";
import NonMessageType from "./NonMessageType";

function NonMessage({ nonMessage }) {
  return (
    <>
      <NonMessageType data={nonMessage} type="audio" title="Áudios" />
      <NonMessageType data={nonMessage} type="figurinha" title="Figurinhas" />
      <NonMessageType data={nonMessage} type="imagem" title="Imagens" />
    </>
  );
}

export default NonMessage;
