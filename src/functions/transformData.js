/* eslint-disable */

export function transformData(data) {
  if (!data) {
    console.error(data, "data transform data is false");
    return;
  }
  const regexDataHora =
    /\[(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}:\d{2})\]|\[(\d{2}\/\d{2}\/\d{4}) (\d{2}:\d{2}:\d{2})\]/;
  const regexUsuario = /] (.+?):/;
  const regexMensagem = /: (.+)/;
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

  // Conversa de exemplo
  // const conversaSemQuebras = fs.readFileSync(caminhoArquivo).toString("utf-8");
  const conversaSemQuebras = data;

  const conversaLimpa = conversaSemQuebras.replace(/\u200E/g, "");

  const conversaSemQuebra = conversaLimpa.replace(/\n(?![\[])/g, " ");

  const conversaSemCifrao = conversaSemQuebra.replace(/[$`]/g, "");

  const linhas = conversaSemCifrao.split("\n");

  const arrayData = [];

  const usuarios = new Set();
  const usuarioMap = new Map();

  let usuarioAtual = "";
  let dataAtual = "";
  let mensagemAtual = "";
  let horaAtual = "";

  for (const linha of linhas.slice(0, 100)) {
    const dataHoraMatch = linha.match(regexDataHora);
    const usuarioMatch = linha.match(regexUsuario);

    if (usuarioMatch && dataHoraMatch) {
      if (usuarios.size < 2) {
        usuarios.add(usuarioMatch[1]);
      }
      if (usuarios.size >= 2 && usuarios.has(usuarioMatch[1])) {
        usuarioMap.set(usuarioMatch[1], true);
      }
    }
  }

  for (const linha of linhas) {
    if (linha[0] === "[" || linha[1] === "[") {
      const dataHoraMatch = linha.match(regexDataHora);
      const usuarioMatch = linha.match(regexUsuario);
      const mensagemMatch = linha.match(regexMensagem);
      if (!dataHoraMatch) {
        continue;
      }
      if (!usuarioMatch) {
        continue;
      }
      if (
        !mensagemMatch ||
        mensagemMatch[1] ===
          "Aguardando mensagem. Essa ação pode levar alguns instantes."
      ) {
        continue;
      }
      mensagemAtual = mensagemMatch[1];
      usuarioAtual = usuarioMatch[1];
      dataAtual = dataHoraMatch[3] || dataHoraMatch[1];
      horaAtual = dataHoraMatch[4] || dataHoraMatch[2];
      const [dia, mes, ano] = dataAtual?.split("/");
      const [hora, minuto, segundo] = horaAtual.split(":");
      const diaDaSemana = new Date(`${mes}/${dia}/${ano}`).toLocaleDateString(
        "pt-BR",
        { weekday: "long" }
      );

      let tipo = "mensagem";
      // Verificando o tipo da mensagem
      for (const key in regexTipos) {
        if (mensagemAtual.match(regexTipos[key])) {
          tipo = key;
          mensagemAtual = "";
          break;
        }
      }

      arrayData.push({
        usuario: usuarioAtual,
        mensagemAtual,
        ano,
        mes,
        dia,
        diaDaSemana,
        hora,
        // minuto,
        // segundo,
        tipo,
      });
    } else
      arrayData.push({
        usuario: "bug",
      });
  }

  return arrayData;
}
