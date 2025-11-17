import FrequenciaDAO from "../dao/FrequenciaDAO.js";

class FrequenciaController {

  async registrarPresencaHoje(req, res) {
    try {
      const { idAluno } = req.params;

      const id = await FrequenciaDAO.registrarPresencaHoje(idAluno);
      res.status(201).json({ 
        message: "Presença registrada para hoje",
        id_frequencia: id 
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao registrar presença" });
    }
  }

    async listarPorAluno(req, res) {
    try {
      const { idAluno } = req.params;

      const lista = await FrequenciaDAO.listarPorAluno(idAluno);
      res.json(lista);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao listar frequência" });
    }
  }


  // 📌 Frequência HOJE
  async listarHoje(req, res) {
    try {
      const { idAluno } = req.params;
      const result = await FrequenciaDAO.listarHoje(idAluno);

      if (!result)
        return res.json({ presenteHoje: false, registro: null });

      res.json({ presenteHoje: result.presenca === 1, registro: result });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao buscar frequência de hoje" });
    }
  }


  // 📌 Frequência por MÊS
  async listarPorMes(req, res) {
    try {
      const { idAluno, ano, mes } = req.params;

      const lista = await FrequenciaDAO.listarPorMes(idAluno, ano, mes);

      res.json(lista);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao listar frequência do mês" });
    }
  }

}

export default new FrequenciaController();
