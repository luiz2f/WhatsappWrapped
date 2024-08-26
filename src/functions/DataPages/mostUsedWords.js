export function mostUsedWords(messages) {
  // console.profile("25");
  const startTime = performance.now();

  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array");
    return {
      userWordCount: {},
      totalWordCount: {},
    };
  }

  // Função para aplicar fator de contagem com base no comprimento da palavra
  const applyLengthFactor = (word) => {
    const size = word.length;
    if (size === 4) return 0.5;
    if (size === 5) return 1;
    if (size >= 6) return 1.1;
    return 1; // Palavra com comprimento menor que 4 recebe fator 1
  };

  // Função para verificar se uma palavra deve ser ignorada
  const shouldIgnoreWord = (cleanedWord) => {
    const kCount = (cleanedWord.match(/k/gi) || []).length; // Conta o número de 'k'
    return kCount > 3; // Ignora se a palavra contiver mais de 3 'k'
  };

  const userWordCount = new Map();
  // const totalWordCount = new Map();
  const mensagensFiltradas = messages.filter(({ tipo }) => tipo === "mensagem");
  function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  for (const message of mensagensFiltradas) {
    const user = message.usuario;
    if (!userWordCount.has(user)) {
      userWordCount.set(user, new Map());
    }

    const words = normalizeText(message.mensagemAtual)
      .toLowerCase()
      .split(/\s+/);

    for (const word of words) {
      if (word.length > 3 && !shouldIgnoreWord(word)) {
        const factor = applyLengthFactor(word);
        const userWords = userWordCount.get(user);

        userWords.set(word, (userWords.get(word) || 0) + factor);
        // totalWordCount.set(cleanedWord, (totalWordCount.get(cleanedWord) || 0) + factor);
      }
    }
  }

  const getTopWordsArray = (wordCountMap, number = 10) => {
    return Array.from(wordCountMap.entries())
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, number)
      .map(([word, count]) => ({ word, count }));
  };

  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  console.log(`mostUsedWords: ${elapsedTime} milliseconds, ${endTime}`);
  // console.profileEnd("25");

  return {
    userWordCount: Object.fromEntries(
      Array.from(userWordCount.entries()).map(([user, wordCountMap]) => [
        user,
        getTopWordsArray(wordCountMap, 6),
      ])
    ),
    totalWordCount: 0,
  };
}
