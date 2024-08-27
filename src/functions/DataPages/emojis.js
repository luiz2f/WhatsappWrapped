export async function mostUsedEmojis(messages) {
  const startTime = performance.now();

  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array");
    return;
  }

  const emojiRegex =
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

  const ignoreList = [
    '"',
    "“",
    "”",
    "…",
    "’",
    "✹",
    "　",
    "さ",
    "り",
    "•",
    "🇦",
    "🇾",
    "ⓘ",
  ];

  const userEmojiCount = {};
  const totalEmojiCount = {};

  for (const message of messages) {
    const user = message.usuario;
    const tipo = message.tipo === "mensagem"; // Verifica o tipo da mensagem

    if (user && tipo && message.mensagemAtual) {
      const emojis = Array.from(message.mensagemAtual).filter(
        (char) => emojiRegex.test(char) && !ignoreList.includes(char)
      );

      if (emojis.length > 0) {
        if (!userEmojiCount[user]) {
          userEmojiCount[user] = {};
        }
        for (const emoji of emojis) {
          userEmojiCount[user][emoji] = (userEmojiCount[user][emoji] || 0) + 1;
          totalEmojiCount[emoji] = (totalEmojiCount[emoji] || 0) + 1;
        }
      }
    }
  }
  function getTopEmojisArray(emojiCount) {
    return Object.entries(emojiCount)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10)
      .map(([emoji, count]) => ({ emoji, count }));
  }

  // Obtém os 10 emojis mais usados por usuário e no total
  const topUserEmojis = Object.fromEntries(
    Object.entries(userEmojiCount).map(([user, emojiCount]) => [
      user,
      getTopEmojisArray(emojiCount),
    ])
  );
  const topTotalEmojis = getTopEmojisArray(totalEmojiCount);

  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  console.log(`mostUsedEmojis: ${elapsedTime} milliseconds, ${endTime}`);
  return {
    userEmojiCount: topUserEmojis,
    totalEmojiCount: topTotalEmojis,
  };
}
