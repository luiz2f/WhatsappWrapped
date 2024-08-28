export default function wordCount(messages) {
  const wordCountPerUser = {};

  for (const message of messages) {
    if (message.usuario && message.usuario !== "bug" && message.mensagemAtual) {
      const wordCount = message.mensagemAtual.split(/\s+/).length;

      if (!wordCountPerUser[message.usuario]) {
        wordCountPerUser[message.usuario] = 0;
      }
      wordCountPerUser[message.usuario] += wordCount;
    }
  }

  return wordCountPerUser;
}
