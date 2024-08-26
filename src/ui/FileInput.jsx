import React, { useRef, useState } from "react";
import { BsFiletypeTxt } from "react-icons/bs";

function FileInput({ selectedFile, setSelectedFile }) {
  const [error, setError] = useState("");
  const inputRef = useRef();

  // Handle the change event when a file is selected
  const handleOnChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith(".txt")) {
        setSelectedFile(file);
        setError(""); // Clear any previous error
      } else {
        setError(`Apenas arquivos ".txt"`);
        setSelectedFile(null); // Clear the selected file
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (file.name.endsWith(".txt")) {
        setSelectedFile(file);
        setError(""); // Clear any previous error
      } else {
        setError(`Apenas arquivos ".txt"`);
        setSelectedFile(null); // Clear the selected file
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const onChooseFile = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const removeFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile(null);
    inputRef.current.value = "";
  };

  return (
    <div className="fileinput" onDrop={handleDrop} onDragOver={handleDragOver}>
      {/* Hidden file input element */}
      <input
        type="file"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />

      {/* Button to trigger the file input dialog */}
      <button className="file-btn" onClick={(e) => onChooseFile(e)}>
        <span className="material-symbols-rounded">
          <BsFiletypeTxt />
        </span>{" "}
        {error ? (
          <p className="error-message">
            {error} <br /> tente novamente
          </p>
        ) : selectedFile ? (
          <div>
            {selectedFile.name} <br /> selecionado <br />
            <span className="removebtn" onClick={removeFile}>
              <span className="material-symbols-rounded">remover</span>
            </span>
          </div>
        ) : (
          "Enviar conversa"
        )}
      </button>
    </div>
  );
}

export default FileInput;
