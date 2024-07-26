export function coldStreak(messages) {
  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array");
    return {
      longestStreak: 0,
      startDate: null,
      endDate: null,
    };
  }

  // Função para converter data no formato "ano-mês-dia" para objeto Date
  const convertToDate = (ano, mes, dia) => {
    return new Date(`${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`);
  };

  // Função para formatar data no formato "dd/mm/yyyy"
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Os meses são baseados em zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Criar um conjunto para armazenar todas as datas únicas
  const datesSet = new Set();

  for (const message of messages) {
    const { ano, mes, dia } = message;
    if (ano && mes && dia) {
      const date = convertToDate(ano, mes, dia);
      datesSet.add(date.toISOString()); // Usa ISO string como chave única
    }
  }

  // Converter o conjunto para um array e ordenar
  const sortedDates = Array.from(datesSet)
    .map((dateStr) => new Date(dateStr))
    .sort((a, b) => a - b);

  let longestStreak = 1;
  let currentStreak = 1;
  let startDate = sortedDates[0];
  let endDate = sortedDates[0];
  let dateDiff = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i - 1];
    const currentDate = sortedDates[i];
    const differenceInDays = (currentDate - prevDate) / 86400000; // 86400000 ms = 1 dia
    if (differenceInDays != 1) {
      currentStreak += differenceInDays;
      dateDiff++;
      if (currentStreak > longestStreak) {
        endDate = currentDate;
      }
    } else if (differenceInDays <= 1.1) {
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
        startDate = sortedDates[i - dateDiff];
        endDate = currentDate;
      }
      currentStreak = 1;
      dateDiff = 1;
    }
  }

  // Verifica a última sequência
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
    endDate = sortedDates[sortedDates.length - 1];
  }

  return {
    longestStreak,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}
