export function calcularValidade(tipo_plano) {
  const hoje = new Date();
  const validade = new Date(hoje);

  const duracoes = {
    mensal: 30,
    trimestral: 90,
    semestral: 180,
    anual: 365,
  };

  const dias = duracoes[tipo_plano] || 30; // fallback mensal
  validade.setDate(validade.getDate() + dias);

  // transformar em 'YYYY-MM-DD' pra bater com DATE no MySQL
  const ano = validade.getFullYear();
  const mes = String(validade.getMonth() + 1).padStart(2, "0");
  const dia = String(validade.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}
