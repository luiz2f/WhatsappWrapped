import React, { useEffect, useState } from "react";
import useTransformData from "./hooks/useTransformData";
import FileInput from "./ui/FileInput";
import Spinner from "./ui/Spinner";
import DataPages from "./DataPages";

function Form({ setConversa, data, error, isLoadingJs }) {
  const [textArea, setTextArea] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  useEffect(() => {
    // Função para carregar o arquivo chat.txt
    const loadChatFile = async () => {
      try {
        setIsLoading(true); // Inicia o carregamento
        const response = await fetch("src/_chat.txt");
        const text = await response.text();
        setConversa(text);
      } catch (error) {
        console.error("Erro ao carregar o arquivo:", error);
        setFormError("Não foi possível carregar o arquivo de conversa.");
      } finally {
        setIsLoading(false); // Conclui o carregamento
      }
    };

    loadChatFile();
  }, [setConversa]);
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
        {isLoadingJs ? (
          data ? (
            ""
          ) : (
            <Spinner />
          )
        ) : (
          <div>
            <form>
              <h1>Whatsapp Wrapped</h1>
              <p>
                {isLoading
                  ? "Carregando seu arquivo"
                  : "Insira arquivo .txt de seu histórico de conversa:"}
              </p>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <FileInput
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />

                  <p>ou copie e cole no campo abaixo:</p>
                  <textarea
                    placeholder="Cole seu chat aqui"
                    onChange={(e) => setTextArea(e.target.value)}
                    value={textArea}
                  ></textarea>
                  {error && (
                    <p className="error-message">Error: {error.message}</p>
                  )}
                  {formError && <p className="error-message">{formError}</p>}
                  <button className="homebtn" onClick={(e) => submitForm(e)}>
                    Gerar dados
                  </button>
                </>
              )}
              <p className="git-message">Código disponível no</p>
              <a href="#">Github</a>
            </form>
          </div>
        )}
      </section>
    </>
  );
}

export default Form;
