import useMostUsedWords from "../hooks/DataPages/useMostUsedWords";
import { formatNumber } from "../functions/formatNumber";

function MostSendWords() {
  const { data } = useMostUsedWords();
  const { totalWordCount, userWordCount } = data || {};

  // Verifique se totalWordCount existe e tem pelo menos um item
  const topTotalWord =
    totalWordCount && totalWordCount.length > 0 ? totalWordCount[0] : null;
  return (
    <section>
      <div>
        <h1>
          A mensagem mais enviada por vocês é{" "}
          <span>&quot;{topTotalWord ? topTotalWord.word : "..."}&quot;</span>{" "}
          <br />
          {topTotalWord
            ? `Foi repetida ${formatNumber(topTotalWord.count)} vezes`
            : "Dados não disponíveis"}
        </h1>
        <div>
          <div style={{ display: "flex" }}>
            {totalWordCount && (
              <div>
                <h4>Ambos</h4>
                {totalWordCount.map((word, index) => (
                  <div key={index}>
                    <p>
                      {word.word} <span>{Math.floor(word.count)}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}

            {userWordCount &&
              Object.entries(userWordCount).map(([key, value]) => (
                <div key={key}>
                  <h4>{key}</h4>
                  {value.map((word) => (
                    <p key={word.word}>
                      {word.word} <span>{Math.floor(word.count)}</span>
                    </p>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MostSendWords;
