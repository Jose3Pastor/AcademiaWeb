import db from "../config/db.js";
import FichaTreino from "../models/FichaTreinoModel.js";

class FichaTreinoDAO {
  
    async listarPorPlano(idPlano) {
    const [rows] = await db.query(
      `SELECT
          f.*,
          p.descricao AS plano_descricao,
          a.nome AS nome_aluno,
          i.nome AS nome_instrutor
       FROM FichaTreino f
       JOIN PlanoTreino p ON p.id_plano = f.fk_id_plano
       JOIN Aluno a ON a.id_aluno = p.fk_id_aluno
       JOIN Instrutor i ON i.id_instrutor = p.fk_id_instrutor
       WHERE f.fk_id_plano = ?`,
      [idPlano]
    );

    return rows;
  }

  async buscarPorId(idFicha) {
    const [rows] = await db.query(
      `SELECT
          f.*,
          p.descricao AS plano_descricao,
          i.nome AS nome_instrutor
       FROM FichaTreino f
       JOIN PlanoTreino p ON p.id_plano = f.fk_id_plano
       JOIN Instrutor i ON i.id_instrutor = p.fk_id_instrutor
       WHERE f.id_ficha = ?`,
      [idFicha]
    );

    return rows[0] || null;
  }

  async criar(ficha) {
    const [result] = await db.query(
      `INSERT INTO FichaTreino (fk_id_plano, nome, data_inicio, observacoes)
       VALUES (?, ?, NOW(), ?)`,
      [ficha.fk_id_plano, ficha.nome, ficha.observacoes]
    );

    return result.insertId;
  }

  async atualizarParcial(id, campos) {
    const keys = Object.keys(campos);
    const values = Object.values(campos);

    const sql = `UPDATE FichaTreino SET ${keys.map(k => `${k} = ?`).join(", ")} WHERE id_ficha = ?`;

    const [result] = await db.query(sql, [...values, id]);
    return result.affectedRows;
  }

  async desativar(idFicha) {
    const [result] = await db.query(
      `UPDATE FichaTreino
       SET ativo = 0, data_fim = NOW()
       WHERE id_ficha = ?`,
      [idFicha]
    );
    return result.affectedRows;
  }

  async deletar(idFicha) {
    const [result] = await db.query(
      "DELETE FROM FichaTreino WHERE id_ficha = ?",
      [idFicha]
    );
    return result.affectedRows;
  }
}

export default new FichaTreinoDAO();
