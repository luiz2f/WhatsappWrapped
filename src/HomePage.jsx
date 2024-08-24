import { useEffect, useState } from "react";
import useTransformData from "./hooks/useTransformData";
import DataPages from "./DataPages";
import FileInput from "./ui/FileInput";
import Spinner from "./ui/Spinner";

function HomePage() {
  const [textArea, setTextArea] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [conversa, setConversa] = useState("");
  const [formError, setFormError] = useState("");
  console.log(textArea);
  const { isLoading, data, error } = useTransformData(conversa); // Usa o hook customizado
  useEffect(() => {
    if (!isLoading && data) {
      const element = document.querySelector("#msgqty");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isLoading, data]);

  async function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const textFromFile = event.target.result; // Aqui está o conteúdo do arquivo
      setConversa(textFromFile);
    };
    reader.onerror = (event) => {
      console.error("Erro ao ler o arquivo", event);
    };
    reader.readAsText(file);
  }

  function submitForm(e) {
    e.preventDefault();
    if (selectedFile) {
      handleFile(selectedFile);
    } else if (textArea && !selectedFile) {
      setConversa(textArea);
    } else {
      setFormError("Insira um arquivo de conversa ou cole no campo acima");
    }

    // setConversa(textArea);
  }
  return (
    <>
      <section
        className="home"
        style={data ? { height: "fit-content", minHeight: "fit-content" } : {}}
      >
        {data ? (
          ""
        ) : (
          <div>
            <form>
              <h1>Wentsapple</h1>
              <p>Insira arquivo .txt de seu histórico de conversa:</p>
              <FileInput
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
              {/* <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            /> */}
              <p>ou copie e cole no campo abaixo:</p>
              <textarea
                placeholder="Cole seu chat aqui"
                onChange={(e) => setTextArea(e.target.value)}
                value={textArea}
              ></textarea>
              {error && <p className="error-message">Error: {error.message}</p>}
              {formError && <p className="error-message">{formError}</p>}
              <button className="homebtn" onClick={(e) => submitForm(e)}>
                Gerar dados
              </button>
              <p className="git-message">Código disponível no</p>
              <a href="#">Github</a>
              {isLoading ? <Spinner /> : ""}
            </form>
          </div>
        )}
      </section>
      {data && <DataPages />}
    </>
  );
}

export default HomePage;
