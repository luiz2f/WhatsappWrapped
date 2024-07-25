export function mostUsedMessages(messages) {
  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array");
    return {
      userMessageCount: {},
      totalMessageCount: {},
    };
  }

  // Conta mensagens por usuário
  const userMessageCount = {};
  const totalMessageCount = {};

  // Mapeia versões normalizadas para originais
  const messageMap = new Map();

  // Contadores de progresso
  let analyzedMessages = 0;

  for (const message of messages) {
    const user = message.usuario;
    const originalText = message.mensagemAtual?.trim();
    const text = originalText?.toLowerCase(); // Converte para minúsculas
    const tipo = message.tipo === "mensagem"; // Verifica o tipo da mensagem

    if (user && text && tipo) {
      // Mapeia a versão normalizada para a original
      if (!messageMap.has(text)) {
        messageMap.set(text, originalText);
      }

      const words = text.split(/\s+/); // Divide a mensagem em palavras
      if (words.length > 2) {
        // Verifica se a mensagem tem mais de duas palavras
        if (!userMessageCount[user]) {
          userMessageCount[user] = {};
        }
        userMessageCount[user][text] = (userMessageCount[user][text] || 0) + 1;
        totalMessageCount[text] = (totalMessageCount[text] || 0) + 1;
      }
    }

    // Atualiza o contador de progresso
    analyzedMessages++;
  }

  // Função para ordenar o objeto de contagem de mensagens em ordem decrescente e retornar as 10 mais enviadas
  const getTopMessages = (messageCount) => {
    return Object.entries(messageCount)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 3)
      .reduce((sortedArr, [normalizedMessage, count]) => {
        sortedArr.push({ message: messageMap.get(normalizedMessage), count });
        return sortedArr;
      }, []);
  };

  return {
    userMessageCount: Object.fromEntries(
      Object.entries(userMessageCount).map(([user, messageCount]) => [
        user,
        getTopMessages(messageCount),
      ])
    ),
    totalMessageCount: getTopMessages(totalMessageCount),
  };
}
