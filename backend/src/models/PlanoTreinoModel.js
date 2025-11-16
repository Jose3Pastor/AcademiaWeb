export default class PlanoTreino {
  constructor(
    id_plano,
    fk_id_aluno,
    fk_id_instrutor,
    descricao,
    duracao_semanas,
    data_criacao,
    data_termino,
    ativo
  ) {
    this.id_plano = id_plano;
    this.fk_id_aluno = fk_id_aluno;
    this.fk_id_instrutor = fk_id_instrutor;
    this.descricao = descricao;
    this.duracao_semanas = duracao_semanas;
    this.data_criacao = data_criacao;
    this.data_termino = data_termino;
    this.ativo = ativo;
  }
}
