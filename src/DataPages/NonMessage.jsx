import useNonMessage from "../hooks/dataPages/useNonMessage";
import NonMessageType from "./NonMessageType";

function NonMessage() {
  const { data } = useNonMessage();

  return (
    <>
      <NonMessageType data={data} type="audio" title="Áudios" />
      <NonMessageType data={data} type="figurinha" title="Figurinhas" />
      <NonMessageType data={data} type="imagem" title="Imagens" />
    </>
  );
}

export default NonMessage;
