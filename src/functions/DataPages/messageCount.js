export function messageCount(messages) {
  const startTime = performance.now();

  // Cria um objeto para armazenar a contagem de mensagens por usuário
  const contagemPorUsuario = {};
  // Itera sobre cada mensagem
  for (const message of messages) {
    // Verifica se a mensagem tem um usuário válido
    if (message.usuario && message.usuario !== "bug") {
      // Incrementa a contagem de mensagens para o usuário
      if (!contagemPorUsuario[message.usuario]) {
        contagemPorUsuario[message.usuario] = 0;
      }
      contagemPorUsuario[message.usuario]++;
    }
  }
  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  console.log(`messageCount: ${elapsedTime} milliseconds, ${endTime}`);
  // Retorna o objeto com a contagem de mensagens
  return contagemPorUsuario;
}

// export function totalMessages(messages) {
//   const startTime = performance.now();

//   const validMessages = messages.filter((obj) => obj.usuario !== "bug");
//   const totalCount = validMessages.length;
//   const endTime = performance.now();
//   const elapsedTime = endTime - startTime;
//   console.log(`TOTALMESSAGES: ${elapsedTime} milliseconds, ${endTime}`);
//   return totalCount;
// }
