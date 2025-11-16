import db from "../config/db.js";

class DashboardInstrutorController {
  async resumo(req, res) {
    try {
      const idInstrutor = req.params.idInstrutor;

      const [[alunos]] = await db.query(
        `SELECT COUNT(*) AS total
         FROM PlanoTreino
         WHERE fk_id_instrutor = ?`,
        [idInstrutor]
      );

      const [[planosAtivos]] = await db.query(
        `SELECT COUNT(*) AS total
         FROM PlanoTreino
         WHERE fk_id_instrutor = ? AND ativo = 1`,
        [idInstrutor]
      );

      const [[fichasAtivas]] = await db.query(
        `SELECT COUNT(*) AS total
         FROM FichaTreino f
         JOIN PlanoTreino p ON p.id_plano = f.fk_id_plano
         WHERE p.fk_id_instrutor = ? AND f.ativo = 1`,
        [idInstrutor]
      );

      return res.json({
        total_alunos: alunos.total,
        planos_ativos: planosAtivos.total,
        fichas_ativas: fichasAtivas.total
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao gerar dashboard do instrutor" });
    }
  }
}

export default new DashboardInstrutorController();
