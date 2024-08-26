export function formatNumber(number) {
  if (!number) {
    return 0;
  }
  // Converte o número para uma string e adiciona pontos como separadores de milhar
  return number.toLocaleString("pt-BR");
}
