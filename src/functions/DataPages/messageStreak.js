export function messageStreak(data) {
  if (!data) {
    console.error("Invalid messages array");
    return {
      longestStreak: 0,
      startDate: null,
      endDate: null,
    };
  }
  const primeiraMensagem = data[0];
  const [primeiraParte] = primeiraMensagem.dataHora.split(",")[0];
  const isDataAntes = /\d{2}\/\d{2}\/\d{4}/.test(primeiraParte.trim()) ? 1 : 0;

  const messages = [];
  const length = data.length;
  const extrairData = (dataHora) => dataHora.split(",")[isDataAntes].trim();

  for (let i = 0; i < length; i++) {
    const dataHora = data[i]?.dataHora;
    const dataHoraAnterior = i > 0 ? data[i - 1]?.dataHora : null;

    const dataAtual = extrairData(dataHora);
    const dataAnterior = dataHoraAnterior
      ? extrairData(dataHoraAnterior)
      : null;

    if (dataAtual !== dataAnterior) {
      messages.push(dataAtual);
    }
  }

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // Os meses são baseados em zero
  };

  const datesSet = new Set();

  for (const message of messages) {
    const dateStr = message; // Aqui assumimos que `message` é a string da data
    if (dateStr) {
      const date = parseDate(dateStr);
      datesSet.add(date.getTime()); // Usa timestamp como chave única
    }
  }

  const sortedDates = Array.from(datesSet)
    .map((dateStr) => new Date(dateStr))
    .sort((a, b) => a - b);

  const datesSize = sortedDates.length;

  if (datesSize === 0) {
    return {
      longestStreak: 0,
      startDate: null,
      endDate: null,
    };
  }

  let longestStreak = 1;
  let currentStreak = 1;
  let startDate = sortedDates[0];
  let endDate = sortedDates[0];

  for (let i = 1; i < datesSize; i++) {
    const prevDate = sortedDates[i - 1];
    const currentDate = sortedDates[i];
    const differenceInDays = (currentDate - prevDate) / 86400000; // 86400000 ms = 1 dia
    if (differenceInDays === 1) {
      currentStreak++;
      if (currentStreak > longestStreak) {
        endDate = currentDate;
      }
    } else if (differenceInDays > 1) {
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
        startDate = sortedDates[i - currentStreak];
        endDate = currentDate;
      }
      currentStreak = 1;
    }
  }

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
    endDate = sortedDates[datesSize - 1];
  }

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Os meses são baseados em zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return {
    longestStreak,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}
