/* eslint-disable */

export function transformData(data) {
  if (!data) {
    console.log(data, "data transform data is false");
    return;
  }
  const regexDataHora = /\[(\d{2}\/\d{2}\/\d{4}) (\d{2}:\d{2}:\d{2})\]/;
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

  const conversa2 = conversaLimpa.replace(/\n(?![\[])/g, " ");

  const linhas = conversa2.split("\n");

  const arrayData = [];

  let usuarioAtual = "";
  let dataAtual = "";
  let mensagemAtual = "";

  for (const linha of linhas) {
    if (linha[0] === "[" || linha[1] === "[") {
      const dataHoraMatch = linha.match(regexDataHora);
      const usuarioMatch = linha.match(regexUsuario);
      const mensagemMatch = linha.match(regexMensagem);

      mensagemAtual = mensagemMatch[1];
      usuarioAtual = usuarioMatch[1];
      dataAtual = dataHoraMatch[1];
      const [dia, mes, ano] = dataAtual.split("/");
      const [hora, minuto, segundo] = dataHoraMatch[2].split(":");
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
