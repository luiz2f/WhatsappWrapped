import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { transformData } from "../functions/transformData";
import { wordCount } from "../functions/dataPages/wordCount";
import { mostUsedEmojis } from "../functions/dataPages/emojis";
import { mostUsedWords } from "../functions/dataPages/mostUsedWords";
import { mostUsedMessages } from "../functions/dataPages/mostUsedMessages";
import { nonMessage as nonMessageCalc } from "../functions/dataPages/nonMessage";
import { messagesPerPeriod } from "../functions/dataPages/messagesPerPeriod";
import { messageStreak as messageStreakCalc } from "../functions/dataPages/messageStreak";
import { coldStreak as coldStreakCalc } from "../functions/dataPages/coldStreak";
import { userToClassName } from "../functions/userToClassName";
import { messageCount } from "../functions/dataPages/messageCount";

const DataContext = createContext(); // Nome do Context deve ser com letra maiúscula

function DataProvider({ children }) {
  const [conversa, setConversa] = useState("");
  const [messageQuantity, setMessageQuantity] = useState(null);
  const [nonMessage, setNonMessage] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [messageStreak, setMessageStreak] = useState(null);
  const [coldStreak, setColdStreak] = useState(null);
  const [loadingStage, setLoadingStage] = useState(-1);
  const [mensagens, setMensagens] = useState(null);

  // 0: nenhum, 1: messageQuantity, 2: nonMessage, 3: graphData, 4: messageStreak, 5: coldStreak
  // Memoize usersColors to avoid changing on every render

  useEffect(() => {
    if (conversa && loadingStage === -1) {
      const mensagensTransformadas = transformData(conversa);
      setMensagens(mensagensTransformadas);
      setLoadingStage(0); // Move to the next stage
    }
  }, [conversa, loadingStage]);
  // Effect to load messageQuantity data
  useEffect(() => {
    if (loadingStage === 0) {
      if (mensagens) {
        setMessageQuantity({
          messageCount: messageCount(mensagens),
          wordCount: wordCount(mensagens),
          mostUsedWords: mostUsedWords(mensagens),
          mostUsedMessages: mostUsedMessages(mensagens),
          mostUsedEmojis: mostUsedEmojis(mensagens),
        });
        setLoadingStage(1); // Move to the next stage
      }
    }
  }, [conversa, loadingStage, setMensagens, mensagens]);

  // Effect to load nonMessage data
  useEffect(() => {
    if (loadingStage === 1) {
      if (mensagens) {
        setNonMessage(nonMessageCalc(mensagens));
        setLoadingStage(2); // Move to the next stage
      }
    }
  }, [loadingStage, mensagens]);
  const usersColors = useMemo(() => {
    if (messageQuantity?.messageCount) {
      return getUserColors(messageQuantity?.messageCount);
    }

    return {};
  }, [messageQuantity]);

  // Effect to handle CSS updates based on usersColors
  useEffect(() => {
    if (usersColors) {
      const styleId = "user-styles";
      let style = document.getElementById(styleId) || null;
      if (!style) {
        style = document.createElement("style");
        style.id = styleId;
        document.head.appendChild(style);
      }

      const cssRules = Object.entries(usersColors)
        .map(([key, value]) => {
          return `.${userToClassName(
            key
          )} { color: var(--${value}); fill: var(--${value}); }\n :root { --${userToClassName(
            key
          )}: var(--${value}) }`;
        })
        .join("\n");

      style.textContent = cssRules;

      return () => {
        if (style) {
          document.head.removeChild(style);
        }
      };
    }
  }, [usersColors]);

  // Effect to load graphData
  useEffect(() => {
    if (loadingStage === 2) {
      if (mensagens) {
        const usuarios = criarUsuarios(mensagens);
        setGraphData(messagesPerPeriod(mensagens, usuarios));
        setLoadingStage(3); // Move to the next stage
      }
    }
  }, [loadingStage, mensagens]);

  // Effect to load messageStreak data
  useEffect(() => {
    if (loadingStage === 3) {
      if (mensagens) {
        setMessageStreak(messageStreakCalc(mensagens));
        setLoadingStage(4); // Move to the next stage
      }
    }
  }, [loadingStage, mensagens]);

  // Effect to load coldStreak data
  useEffect(() => {
    if (loadingStage === 4) {
      if (mensagens) {
        setColdStreak(coldStreakCalc(mensagens));
        setLoadingStage(5); // Finished loading
      }
    }
  }, [loadingStage, mensagens]);

  // Nome do componente deve começar com letra maiúscula
  return (
    <DataContext.Provider
      value={{
        setConversa,
        messageQuantity,
        nonMessage,
        graphData,
        messageStreak,
        coldStreak,
        usersColors,
        loadingStage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function getUserColors(words) {
  let usersColors = {};
  const usersArray = Object.entries(words);
  for (let i = 0; i < usersArray.length; i++) {
    const user = usersArray[i][0];
    const userNum = `user${i + 1}`;
    usersColors[user] = userNum;
  }
  return usersColors;
}
function criarUsuarios(data) {
  let usuarios = [];
  if (data) {
    data.slice(0, 100).forEach((mensagem) => {
      if (usuarios.length < 2 && !usuarios.includes(mensagem.usuario)) {
        usuarios.push(mensagem.usuario); // Adicione à array se ainda não existir
      }
    });
    return usuarios;
  }
}

export { DataProvider, DataContext };
