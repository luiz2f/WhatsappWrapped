export const dayOrder = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];
export const hourOrder = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

export function messagesPerPeriod(messages, usuarios) {
  const startTime = performance.now();

  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array");
    return {};
  }

  const result = {
    year: {},
    day: {},
    hour: [],
  };

  for (const message of messages) {
    const user = message.usuario?.trim();
    const dataHora = message.dataHora?.trim();
    const type = message.tipo?.trim();

    if (user && dataHora && type) {
      // Extrair data e hora
      const [date, time] = dataHora.split(", ");
      const [day, month, year] = date.split("/").map(Number);
      const [hour] = time.split(":");

      // Mapeia o dia da semana
      const dateObj = new Date(year, month - 1, day);
      const dayOfWeek = dayOrder[dateObj.getDay()];

      if (dayOfWeek && hour) {
        if (!result.year[year]) {
          result.year[year] = {};
        }
        if (!result.day[dayOfWeek]) {
          result.day[dayOfWeek] = {};
        }
        if (!result.hour[hour]) {
          result.hour[hour] = {};
        }

        result.year[year][user] = (result.year[year][user] || 0) + 1;
        result.day[dayOfWeek][user] = (result.day[dayOfWeek][user] || 0) + 1;
        result.hour[hour][user] = (result.hour[hour][user] || 0) + 1;
      }
    }
  }

  const sortedDays = dayOrder.reduce((acc, day) => {
    if (result.day[day]) {
      acc[day] = result.day[day];
    }
    return acc;
  }, {});

  const sortedHours = hourOrder.map((hourKey) => ({
    hour: hourKey,
    users: result.hour[hourKey] || {},
  }));

  function transformYearData(data) {
    return Object.entries(data)
      .filter(([year, users]) => {
        const totalMessages = Object.values(users).reduce(
          (sum, count) => sum + count,
          0
        );
        return totalMessages >= 10; // Filtra anos com menos de 10 mensagens
      })
      .map(([year, users]) => {
        return {
          x: year,
          ...sortUsers(users),
        };
      });
  }

  function transformWeekDayData(data) {
    return Object.entries(data).map(([day, users]) => {
      return {
        x: day,
        ...sortUsers(users),
      };
    });
  }

  function sortUsers(users) {
    const sortedUsers = usuarios.reduce((acc, user) => {
      if (users[user] !== undefined) {
        acc[user] = users[user];
      }
      return acc;
    }, {});

    return sortedUsers;
  }

  const newHour = sortedHours
    .map(({ hour, users }) =>
      Object.entries(sortUsers(users)).map(([subgroup, value]) => ({
        group: hour,
        subgroup,
        value,
      }))
    )
    .flat();

  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  console.log(`messagesPerPeriod: ${elapsedTime} milliseconds, ${endTime}`);

  return {
    year: transformYearData(result.year),
    day: transformWeekDayData(sortedDays),
    hour: newHour, // Agora é uma array
  };
}
