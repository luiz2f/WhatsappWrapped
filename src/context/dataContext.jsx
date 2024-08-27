import { createContext, useContext, useState } from "react";
import { transformData } from "../functions/transformData";

const DataContext = createContext(); // Nome do Context deve ser com letra maiúscula

function DataProvider({ children }) {
  const [conversa, setConversa] = useState("");
  const mensagens = transformData(conversa);

  // Nome do componente deve começar com letra maiúscula
  return (
    <DataContext.Provider value={{ setConversa }}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export { DataProvider, useData };
