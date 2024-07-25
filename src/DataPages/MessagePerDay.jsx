import useMessagePerPeriod from "../hooks/DataPages/useMessagePerPeriod";

function MessagePerYear() {
  const { data } = useMessagePerPeriod();
  const { day } = data || {};
  const calculateTotalMessages = (day) => {
    return Object.values(day).reduce((total, count) => total + count, 0);
  };
  return (
    <section>
      <div>
        <h1>Mensagens por dia da semana</h1>

        <div>
          {day &&
            Object.entries(day).map(([day, users]) => {
              const totalMessages = calculateTotalMessages(users);
              return (
                <div key={day} style={{ marginBottom: "20px" }}>
                  <p>
                    {day} - {totalMessages} mensagens
                  </p>
                  {Object.entries(users).map(([user, count]) => (
                    <p key={user}>
                      {user}: {count}
                    </p>
                  ))}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default MessagePerYear;
