import FichaTreinoDAO from "../dao/FichaTreinoDAO.js";

class FichaTreinoController {

  async criar(req, res) {
    try {
      const id = await FichaTreinoDAO.criar(req.body);
      res.status(201).json({ message: "Ficha criada", id_ficha: id });
    } catch {
      res.status(500).json({ message: "Erro ao criar ficha" });
    }
  }

  async listarPorPlano(req, res) {
    try {
      const fichas = await FichaTreinoDAO.listarPorPlano(req.params.idPlano);
      res.json(fichas);
    } catch {
      res.status(500).json({ message: "Erro ao listar fichas" });
    }
  }

  async atualizar(req, res) {
    try {
      const linhas = await FichaTreinoDAO.atualizarParcial(
        req.params.idFicha,
        req.body
      );

      if (!linhas) return res.status(404).json({ message: "Ficha não encontrada" });

      res.json({ message: "Ficha atualizada" });

    } catch {
      res.status(500).json({ message: "Erro ao atualizar ficha" });
    }
  }

  async desativar(req, res) {
    try {
      const linhas = await FichaTreinoDAO.desativar(req.params.idFicha);
      if (!linhas) return res.status(404).json({ message: "Ficha não encontrada" });

      res.json({ message: "Ficha desativada" });

    } catch {
      res.status(500).json({ message: "Erro ao desativar ficha" });
    }
  }

  async deletar(req, res) {
    try {
      const linhas = await FichaTreinoDAO.deletar(req.params.idFicha);
      if (!linhas) return res.status(404).json({ message: "Ficha não encontrada" });

      res.json({ message: "Ficha deletada" });

    } catch {
      res.status(500).json({ message: "Erro ao deletar ficha" });
    }
  }
}

export default new FichaTreinoController();
