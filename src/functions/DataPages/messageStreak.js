export function messageStreak(messages) {
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

  let longestStreak = 0;
  let startDate = null;
  let endDate = null;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i - 1];
    const currentDate = sortedDates[i];
    const differenceInDays = (currentDate - prevDate) / 86400000; // 86400000 ms = 1 dia

    if (differenceInDays > longestStreak) {
      longestStreak = differenceInDays - 1; // Desconta o último dia com mensagem
      startDate = new Date(prevDate.getTime() + 86400000); // Primeiro dia sem mensagem
      endDate = new Date(currentDate.getTime() - 86400000); // Último dia sem mensagem
    }
  }

  return {
    longestStreak,
    startDate: startDate ? formatDate(startDate) : null,
    endDate: endDate ? formatDate(endDate) : null,
  };
}
