import db from "../config/db.js";
import Administrador from "../models/AdministradorModel.js";

class AdministradorDAO {

  async listarTodos() {
    const [rows] = await db.query("SELECT * FROM Administrador");
    return rows.map(r =>
      new Administrador(r.id_administrador, r.nome, r.matricula, r.email, r.senha)
    );
  }

  async buscarPorEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM Administrador WHERE email = ?",
      [email]
    );

    if (rows.length === 0) return null;

    const r = rows[0];
    return new Administrador(r.id_administrador, r.nome, r.matricula, r.email, r.senha);
  }

  async inserir(admin) {
    const [result] = await db.query(
      `INSERT INTO Administrador (nome, matricula, email, senha)
       VALUES (?, ?, ?, ?)`,
      [admin.nome, admin.matricula, admin.email, admin.senha]
    );

    return result.insertId;
  }

  async atualizarParcial(id, campos) {
    const keys = Object.keys(campos);
    const values = Object.values(campos);

    const sql = `
      UPDATE Administrador SET 
      ${keys.map(k => `${k}=?`).join(", ")}
      WHERE id_administrador = ?
    `;

    const [result] = await db.query(sql, [...values, id]);

    return result.affectedRows;
  }

  async deletar(id) {
    const [result] = await db.query(
      "DELETE FROM Administrador WHERE id_administrador = ?",
      [id]
    );

    return result.affectedRows;
  }
}

export default new AdministradorDAO();
