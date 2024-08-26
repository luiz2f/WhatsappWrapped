export function wordCount(messages) {
  const startTime = performance.now();

  //CONTA AS PALAVRAS TOTAIS PARA A MENSAGEM DO MEIO, NÃO CONTA AS PALAVRAS POR USUARIO

  // Cria um objeto para armazenar a contagem de palavras por usuário
  const wordCountPerUser = {};

  // Itera sobre cada mensagem
  for (const message of messages) {
    // Verifica se a mensagem tem um usuário válido e uma mensagem não vazia
    if (message.usuario && message.usuario !== "bug" && message.mensagemAtual) {
      // Conta o número de palavras na mensagem
      const wordCount = message.mensagemAtual.split(/\s+/).length;

      // Adiciona ou incrementa a contagem de palavras para o usuário
      if (!wordCountPerUser[message.usuario]) {
        wordCountPerUser[message.usuario] = 0;
      }
      wordCountPerUser[message.usuario] += wordCount;
    }
  }

  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  console.log(`wordCount: ${elapsedTime} milliseconds, ${endTime}`);
  // Retorna o objeto com a contagem de palavras
  return wordCountPerUser;
}
