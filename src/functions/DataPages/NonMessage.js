export function NonMessage(messages) {
  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array");
    return {};
  }

  // Contadores de tipos de mensagens por usuário
  const userTypeCount = {};

  for (const message of messages) {
    const user = message.usuario?.trim();
    const messageType = message.tipo?.trim().toLowerCase();

    if (user && messageType) {
      if (!userTypeCount[user]) {
        userTypeCount[user] = {};
      }

      userTypeCount[user][messageType] =
        (userTypeCount[user][messageType] || 0) + 1;
    }
  }

  return userTypeCount;
}
