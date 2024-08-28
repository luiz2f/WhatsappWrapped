export function messageCount(messages) {
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

  // Retorna o objeto com a contagem de mensagens
  return contagemPorUsuario;
}
