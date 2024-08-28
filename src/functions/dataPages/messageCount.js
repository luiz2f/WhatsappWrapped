export default function messageCount(messages) {
  const contagemPorUsuario = {};
  for (const message of messages) {
    if (message.usuario && message.usuario !== "bug") {
      if (!contagemPorUsuario[message.usuario]) {
        contagemPorUsuario[message.usuario] = 0;
      }
      contagemPorUsuario[message.usuario]++;
    }
  }

  return contagemPorUsuario;
}
