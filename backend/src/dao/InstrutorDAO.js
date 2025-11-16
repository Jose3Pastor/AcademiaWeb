import db from "../config/db.js";
import Instrutor from "../models/InstrutorModel.js";

class InstrutorDAO {
  async listarTodos() {
    const [rows] = await db.query("SELECT * FROM Instrutor");
    return rows.map(
      (r) =>
        new Instrutor(
          r.id_instrutor,
          r.nome,
          r.matricula,
          r.email,
          r.senha,
          r.data_nascimento,
          r.ativo,
          r.data_ingresso,
          r.data_saida
        )
    );
  }

  async inserir(instrutor) {
    const [result] = await db.query(
      `INSERT INTO Instrutor 
      (nome, matricula, email, senha, data_nascimento)
     VALUES (?, ?, ?, ?, ?)`,
      [
        instrutor.nome,
        instrutor.matricula,
        instrutor.email,
        instrutor.senha,
        instrutor.data_nascimento,
      ]
    );
    return result.insertId;
  }

  async editarParcial(id, campos) {
    const colunas = Object.keys(campos)
      .map((c) => `${c} = ?`)
      .join(", ");

    const valores = Object.values(campos);

    const [result] = await db.query(
      `UPDATE Instrutor SET ${colunas} WHERE id_instrutor = ?`,
      [...valores, id]
    );

    return result.affectedRows;
  }

  async desativar(id) {
    const [result] = await db.query(
      `UPDATE Instrutor SET ativo = 0, data_saida = NOW() WHERE id_instrutor = ?`,
      [id]
    );
    return result.affectedRows;
  }

  async reativar(id) {
    const [result] = await db.query(
      `UPDATE Instrutor SET ativo = 1, data_saida = NULL WHERE id_instrutor = ?`,
      [id]
    );
    return result.affectedRows;
  }

  async deletar(id) {
    const [result] = await db.query(
      "DELETE FROM Instrutor WHERE id_instrutor = ?",
      [id]
    );
    return result.affectedRows;
  }

  async buscarPorEmail(email) {
    const [rows] = await db.query("SELECT * FROM Instrutor WHERE email = ?", [
      email,
    ]);
    return rows.length ? rows[0] : null;
  }

  async buscarPorMatricula(matricula) {
    const [rows] = await db.query(
      "SELECT * FROM Instrutor WHERE matricula = ?",
      [matricula]
    );
    return rows.length ? rows[0] : null;
  }
}

export default new InstrutorDAO();
