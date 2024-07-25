import { useState, useEffect } from "react";
import { string } from "./dataFunctons/fakedata/chatluy";
import useTransformData from "./hooks/useTransformData";
import DataPages from "./DataPages";

function HomePage() {
  const [textArea, setTextArea] = useState(string);
  const [conversa, setConversa] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isLoading, data, error } = useTransformData(conversa); // Usa o hook customizado
  const handleGenerateData = () => {
    setConversa(textArea);
  };

  return (
    <>
      <section>
        <div>
          <h1>{loading ? "Loagin" : "Wentsapple"}</h1>
          <p>Insira o .txt de seu histórico</p>
          <textarea
            onChange={(e) => setTextArea(e.target.value)}
            style={{ width: "800px", height: "350px" }}
            value={textArea}
          ></textarea>
          <p>ou anexe o arquivo</p>
          <input type="file"></input>
          <p>Para sua segurança, o código do aplicativo está disponível em:</p>
          <button onClick={handleGenerateData}>Gerar dados</button>
          {isLoading ? <p>Loading...</p> : ""}
          {error && <p>Error: {error.message}</p>}
        </div>
      </section>
      {data && <DataPages />}
    </>
  );
}

export default HomePage;
