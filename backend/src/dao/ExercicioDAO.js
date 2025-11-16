import db from "../config/db.js";
import Exercicio from "../models/ExercicioModel.js";

class ExercicioDAO {
  async listarPorFicha(idFicha) {
    const [rows] = await db.query(
      "SELECT * FROM Exercicio WHERE fk_id_ficha = ?",
      [idFicha]
    );

    return rows.map(
      (r) =>
        new Exercicio(
          r.id_exercicio,
          r.fk_id_ficha,
          r.nome,
          r.series,
          r.repeticoes,
          r.carga,
          r.intervalo_segundos,
          r.observacoes
        )
    );
  }

  async criar(exercicio) {
    const [result] = await db.query(
      `INSERT INTO Exercicio
      (fk_id_ficha, nome, series, repeticoes, carga, intervalo_segundos, observacoes)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        exercicio.fk_id_ficha,
        exercicio.nome,
        exercicio.series,
        exercicio.repeticoes,
        exercicio.carga,
        exercicio.intervalo_segundos,
        exercicio.observacoes,
      ]
    );

    return result.insertId;
  }

  async atualizarParcial(id, campos) {
    const keys = Object.keys(campos);
    const values = Object.values(campos);

    const sql = `UPDATE Exercicio SET ${keys
      .map((k) => `${k} = ?`)
      .join(", ")} WHERE id_exercicio = ?`;

    const [result] = await db.query(sql, [...values, id]);
    return result.affectedRows;
  }

  async deletar(idExercicio) {
    const [result] = await db.query(
      "DELETE FROM Exercicio WHERE id_exercicio = ?",
      [idExercicio]
    );
    return result.affectedRows;
  }

  async buscarPorId(idExercicio) {
    const [rows] = await db.query(
      "SELECT * FROM Exercicio WHERE id_exercicio = ?",
      [idExercicio]
    );

    if (rows.length === 0) return null;

    const r = rows[0];

    return new Exercicio(
      r.id_exercicio,
      r.fk_id_ficha,
      r.nome,
      r.series,
      r.repeticoes,
      r.carga,
      r.intervalo_segundos,
      r.observacoes
    );
  }

  async buscarPorNome(nome) {
    const like = `%${nome}%`;

    const [rows] = await db.query("SELECT * FROM Exercicio WHERE nome LIKE ?", [
      like,
    ]);

    return rows.map(
      (r) =>
        new Exercicio(
          r.id_exercicio,
          r.fk_id_ficha,
          r.nome,
          r.series,
          r.repeticoes,
          r.carga,
          r.intervalo_segundos,
          r.observacoes
        )
    );
  }
}

export default new ExercicioDAO();
