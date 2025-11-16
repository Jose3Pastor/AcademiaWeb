import PagamentoDAO from "../dao/PagamentoDAO.js";
import AlunoDAO from "../dao/AlunoDAO.js";
import { calcularValidade } from "../utils/calcularValidade.js";

class PagamentoController {

  async listarTodos(req, res) {
  try {
    const pagamentos = await PagamentoDAO.listarTodos();
    res.json(pagamentos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar pagamentos" });
  }
}
  // GET /pagamentos/aluno/:idAluno
  async listarPorAluno(req, res) {
    try {
      const { idAluno } = req.params;
      const pagamentos = await PagamentoDAO.listarPorAluno(idAluno);
      res.json(pagamentos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao listar pagamentos" });
    }
  }

  // POST /pagamentos
  // body: { fk_id_aluno, valor, tipo_plano, metodo_pagamento }
  async criar(req, res) {
    try {
      const { fk_id_aluno, valor, tipo_plano, metodo_pagamento } = req.body;

      if (!fk_id_aluno || !valor || !tipo_plano) {
        return res
          .status(400)
          .json({
            message: "fk_id_aluno, valor e tipo_plano são obrigatórios",
          });
      }

      const data_validade = calcularValidade(tipo_plano);

      const id = await PagamentoDAO.criar({
        fk_id_aluno,
        valor,
        data_validade,
        metodo_pagamento: metodo_pagamento || "pix",
        status: "pendente",
        tipo_plano,
      });

      res
        .status(201)
        .json({ message: "Cobrança criada com sucesso", id_pagamento: id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao criar pagamento" });
    }
  }

  async editarParcial(req, res) {
  try {
    const { idPagamento } = req.params;
    const campos = req.body;

    const linhas = await PagamentoDAO.editarParcial(idPagamento, campos);

    if (linhas === 0)
      return res.status(404).json({ message: "Pagamento não encontrado" });

    res.json({ message: "Pagamento atualizado com sucesso" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar pagamento" });
  }
}


  // PATCH /pagamentos/pagar/:idPagamento
  async pagar(req, res) {
    try {
      const { idPagamento } = req.params;

      const pagamento = await PagamentoDAO.buscarPorId(idPagamento);
      if (!pagamento) {
        return res.status(404).json({ message: "Pagamento não encontrado" });
      }

      if (pagamento.status === "pago") {
        return res
          .status(400)
          .json({ message: "Esse pagamento já está marcado como pago" });
      }

      const novaValidade = calcularValidade(pagamento.tipo_plano);

      await PagamentoDAO.atualizarStatus(idPagamento, "pago", novaValidade);

      // reativar aluno
      await AlunoDAO.reativar(pagamento.fk_id_aluno);

      res.json({
        message: "Pagamento efetuado com sucesso",
        data_validade: novaValidade,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao processar pagamento" });
    }
  }

  // DELETE /pagamentos/:idPagamento
  async deletar(req, res) {
    try {
      const { idPagamento } = req.params;

      const linhas = await PagamentoDAO.deletar(idPagamento);
      if (!linhas) {
        return res.status(404).json({ message: "Pagamento não encontrado" });
      }

      res.json({ message: "Pagamento deletado com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao deletar pagamento" });
    }
  }
}

export default new PagamentoController();
