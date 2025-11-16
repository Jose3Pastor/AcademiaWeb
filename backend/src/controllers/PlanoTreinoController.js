import PlanoTreinoDAO from "../dao/PlanoTreinoDAO.js";

class PlanoTreinoController {

  async criar(req, res) {
    try {
      const id = await PlanoTreinoDAO.criar(req.body);
      res.status(201).json({ message: "Plano criado", id_plano: id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao criar plano" });
    }
  }

  async listarPorAluno(req, res) {
    try {
      const planos = await PlanoTreinoDAO.listarPorAluno(req.params.idAluno);
      res.json(planos);
    } catch {
      res.status(500).json({ message: "Erro ao listar planos" });
    }
  }

  async atualizar(req, res) {
    try {
      const linhas = await PlanoTreinoDAO.atualizarParcial(
        req.params.idPlano,
        req.body
      );

      if (!linhas) return res.status(404).json({ message: "Plano não encontrado" });

      res.json({ message: "Plano atualizado" });

    } catch {
      res.status(500).json({ message: "Erro ao atualizar plano" });
    }
  }

  async desativar(req, res) {
    try {
      const linhas = await PlanoTreinoDAO.desativar(req.params.idPlano);
      if (!linhas) return res.status(404).json({ message: "Plano não encontrado" });

      res.json({ message: "Plano desativado" });

    } catch {
      res.status(500).json({ message: "Erro ao desativar plano" });
    }
  }

  async deletar(req, res) {
    try {
      const linhas = await PlanoTreinoDAO.deletar(req.params.idPlano);
      if (!linhas) return res.status(404).json({ message: "Plano não encontrado" });

      res.json({ message: "Plano deletado" });

    } catch {
      res.status(500).json({ message: "Erro ao deletar plano" });
    }
  }
}

export default new PlanoTreinoController();
