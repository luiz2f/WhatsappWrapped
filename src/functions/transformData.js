/* eslint-disable */
const regexUsuario = /] (.+?):/;
const regexMensagem = /: (.+)/;
const regexConteudoColchetes = /\[(.+?)\]/;
const regexTipos = {
  imagem: /imagem ocultada/,
  figurinha: /figurinha omitida/,
  audio: /áudio ocultado/,
  video: /vídeo omitido/,
  gif: /GIF omitido/,
  documento: /documento omitido$/,
  ligacao: /^Ligação de voz/,
  contato: /Cartão do contato omitido/,
};
const regexRemoveAndReplace = /[\u200E$`]|(?<=\])\n(?![\[])/g;

function extractUsuario(linha) {
  return linha.match(regexUsuario);
}

function determinarTipoMensagem(mensagem) {
  for (const [key, regex] of Object.entries(regexTipos)) {
    if (mensagem.match(regex)) {
      return key;
    }
  }
  return "mensagem";
}

export function transformData(data) {
  if (!data) {
    console.error(data, "data transform data is false");
    return [];
  }

  // Remove caracter maluco que tinha no txt e mensagens com quebra de linha
  const conversaLimpa = data.replace(regexRemoveAndReplace, (match) =>
    match === "\n" ? " " : ""
  );

  // Divide o texto em linhas
  const linhas = [...new Set(conversaLimpa.split("\n"))];

  const mensagens = [];
  const usuarios = new Map();

  // Analisa as primeiras 100 linhas para identificar os usuários principais
  linhas.slice(0, 100).forEach((linha) => {
    const usuarioMatch = extractUsuario(linha);
    if (usuarioMatch) {
      const usuario = usuarioMatch[1];
      usuarios.set(usuario, (usuarios.get(usuario) || 0) + 1);
    }
  });

  // Identifica os dois usuários mais frequentes
  const usuariosPrincipais = [...usuarios.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([usuario]) => usuario);

  // Itera sobre todas as linhas, processando apenas as mensagens dos usuários principais
  linhas.forEach((linha) => {
    const conteudoColchetes = linha.match(regexConteudoColchetes);
    const usuarioMatch = linha.match(regexUsuario);
    const mensagemMatch = linha.match(regexMensagem);
    if (
      conteudoColchetes &&
      usuarioMatch &&
      mensagemMatch &&
      usuariosPrincipais.includes(usuarioMatch[1]) &&
      mensagemMatch[1] !==
        "Aguardando mensagem. Essa ação pode levar alguns instantes."
    ) {
      const tipo = determinarTipoMensagem(mensagemMatch[1]);

      mensagens.push({
        usuario: usuarioMatch[1],
        mensagemAtual: mensagemMatch[1],
        dataHora: conteudoColchetes[1],
        tipo,
      });
    }
  });

  return mensagens;
}
