export function mostUsedMessages(messages) {
  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array");
    return {
      userMessageCount: {},
    };
  }

  const userMessageCount = {};

  const messageMap = new Map();

  const mensagensFiltradas = messages.filter(
    ({ tipo, mensagemAtual }) =>
      tipo === "mensagem" && mensagemAtual?.trim().split(/\s+/).length > 2
  );
  for (const message of mensagensFiltradas) {
    const user = message.usuario;
    const originalText = message.mensagemAtual?.trim();
    const text = originalText?.toLowerCase(); // Converte para minúsculas
    const tipo = message.tipo === "mensagem"; // Verifica o tipo da mensagem

    if (user && text && tipo) {
      if (!messageMap.has(text)) {
        messageMap.set(text, originalText);
      }

      if (!userMessageCount[user]) {
        userMessageCount[user] = {};
      }
      userMessageCount[user][text] = (userMessageCount[user][text] || 0) + 1;
    }
  }

  const getTopMessages = (messageCount, tamanho = 3) => {
    return Object.entries(messageCount)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, tamanho)
      .reduce((sortedArr, [normalizedMessage, count]) => {
        sortedArr.push({ message: messageMap.get(normalizedMessage), count });
        return sortedArr;
      }, []);
  };
  const data = Object.fromEntries(
    Object.entries(userMessageCount).map(([user, messageCount]) => [
      user,
      getTopMessages(messageCount),
    ])
  );

  return data;
}
