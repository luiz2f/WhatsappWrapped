import useMostUsedMessages from "../hooks/dataPages/useMostUsedMessages";
import { formatNumber } from "../functions/formatNumber";

function MostSendMessages() {
  const { data } = useMostUsedMessages();
  const { userMessageCount, totalMessageCount } = data || {};
  // Verifique se totalMessageCount existe e tem pelo menos um item
  return (
    <section>
      <div>
        <h1>
          A mensagem mais enviada foi{" "}
          <span>
            &quot;{totalMessageCount ? totalMessageCount[0].message : "..."}
            &quot;
          </span>{" "}
          <br />
          {/* {totalMessageCount
            ? `Foi repetida ${formatNumber(totalMessageCount.count)} vezes`
            : "Dados não disponíveis"} */}
        </h1>
        <div>
          <div style={{ display: "flex" }}>
            {totalMessageCount && (
              <div>
                <h4>Ambos</h4>
                {totalMessageCount.map((message, index) => (
                  <div key={index}>
                    <p>
                      {message.message} <span>{Math.floor(message.count)}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}

            {userMessageCount &&
              Object.entries(userMessageCount).map(([key, value]) => (
                <div key={key}>
                  <h4>{key}</h4>
                  {value.map((message) => (
                    <p key={message.message}>
                      {message.message} <span>{Math.floor(message.count)}</span>
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

export default MostSendMessages;
