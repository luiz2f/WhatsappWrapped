import { formatNumber } from "../../functions/formatNumber";
import useMostUsedMessages from "../../hooks/dataPages/useMostUsedMessages";

function MessageRep({ user }) {
  const { data } = useMostUsedMessages();
  const { userMessageCount } = data || {};
  return (
    <>
      <p className="strong">Mensagens mais enviadas</p>
      {userMessageCount &&
        userMessageCount[user]?.slice(0, 3).map((obj, index) => (
          <div key={index} className="smallmessage">
            <p>{obj.message}</p>
            <div className="flutu">{formatNumber(Math.floor(obj.count))}x</div>
          </div>
        ))}
    </>
  );
}

export default MessageRep;
