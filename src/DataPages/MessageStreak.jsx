import useMessageStreak from "../hooks/dataPages/useMessageStreak";

function MessageStreak() {
  const { data } = useMessageStreak();
  const { endDate, longestStreak, startDate } = data || {};
  return (
    <section>
      <div>
        <h1>Maior sequência de mensagens</h1>
        <div className="streak">
          <div>
            <img src="https://em-content.zobj.net/source/apple/391/fire_1f525.png" />
          </div>
          <div>
            <p>
              {longestStreak}
              <span>dias</span>
            </p>
            <p>é a maior sequência de mensagens entre vocês</p>
            <p>
              ocorreu entre {startDate} e {endDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessageStreak;
