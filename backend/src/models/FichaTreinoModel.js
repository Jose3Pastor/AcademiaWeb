export default class FichaTreino {
  constructor(
    id_ficha,
    fk_id_plano,
    nome,
    data_inicio,
    data_fim,
    observacoes,
    ativo
  ) {
    this.id_ficha = id_ficha;
    this.fk_id_plano = fk_id_plano;
    this.nome = nome;
    this.data_inicio = data_inicio;
    this.data_fim = data_fim;
    this.observacoes = observacoes;
    this.ativo = ativo;
  }
}
