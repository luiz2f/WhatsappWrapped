import useMessageStreak from "../hooks/DataPages/useMessageStreak";

function MessageStreak() {
  const { data } = useMessageStreak();
  const { endDate, longestStreak, startDate } = data || {};

  return (
    <section>
      <div>
        <h1>Maior sequência de mensagens</h1>
        <div>
          <div></div>
          <div>
            <p>{longestStreak} dias</p>
            <p>é a maior sequência de mensagens</p>
            <p>
              ocorreu entren {startDate} e {endDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessageStreak;
