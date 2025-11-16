export default class Exercicio {
  constructor(
    id_exercicio,
    fk_id_ficha,
    nome,
    series,
    repeticoes,
    carga,
    intervalo_segundos,
    observacoes
  ) {
    this.id_exercicio = id_exercicio;
    this.fk_id_ficha = fk_id_ficha;
    this.nome = nome;
    this.series = series;
    this.repeticoes = repeticoes;
    this.carga = carga;
    this.intervalo_segundos = intervalo_segundos;
    this.observacoes = observacoes;
  }
}
