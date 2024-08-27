import { formatNumber } from "../functions/formatNumber";
import { userToClassName } from "../functions/userToClassName";
import { useData } from "../context/dataContext";

function MessageQuantity({ messageQuantity }) {
  const {
    wordCount,
    messageCount,
    mostUsedMessages,
    mostUsedWords,
    mostUsedEmojis,
  } = messageQuantity || {};
  const totalMessages = messageCount
    ? Object.values(messageCount).reduce((sum, value) => sum + value, 0)
    : 0;

  const totalWords = wordCount
    ? Object.values(wordCount).reduce((sum, value) => sum + value, 0)
    : 0;

  function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
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
          {messageQuantity &&
            Object.entries(messageCount).map(([key, value]) => (
              <div key={`message-${key}`} className="flexcolumn">
                <div className="message">
                  <h4 className={userToClassName(key)}>{key}</h4>
                  <p>
                    <strong>{formatNumber(value)}</strong> mensagens
                  </p>
                  <p>
                    <strong>{formatNumber(wordCount[key])}</strong> palavras
                  </p>
                </div>
                <p className="strong">Palavras mais enviadas</p>
                <div className="words">
                  {mostUsedWords &&
                    chunkArray(mostUsedWords[key]?.slice(0, 6), 3).map(
                      (chunk, index) => (
                        <div key={index} className="flexwords">
                          {chunk.map((obj) => (
                            <div key={obj.word} className="smallmessage">
                              <p>{obj.word}</p>
                              <div className="flutu">
                                {formatNumber(Math.floor(obj.count))}x
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                </div>
                <p className="strong">Mensagens mais enviadas</p>
                {mostUsedMessages &&
                  mostUsedMessages[key]?.slice(0, 3).map((obj, index) => (
                    <div key={index} className="smallmessage">
                      <p>{obj.message}</p>
                      <div className="flutu">
                        {formatNumber(Math.floor(obj.count))}x
                      </div>
                    </div>
                  ))}
                <p className="strong">Emojis mais utilizados</p>
                <div className="emojis">
                  <div className="flexwords">
                    {mostUsedEmojis &&
                      mostUsedEmojis[key]?.slice(0, 3).map((obj, index) => (
                        <div key={index} className="smallmessage">
                          <p>{obj.emoji}</p>
                          <div className="flutu">
                            {formatNumber(Math.floor(obj.count))}x
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default MessageQuantity;
