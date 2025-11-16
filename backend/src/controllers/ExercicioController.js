import ExercicioDAO from "../dao/ExercicioDAO.js";

class ExercicioController {
  async criar(req, res) {
    try {
      const id = await ExercicioDAO.criar(req.body);
      res.status(201).json({ message: "Exercício criado", id_exercicio: id });
    } catch {
      res.status(500).json({ message: "Erro ao criar exercício" });
    }
  }

  async listarPorFicha(req, res) {
    try {
      const lista = await ExercicioDAO.listarPorFicha(req.params.idFicha);
      res.json(lista);
    } catch {
      res.status(500).json({ message: "Erro ao listar exercícios" });
    }
  }

  async atualizar(req, res) {
    try {
      const linhas = await ExercicioDAO.atualizarParcial(
        req.params.idExercicio,
        req.body
      );

      if (!linhas)
        return res.status(404).json({ message: "Exercício não encontrado" });

      res.json({ message: "Exercício atualizado" });
    } catch {
      res.status(500).json({ message: "Erro ao atualizar exercício" });
    }
  }

  async deletar(req, res) {
    try {
      const linhas = await ExercicioDAO.deletar(req.params.idExercicio);
      if (!linhas)
        return res.status(404).json({ message: "Exercício não encontrado" });

      res.json({ message: "Exercício deletado" });
    } catch {
      res.status(500).json({ message: "Erro ao deletar exercício" });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { idExercicio } = req.params;

      const exercicio = await ExercicioDAO.buscarPorId(idExercicio);

      if (!exercicio) {
        return res.status(404).json({ message: "Exercício não encontrado" });
      }

      res.json(exercicio);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao buscar exercício" });
    }
  }

  async buscarPorNome(req, res) {
    try {
      const { nome } = req.params;

      const exercicios = await ExercicioDAO.buscarPorNome(nome);

      if (exercicios.length === 0) {
        return res.status(404).json({ message: "Nenhum exercício encontrado" });
      }

      res.json(exercicios);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao buscar por nome" });
    }
  }
}

export default new ExercicioController();
