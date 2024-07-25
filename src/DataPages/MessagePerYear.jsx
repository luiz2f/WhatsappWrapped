import useMessagePerPeriod from "../hooks/DataPages/useMessagePerPeriod";

function MessagePerYear() {
  const { data } = useMessagePerPeriod();
  const { year } = data || {};
  const calculateTotalMessages = (yearData) => {
    return Object.values(yearData).reduce((total, count) => total + count, 0);
  };
  return (
    <section>
      <div>
        <h1>Mensagens por ano</h1>

        <div>
          {year &&
            Object.entries(data.year).map(([year, users]) => {
              const totalMessages = calculateTotalMessages(users);
              return (
                <div key={year} style={{ marginBottom: "20px" }}>
                  <p>
                    {year} {totalMessages} mensagens
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
