import { formatNumber } from "../../functions/formatNumber";
import useMostUsedWords from "../../hooks/dataPages/useMostUsedWords";

function WordRep({ user }) {
  const { data: mostUsedWords } = useMostUsedWords();
  const { userWordCount } = mostUsedWords || {};

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };
  return (
    <div className="words">
      {userWordCount &&
        chunkArray(userWordCount[user]?.slice(0, 6), 3).map((chunk, index) => (
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
        ))}
    </div>
  );
}

export default WordRep;
