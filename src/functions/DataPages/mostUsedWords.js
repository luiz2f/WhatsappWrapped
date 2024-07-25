export function mostUsedWords(messages) {
  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array");
    return {
      userWordCount: {},
      totalWordCount: {},
    };
  }

  // Função para aplicar fator de contagem com base no comprimento da palavra
  const applyLengthFactor = (word) => {
    if (word.length === 4) return 0.5;
    if (word.length === 5) return 1;
    if (word.length >= 6) return 1.1;
    return 1; // Palavra com comprimento menor que 4 recebe fator 1
  };

  // Contadores de palavras por usuário e total
  const userWordCount = {};
  const totalWordCount = {};

  for (const message of messages) {
    const user = message.usuario;
    const tipo = message.tipo; // Verifica o tipo da mensagem
    if (user && tipo === "mensagem" && message.mensagemAtual) {
      if (!userWordCount[user]) {
        userWordCount[user] = {};
      }
      const words = message.mensagemAtual.toLowerCase().split(/\s+/);
      for (const word of words) {
        if (word.length > 3) {
          // Ignora palavras com menos de 4 letras
          const factor = applyLengthFactor(word);
          userWordCount[user][word] = (userWordCount[user][word] || 0) + factor;
          totalWordCount[word] = (totalWordCount[word] || 0) + factor;
        }
      }
    }
  }

  // Função para obter as 10 palavras mais usadas e retornar como array de objetos
  const getTopWordsArray = (wordCount) => {
    return Object.entries(wordCount)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10) // Ajustado para retornar as 10 mais usadas
      .map(([word, count]) => ({ word, count }));
  };

  return {
    userWordCount: Object.fromEntries(
      Object.entries(userWordCount).map(([user, wordCount]) => [
        user,
        getTopWordsArray(wordCount),
      ])
    ),
    totalWordCount: getTopWordsArray(totalWordCount),
  };
}
