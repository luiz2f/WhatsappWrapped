import useMessagePerPeriod from "../hooks/DataPages/useMessagePerPeriod";

function MessagePerHour() {
  const { data } = useMessagePerPeriod();
  const { hour } = data || {};
  const calculateTotalMessages = (hour) => {
    return Object.values(hour).reduce((total, count) => total + count, 0);
  };

  return (
    <section>
      <div>
        <h1>Mensagens por hora</h1>

        <div>
          {hour &&
            hour.map(({ hour: hourKey, users }) => {
              const totalMessages = calculateTotalMessages(users);

              return (
                <div key={hourKey}>
                  <p>
                    {hourKey}:00 -{" "}
                    {totalMessages === 0
                      ? "Nenhuma mensagem"
                      : `${totalMessages} mensagens`}
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

export default MessagePerHour;
