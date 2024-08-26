import { useQuery } from "@tanstack/react-query";
import { formatNumber } from "../../functions/formatNumber";
import useEmojis from "../../hooks/dataPages/useEmojis";

function Emojis({ user }) {
  const { data: emojis } = useEmojis();

  return (
    <>
      <p className="strong">Emojis mais utilizados</p>
      <div className="emojis">
        <div className="flexwords">
          {emojis?.userEmojiCount &&
            emojis.userEmojiCount[user]?.slice(0, 3).map((obj, index) => (
              <div key={index} className="smallmessage">
                <p>{obj.emoji}</p>
                <div className="flutu">
                  {formatNumber(Math.floor(obj.count))}x
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Emojis;
