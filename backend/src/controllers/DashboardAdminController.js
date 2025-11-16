import db from "../config/db.js";

class DashboardAdminController {
  async resumo(req, res) {
    try {
      const [[alunosAtivos]] = await db.query(
        "SELECT COUNT(*) AS total FROM Aluno WHERE ativo = 1"
      );

      const [[instrutoresAtivos]] = await db.query(
        "SELECT COUNT(*) AS total FROM Instrutor WHERE ativo = 1"
      );

      const [[planosAtivos]] = await db.query(
        "SELECT COUNT(*) AS total FROM PlanoTreino WHERE ativo = 1"
      );

      return res.json({
        alunos_ativos: alunosAtivos.total,
        instrutores_ativos: instrutoresAtivos.total,
        planos_ativos: planosAtivos.total
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao gerar dashboard do administrador" });
    }
  }
}

export default new DashboardAdminController();
