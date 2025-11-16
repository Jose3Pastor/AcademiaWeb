export default class Pagamento {
    constructor(id, aluno, valor, dataPag, dataVal, metodo, status) {
    this.id_pagamento = id;
    this.fk_id_aluno = aluno;
    this.valor = valor;
    this.data_pagamento = dataPag;
    this.data_validade = dataVal;
    this.metodo_pagamento = metodo;
    this.status = status;
  }
}