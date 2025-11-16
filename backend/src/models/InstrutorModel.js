export default class Instrutor {
  constructor(
    id_instrutor,
    nome,
    matricula,
    email,
    senha,
    data_nascimento,
    ativo,
    data_ingresso,
    data_saida
  ) {
    this.id_instrutor = id_instrutor;
    this.nome = nome;
    this.matricula = matricula;
    this.email = email;
    this.senha = senha;
    this.data_nascimento = data_nascimento;
    this.ativo = ativo;
    this.data_ingresso = data_ingresso;
    this.data_saida = data_saida;
  }
}
