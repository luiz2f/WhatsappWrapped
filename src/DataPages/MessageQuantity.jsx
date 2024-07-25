import { formatNumber } from "../functions/formatNumber";
import { percent } from "../functions/percent";
import useMessageCount from "../hooks/DataPages/useMessageCount";
import useWordCount from "../hooks/DataPages/useWordCount";

function MessageQuantity() {
  const { data: message } = useMessageCount(); // Usa o hook customizado
  const { data: words } = useWordCount(); // Usa o hook customizado

  const totalMessages = message
    ? Object.values(message).reduce((sum, value) => sum + value, 0)
    : 0;
  const totalWords = message
    ? Object.values(words).reduce((sum, value) => sum + value, 0)
    : 0;

  return (
    <section>
      <div>
        <h1>
          Vocês trocaram {formatNumber(totalMessages)} mensagens e <br />
          {formatNumber(totalWords)} palavras
        </h1>

        <div>
          {message &&
            Object.entries(message).map(([key, value]) => (
              <div key={key}>
                <h4>{key}</h4>
                <p>
                  {formatNumber(value)} mensagens
                  <span> {percent(value / totalMessages)}</span>
                </p>
                <p>
                  {formatNumber(words[key])} palavras
                  <span> {percent(words[key] / totalWords)}</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default MessageQuantity;
