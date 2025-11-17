import db from "../config/db.js";
import PlanoTreino from "../models/PlanoTreinoModel.js";

class PlanoTreinoDAO {
  // async listarPorAluno(idAluno) {
  //   const [rows] = await db.query(
  //     "SELECT * FROM PlanoTreino WHERE fk_id_aluno = ?",
  //     [idAluno]
  //   );

  //   return rows.map(
  //     r =>
  //       new PlanoTreino(
  //         r.id_plano, r.fk_id_aluno, r.fk_id_instrutor,
  //         r.descricao, r.duracao_semanas, r.data_criacao,
  //         r.data_termino, r.ativo
  //       )
  //   );
  // }

  async listarPorAluno(idAluno) {
    const [rows] = await db.query(
      `SELECT 
          p.*,
          a.nome AS nome_aluno,
          i.nome AS nome_instrutor
       FROM PlanoTreino p
       JOIN Aluno a ON a.id_aluno = p.fk_id_aluno
       JOIN Instrutor i ON i.id_instrutor = p.fk_id_instrutor
       WHERE p.fk_id_aluno = ?`,
      [idAluno]
    );

    return rows.map((r) => ({
      id_plano: r.id_plano,
      descricao: r.descricao,
      duracao_semanas: r.duracao_semanas,
      data_criacao: r.data_criacao,
      ativo: r.ativo,
      aluno: { id: r.fk_id_aluno, nome: r.nome_aluno },
      instrutor: { id: r.fk_id_instrutor, nome: r.nome_instrutor },
    }));
  }

  async buscarPorId(idPlano) {
    const [rows] = await db.query(
      `SELECT 
          p.*,
          a.nome AS nome_aluno,
          i.nome AS nome_instrutor
       FROM PlanoTreino p
       JOIN Aluno a ON a.id_aluno = p.fk_id_aluno
       JOIN Instrutor i ON i.id_instrutor = p.fk_id_instrutor
       WHERE p.id_plano = ?`,
      [idPlano]
    );
    return rows[0] || null;
  }

  async criar(plano) {
    const [result] = await db.query(
      `INSERT INTO PlanoTreino (fk_id_aluno, fk_id_instrutor, descricao, duracao_semanas)
       VALUES (?, ?, ?, ?)`,
      [
        plano.fk_id_aluno,
        plano.fk_id_instrutor,
        plano.descricao,
        plano.duracao_semanas,
      ]
    );
    return result.insertId;
  }

  async atualizarParcial(id, campos) {
    const keys = Object.keys(campos);
    const values = Object.values(campos);

    const sql = `UPDATE PlanoTreino SET ${keys
      .map((k) => `${k} = ?`)
      .join(", ")} WHERE id_plano = ?`;

    const [result] = await db.query(sql, [...values, id]);
    return result.affectedRows;
  }

  async desativar(idPlano) {
    const [result] = await db.query(
      `UPDATE PlanoTreino 
       SET ativo = 0, data_termino = NOW()
       WHERE id_plano = ?`,
      [idPlano]
    );
    return result.affectedRows;
  }

  async deletar(idPlano) {
    const [result] = await db.query(
      "DELETE FROM PlanoTreino WHERE id_plano = ?",
      [idPlano]
    );
    return result.affectedRows;
  }
}

export default new PlanoTreinoDAO();
