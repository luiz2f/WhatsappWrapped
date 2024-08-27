import { formatNumber } from "../functions/formatNumber";
import useMessageCount from "../hooks/dataPages/useMessageCount";
import useMostUsedMessages from "../hooks/dataPages/useMostUsedMessages";
import useMostUsedWords from "../hooks/dataPages/useMostUsedWords";
import useWordCount from "../hooks/dataPages/useWordCount";
import { useQuery } from "@tanstack/react-query";
import useEmojis from "../hooks/dataPages/useEmojis";
import { userToClassName } from "../functions/userToClassName";

function MessageQuantity() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });
  const { data: message } = useMessageCount(mensagens);
  const { data: words } = useWordCount(mensagens);
  const { data: mostUsedWords } = useMostUsedWords();
  const { userWordCount } = mostUsedWords || {};
  const { data } = useMostUsedMessages();
  const { userMessageCount } = data || {};
  const { data: emojis } = useEmojis();
  const totalMessages = message
    ? Object.values(message).reduce((sum, value) => sum + value, 0)
    : 0;
  const totalWords = message
    ? Object.values(words).reduce((sum, value) => sum + value, 0)
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
                <div className="words">
                  {userWordCount &&
                    chunkArray(userWordCount[key]?.slice(0, 6), 3).map(
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
                {userMessageCount &&
                  userMessageCount[key]?.slice(0, 3).map((obj, index) => (
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
                    {emojis?.userEmojiCount &&
                      emojis.userEmojiCount[key]
                        ?.slice(0, 3)
                        .map((obj, index) => (
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
