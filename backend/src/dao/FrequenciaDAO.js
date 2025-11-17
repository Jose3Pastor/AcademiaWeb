import db from "../config/db.js";
import Frequencia from "../models/FrequenciaModel.js";

class FrequenciaDAO {


    async registrarPresencaHoje(idAluno) {
    // Verifica se já existe presença hoje
    const [rows] = await db.query(
      `SELECT id_frequencia 
       FROM Frequencia 
       WHERE fk_id_aluno = ? AND DATE(data) = CURDATE()`,
      [idAluno]
    );

    if (rows.length > 0) {
      // Se já existia (por exemplo, criada como ausência),
      // só atualiza para presença = TRUE
      const id = rows[0].id_frequencia;
      await db.query(
        `UPDATE Frequencia 
         SET presenca = TRUE, data = NOW()
         WHERE id_frequencia = ?`,
        [id]
      );
      return id;
    }

    // Se não existe ainda, insere como presença TRUE
    const [result] = await db.query(
      `INSERT INTO Frequencia (fk_id_aluno, data, presenca)
       VALUES (?, NOW(), TRUE)`,
      [idAluno]
    );

    return result.insertId;
  }

   // ✅ gera ausência para o dia anterior para todos os alunos ativos
  async gerarAusenciasDiaAnterior() {
    const [result] = await db.query(
      `
      INSERT INTO Frequencia (fk_id_aluno, data, presenca)
      SELECT 
        a.id_aluno,
        CONCAT(DATE_SUB(CURDATE(), INTERVAL 1 DAY), ' 00:00:00') AS data_registro,
        FALSE AS presenca
      FROM Aluno a
      WHERE a.ativo = 1
      AND NOT EXISTS (
        SELECT 1 
        FROM Frequencia f
        WHERE f.fk_id_aluno = a.id_aluno
          AND DATE(f.data) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      )
      `
    );

    return result.affectedRows;
  }



  async listarPorAluno(idAluno) {
    const [rows] = await db.query(
      `SELECT 
          f.*,
          a.nome AS nome_aluno
       FROM Frequencia f
       JOIN Aluno a ON a.id_aluno = f.fk_id_aluno
       WHERE f.fk_id_aluno = ?
       ORDER BY f.data DESC`,
      [idAluno]
    );

    return rows;
  }

  // 📌 Buscar registro de HOJE
async listarHoje(idAluno) {
  const [rows] = await db.query(
    `SELECT 
        f.*,
        a.nome AS nome_aluno
     FROM Frequencia f
     JOIN Aluno a ON a.id_aluno = f.fk_id_aluno
     WHERE f.fk_id_aluno = ? 
       AND DATE(f.data) = CURDATE()
     LIMIT 1`,
    [idAluno]
  );

  return rows.length > 0 ? rows[0] : null;
}



// 📌 Buscar registros de um MÊS específico
async listarPorMes(idAluno, ano, mes) {
  const [rows] = await db.query(
    `SELECT 
        f.*,
        a.nome AS nome_aluno
     FROM Frequencia f
     JOIN Aluno a ON a.id_aluno = f.fk_id_aluno
     WHERE f.fk_id_aluno = ?
       AND YEAR(f.data) = ?
       AND MONTH(f.data) = ?
     ORDER BY f.data`,
    [idAluno, ano, mes]
  );

  return rows;
}





}

export default new FrequenciaDAO();
