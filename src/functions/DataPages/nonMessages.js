export function nonMessages(messages) {
  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array");
    return {};
  }

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

  return userTypeCount;
}
