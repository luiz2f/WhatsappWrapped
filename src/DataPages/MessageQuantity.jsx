import { Suspense, useEffect, useState } from "react";
import { formatNumber } from "../functions/formatNumber";
import { percent } from "../functions/percent";
import useMessageCount from "../hooks/dataPages/useMessageCount";
import useMostUsedMessages from "../hooks/dataPages/useMostUsedMessages";
import useMostUsedWords from "../hooks/dataPages/useMostUsedWords";
import useWordCount from "../hooks/dataPages/useWordCount";
import useUserColors from "../hooks/dataPages/useUserColors";
import { useQuery } from "@tanstack/react-query";
import useEmojis from "../hooks/dataPages/useEmojis";
import { userToClassName } from "../functions/userToClassName";
import Spinner from "../ui/Spinner";
import NonMessage from "./NonMessage";
import Emojis from "./messageQuantity/Emojis";
import MessageRep from "./messageQuantity/MessageRep";
import WordRep from "./messageQuantity/WordRep";

function MessageQuantity() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });
  const { data: message } = useMessageCount(mensagens);
  const { data: words } = useWordCount(mensagens);

  const totalMessages = message
    ? Object.values(message).reduce((sum, value) => sum + value, 0)
    : 0;
  const totalWords = message
    ? Object.values(words).reduce((sum, value) => sum + value, 0)
    : 0;
  console.log(message);
  return (
    <section id="msgqty">
      <div>
        <h1>
          Vocês trocaram <br />
          <strong>{formatNumber(totalMessages)}</strong> mensagens
          <br />
          <strong>{formatNumber(totalWords)}</strong> palavras
        </h1>

        <div className="messageQuantity">
          {message &&
            Object.entries(message).map(([key, value]) => (
              <div key={`message-${key}`} className="flexcolumn">
                <div className="message">
                  <h4 className={userToClassName(key)}>{key}</h4>
                  <p>
                    <strong>{formatNumber(value)}</strong> mensagens
                  </p>
                  <p>
                    <strong>{formatNumber(words[key])}</strong> palavras
                  </p>
                </div>
                <p className="strong">Palavras mais enviadas</p>

                <Suspense fallback={<Spinner />}>
                  <WordRep user={key} />
                </Suspense>
                <Suspense fallback={<Spinner />}>
                  <MessageRep user={key} />
                </Suspense>
                <Suspense fallback={<Spinner />}>
                  <Emojis user={key} />
                </Suspense>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default MessageQuantity;
