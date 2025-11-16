import db from "../config/db.js";
import FichaTreino from "../models/FichaTreinoModel.js";

class FichaTreinoDAO {
  
  async listarPorPlano(idPlano) {
    const [rows] = await db.query(
      "SELECT * FROM FichaTreino WHERE fk_id_plano = ?",
      [idPlano]
    );

    return rows.map(
      r =>
        new FichaTreino(
          r.id_ficha, r.fk_id_plano, r.nome, r.data_inicio,
          r.data_fim, r.observacoes, r.ativo
        )
    );
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
