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

  // Função para verificar se uma palavra deve ser ignorada
  const shouldIgnoreWord = (word) => {
    const cleanedWord = word.replace(/[^a-zA-Z]/g, ""); // Remove caracteres não alfabéticos
    const kCount = (cleanedWord.match(/k/gi) || []).length; // Conta o número de 'k' (ignorando maiúsculas e minúsculas)
    return cleanedWord.length > 0 && kCount / cleanedWord.length >= 0.7; // Verifica se 70% ou mais dos caracteres são 'k'
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
        if (word.length > 3 && !shouldIgnoreWord(word)) {
          // Ignora palavras com menos de 4 letras
          const factor = applyLengthFactor(word);
          userWordCount[user][word] = (userWordCount[user][word] || 0) + factor;
          totalWordCount[word] = (totalWordCount[word] || 0) + factor;
        }
      }
    }
  }

  // Função para obter as 10 palavras mais usadas e retornar como array de objetos
  const getTopWordsArray = (wordCount, number = 10) => {
    return Object.entries(wordCount)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, number) // Ajustado para retornar as 10 mais usadas
      .map(([word, count]) => ({ word, count }));
  };

  return {
    userWordCount: Object.fromEntries(
      Object.entries(userWordCount).map(([user, wordCount]) => [
        user,
        getTopWordsArray(wordCount, 15),
      ])
    ),
    totalWordCount: getTopWordsArray(totalWordCount, 15),
  };
}
