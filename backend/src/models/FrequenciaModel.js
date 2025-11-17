export default class Frequencia {
  constructor(id_frequencia, fk_id_aluno, data, presenca) {
    this.id_frequencia = id_frequencia;
    this.fk_id_aluno = fk_id_aluno;
    this.data = data;
    this.presenca = presenca;
  }
}

