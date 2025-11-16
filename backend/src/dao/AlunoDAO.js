import db from "../config/db.js";
import Aluno from "../models/AlunoModel.js";

class AlunoDAO {
  async listarTodos() {
    const [rows] = await db.query("SELECT * FROM Aluno");
    return rows.map(
      (r) =>
        new Aluno(
          r.id_aluno,
          r.nome,
          r.matricula,
          r.email,
          r.senha,
          r.data_nascimento,
          r.peso,
          r.altura,
          r.observacoes,
          r.ativo,
          r.data_ingresso,
          r.data_saida
        )
    );
  }

  async buscarPorId(id) {
    const [rows] = await db.query("SELECT * FROM Aluno WHERE id_aluno = ?", [id]);
    if (rows.length === 0) return null;
    const r = rows[0];

    return new Aluno(
      r.id_aluno,
      r.nome,
      r.matricula,
      r.email,
      r.senha,
      r.data_nascimento,
      r.peso,
      r.altura,
      r.observacoes,
      r.ativo,
      r.data_ingresso,
      r.data_saida
    );
  }

  async inserir(aluno) {
    const [result] = await db.query(
      `INSERT INTO Aluno 
      (nome, matricula, email, senha, data_nascimento, peso, altura, observacoes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        aluno.nome,
        aluno.matricula,
        aluno.email,
        aluno.senha,
        aluno.data_nascimento,
        aluno.peso,
        aluno.altura,
        aluno.observacoes,
      ]
    );
    return result.insertId;
  }

  // PATCH — atualização parcial
  async editarParcial(id, campos) {
    const colunas = Object.keys(campos)
      .map((c) => `${c} = ?`)
      .join(", ");

    const valores = Object.values(campos);

    const [result] = await db.query(
      `UPDATE Aluno SET ${colunas} WHERE id_aluno = ?`,
      [...valores, id]
    );

    return result.affectedRows;
  }

  async desativar(id) {
    const [result] = await db.query(
      `UPDATE Aluno SET ativo = 0, data_saida = NOW() WHERE id_aluno = ?`,
      [id]
    );
    return result.affectedRows;
  }

  async reativar(id) {
    const [result] = await db.query(
      `UPDATE Aluno SET ativo = 1, data_saida = NULL WHERE id_aluno = ?`,
      [id]
    );
    return result.affectedRows;
  }

  async deletar(id) {
    const [result] = await db.query("DELETE FROM Aluno WHERE id_aluno = ?", [id]);
    return result.affectedRows;
  }

  async buscarPorEmail(email) {
    const [rows] = await db.query("SELECT * FROM Aluno WHERE email = ?", [email]);
    return rows.length ? rows[0] : null;
  }

  async buscarPorMatricula(matricula) {
    const [rows] = await db.query("SELECT * FROM Aluno WHERE matricula = ?", [matricula]);
    return rows.length ? rows[0] : null;
  }
}

export default new AlunoDAO();
