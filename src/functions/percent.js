export function percent(number) {
  // Multiplica o número por 100 e arredonda para remover casas decimais
  const percentage = Math.floor(number * 100);

  // Retorna o valor formatado como porcentagem
  return `${percentage}%`;
}
