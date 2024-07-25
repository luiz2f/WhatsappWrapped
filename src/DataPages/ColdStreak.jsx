import useColdStreak from "../hooks/DataPages/useColdStreak";

function ColdStreak() {
  const { data } = useColdStreak();
  const { endDate, longestStreak, startDate } = data || {};

  return (
    <section>
      <div>
        <h1>Maior sequência sem mensagens</h1>
        <div>
          <div></div>
          <div>
            <p>{longestStreak} dias</p>
            <p>é a maior sequência de dias sem mensagens</p>
            <p>
              ocorreu entren {startDate} e {endDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ColdStreak;
