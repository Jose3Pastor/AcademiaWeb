import db from "../config/db.js";
import Pagamento from "../models/PagamentoModel.js";

class PagamentoDAO {
  async listarTodos() {
    const [rows] = await db.query("SELECT * FROM Pagamento");
    return rows.map(
      (r) =>
        new Pagamento(
          r.id_pagamento,
          r.fk_id_aluno,
          r.valor,
          r.data_pagamento,
          r.data_validade,
          r.metodo_pagamento,
          r.status,
          r.tipo_plano
        )
    );
  }

  async listarPorAluno(idAluno) {
    const [rows] = await db.query(
      "SELECT * FROM Pagamento WHERE fk_id_aluno = ? ORDER BY data_validade DESC",
      [idAluno]
    );

    return rows.map(
      (r) =>
        new Pagamento(
          r.id_pagamento,
          r.fk_id_aluno,
          r.valor,
          r.data_pagamento,
          r.data_validade,
          r.metodo_pagamento,
          r.status,
          r.tipo_plano
        )
    );
  }

  async criar(p) {
    const [result] = await db.query(
      `INSERT INTO Pagamento 
       (fk_id_aluno, valor, data_validade, metodo_pagamento, status, tipo_plano)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        p.fk_id_aluno,
        p.valor,
        p.data_validade,
        p.metodo_pagamento,
        p.status,
        p.tipo_plano,
      ]
    );

    return result.insertId;
  }

  async buscarPorId(idPagamento) {
    const [rows] = await db.query(
      "SELECT * FROM Pagamento WHERE id_pagamento = ?",
      [idPagamento]
    );

    if (rows.length === 0) return null;
    const r = rows[0];

    return new Pagamento(
      r.id_pagamento,
      r.fk_id_aluno,
      r.valor,
      r.data_pagamento,
      r.data_validade,
      r.metodo_pagamento,
      r.status,
      r.tipo_plano
    );
  }

  async atualizarStatus(idPagamento, novoStatus, novaValidade = null) {
    let sql;
    let params;

    if (novaValidade) {
      sql =
        "UPDATE Pagamento SET status = ?, data_validade = ?, data_pagamento = NOW() WHERE id_pagamento = ?";
      params = [novoStatus, novaValidade, idPagamento];
    } else {
      sql = "UPDATE Pagamento SET status = ? WHERE id_pagamento = ?";
      params = [novoStatus, idPagamento];
    }

    const [result] = await db.query(sql, params);
    return result.affectedRows;
  }

  async deletar(id) {
    const [result] = await db.query(
      "DELETE FROM Pagamento WHERE id_pagamento = ?",
      [id]
    );
    return result.affectedRows;
  }

  async editarParcial(idPagamento, campos) {
  const keys = Object.keys(campos);
  const values = Object.values(campos);

  const sql =
    `UPDATE Pagamento SET ${keys.map(k => `${k} = ?`).join(", ")} 
     WHERE id_pagamento = ?`;

  const [result] = await db.query(sql, [...values, idPagamento]);
  return result.affectedRows;
}

}

export default new PagamentoDAO();
