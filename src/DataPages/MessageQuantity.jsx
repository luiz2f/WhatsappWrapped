import { useEffect } from "react";
import { formatNumber } from "../functions/formatNumber";
import { percent } from "../functions/percent";
import useMessageCount from "../hooks/dataPages/useMessageCount";
import useMostUsedMessages from "../hooks/dataPages/useMostUsedMessages";
import useMostUsedWords from "../hooks/dataPages/useMostUsedWords";
import useWordCount from "../hooks/dataPages/useWordCount";
import useUserColors from "../hooks/dataPages/useUserColors";
import { useQuery } from "@tanstack/react-query";

function MessageQuantity() {
  const { data: message } = useMessageCount();
  const { data: words } = useWordCount();
  const { data: mostUsedWords } = useMostUsedWords();
  const { totalWordCount, userWordCount } = mostUsedWords || {};
  const { data } = useMostUsedMessages();
  const { userMessageCount, totalMessageCount } = data || {};

  const totalMessages = message
    ? Object.values(message).reduce((sum, value) => sum + value, 0)
    : 0;
  const totalWords = message
    ? Object.values(words).reduce((sum, value) => sum + value, 0)
    : 0;

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  return (
    <section>
      <div>
        <h1>
          Vocês trocaram {formatNumber(totalMessages)} mensagens e <br />
          {formatNumber(totalWords)} palavras
        </h1>

        <div className="messageQuantity">
          {message &&
            Object.entries(message).map(([key, value]) => (
              <div className="flexcolumn" key={key}>
                <div className="message">
                  <h4 className={key}>{key}</h4>
                  <p>
                    <strong>{formatNumber(value)}</strong> mensagens
                    {/* <span> {percent(value / totalMessages)}</span> */}
                  </p>
                  <p>
                    <strong>{formatNumber(words[key])}</strong> palavras
                    {/* <span> {percent(words[key] / totalWords)}</span> */}
                  </p>
                </div>
                <p className="strong">Palavras mais enviadas</p>
                <div className="words">
                  {userWordCount &&
                    chunkArray(userWordCount[key].slice(0, 6), 3).map(
                      (chunk, index) => (
                        <div key={index} className="flexwords">
                          {chunk.map((obj) => (
                            <div key={obj.word} className="smallmessage">
                              <p>{obj.word} </p>
                              <div className="flutu">
                                {Math.floor(obj.count)}x
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                </div>
                <p className="strong">Mensagens mais enviadas</p>
                {userMessageCount &&
                  userMessageCount[key].slice(0, 3).map((obj) => (
                    <div key={obj.word} className="smallmessage">
                      <p>{obj.message}</p>{" "}
                      <div className="flutu">{Math.floor(obj.count)}x</div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default MessageQuantity;
