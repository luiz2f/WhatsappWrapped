export async function nonMessage(messages) {
  const startTime = performance.now();

  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array");
    return {};
  }

  // Contadores de tipos de mensagens por usuário
  const userTypeCount = {};

  for (const message of messages) {
    const user = message.usuario;
    const messageType = message.tipo.toLowerCase();

    if (user && messageType) {
      if (!userTypeCount[user]) {
        userTypeCount[user] = {};
      }

      userTypeCount[user][messageType] =
        (userTypeCount[user][messageType] || 0) + 1;
    }
  }
  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  console.log(`NonMessage: ${elapsedTime} milliseconds, ${endTime}`);
  return userTypeCount;
}
