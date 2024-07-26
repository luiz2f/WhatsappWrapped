import { useState, useEffect } from "react";
import { string } from "./dataFunctons/fakedata/chatluy";
import useTransformData from "./hooks/useTransformData";
import DataPages from "./DataPages";
import MessagePerDay from "./dataPages/MessagePerDay";
import MessagePerHour from "./dataPages/MessagePerHour";

function HomePage() {
  const [textArea, setTextArea] = useState(string);
  const [conversa, setConversa] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isLoading, data, error } = useTransformData(conversa); // Usa o hook customizado
  const handleGenerateData = () => {
    setConversa(textArea);
  };

  console.log(error);

  return (
    <>
      <section className="home">
        <div>
          <h1>{loading ? "Loagin" : "Wentsapple"}</h1>
          <p>Insira o .txt de seu histórico de conversa</p>
          <textarea
            onChange={(e) => setTextArea(e.target.value)}
            value={textArea}
          ></textarea>
          {/* <p>ou anexe o arquivo</p>
          <input type="file"></input> */}

          <button onClick={handleGenerateData}>Gerar dados</button>

          <p>Código disponível em:</p>
          <a href="#">Github</a>
          {isLoading ? <p>Loading...</p> : ""}
          {error && <p>Error: {error.message}</p>}
        </div>
      </section>
      {data && <DataPages />}
    </>
  );
}

export default HomePage;
