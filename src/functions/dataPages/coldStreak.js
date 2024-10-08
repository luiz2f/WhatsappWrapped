export function coldStreak(data) {
  if (!data) {
    console.error("Invalid data array");
    return {
      longestStreak: 0,
      startDate: null,
      endDate: null,
    };
  }

  const primeiraMensagem = data[0];
  const delimitador = primeiraMensagem.dataHora.includes(",") ? "," : " ";
  const [primeiraParte] = primeiraMensagem.dataHora.split(delimitador)[0];
  const isDataAntes = /\d{2}\/\d{2}\/\d{4}/.test(primeiraParte.trim()) ? 1 : 0;

  const messages = [];
  const length = data.length;
  const extrairData = (dataHora) =>
    dataHora.split(delimitador)[isDataAntes].trim();

  // Mapeia todo o array usando a lógica decidida
  for (let i = 0; i < length; i++) {
    const dataHora = data[i]?.dataHora;
    const dataHoraAnterior = i > 0 ? data[i - 1]?.dataHora : null;

    // Extrai a data das strings dataHora e dataHoraAnterior
    const dataAtual = extrairData(dataHora);
    const dataAnterior = dataHoraAnterior
      ? extrairData(dataHoraAnterior)
      : null;

    if (dataAtual !== dataAnterior) {
      messages.push(dataAtual);
    }
  }

  // Função para converter data no formato "dd/mm/yyyy" para objeto Date
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // Os meses são baseados em zero
  };
  // Criar um conjunto para armazenar todas as datas únicas
  const datesSet = new Set();

  // Função para formatar data no formato "dd/mm/yyyy"
  for (const message of messages) {
    const dateStr = message; // Aqui assumimos que `message` é a string da data
    if (dateStr) {
      const date = parseDate(dateStr);
      datesSet.add(date.getTime()); // Usa timestamp como chave única
    }
  }

  // Criar um conjunto para armazenar todas as datas únicas
  const sortedDates = Array.from(datesSet)
    .map((timestamp) => new Date(timestamp))
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

    if (differenceInDays > longestStreak) {
      longestStreak = differenceInDays;
      startDate = prevDate;
      endDate = currentDate;
    }
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
