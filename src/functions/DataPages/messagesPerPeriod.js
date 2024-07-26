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

export function messagesPerPeriod(messages) {
  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array");
    return {};
  }

  // Estrutura para armazenar contagens
  const result = {
    year: {},
    day: {},
    hour: [], // Modificado para ser uma array
  };

  for (const message of messages) {
    const user = message.usuario?.trim();
    const year = message.ano?.trim();
    const dayOfWeek = message.diaDaSemana?.trim();
    const hour = message.hora?.trim();

    if (user && year && dayOfWeek && hour) {
      // Inicializa o ano, dia da semana e hora se necessário
      if (!result.year[year]) {
        result.year[year] = {};
      }
      if (!result.day[dayOfWeek]) {
        result.day[dayOfWeek] = {};
      }
      if (!result.hour[hour]) {
        result.hour[hour] = {};
      }

      // Contadores por usuário
      result.year[year][user] = (result.year[year][user] || 0) + 1;
      result.day[dayOfWeek][user] = (result.day[dayOfWeek][user] || 0) + 1;
      result.hour[hour][user] = (result.hour[hour][user] || 0) + 1;
    }
  }

  // Ordena os dias da semana
  const sortedDays = dayOrder.reduce((acc, day) => {
    if (result.day[day]) {
      acc[day] = result.day[day];
    }
    return acc;
  }, {});

  // Ordena as horas do dia e cria a array no formato desejado
  const sortedHours = hourOrder.map((hourKey) => ({
    hour: hourKey,
    users: result.hour[hourKey] || {},
  }));
  const transformYearData = (data) => {
    return Object.entries(data).map(([year, users]) => {
      return {
        x: year,
        ...users,
      };
    });
  };
  const newhour = sortedHours
    .map(({ hour, users }) =>
      Object.entries(users).map(([subgroup, value]) => ({
        group: hour,
        subgroup,
        value,
      }))
    )
    .flat();

  return {
    year: transformYearData(result.year),
    day: transformYearData(sortedDays),
    hour: newhour, // Agora é uma array
  };
}
