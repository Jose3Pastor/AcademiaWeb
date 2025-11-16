export default class Aluno {
  constructor(
    id_aluno,
    nome,
    matricula,
    email,
    senha,
    data_nascimento,
    peso,
    altura,
    observacoes,
    ativo,
    data_ingresso,
    data_saida
  ) {
    this.id_aluno = id_aluno;
    this.nome = nome;
    this.matricula = matricula;
    this.email = email;
    this.senha = senha;
    this.data_nascimento = data_nascimento;
    this.peso = peso;
    this.altura = altura;
    this.observacoes = observacoes;
    this.ativo = ativo;
    this.data_ingresso = data_ingresso;
    this.data_saida = data_saida;
  }
}
