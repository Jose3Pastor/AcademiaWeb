import db from "../config/db.js";

class DashboardAlunoController {
  async resumo(req, res) {
    try {
      const idAluno = req.params.idAluno;

      const [[pagamento]] = await db.query(
        `SELECT status, data_validade
         FROM Pagamento 
         WHERE fk_id_aluno = ?
         ORDER BY data_pagamento DESC 
         LIMIT 1`,
        [idAluno]
      );

      const [[planosAtivos]] = await db.query(
        "SELECT COUNT(*) AS total FROM PlanoTreino WHERE fk_id_aluno = ? AND ativo = 1",
        [idAluno]
      );

      const [[fichasAtivas]] = await db.query(
        `SELECT COUNT(*) AS total
         FROM FichaTreino f
         JOIN PlanoTreino p ON p.id_plano = f.fk_id_plano
         WHERE p.fk_id_aluno = ? AND f.ativo = 1`,
        [idAluno]
      );

      return res.json({
        pagamento_status: pagamento?.status || "nenhum",
        pagamento_validade: pagamento?.data_validade || null,
        planos_ativos: planosAtivos.total,
        fichas_ativas: fichasAtivas.total
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao gerar dashboard do aluno" });
    }
  }
}

export default new DashboardAlunoController();
