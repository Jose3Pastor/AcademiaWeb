// src/controllers/AlunoController.js
import bcrypt from "bcrypt";
import AlunoDAO from "../dao/AlunoDAO.js";
import PagamentoDAO from "../dao/PagamentoDAO.js";
import { calcularValidade } from "../utils/calcularValidade.js";

class AlunoController {
  async listar(req, res) {
    const alunos = await AlunoDAO.listarTodos();
    res.json(alunos);
  }

  async cadastrar(req, res) {
    try {
      const {
        nome,
        matricula,
        email,
        senha,
        data_nascimento,
        peso,
        altura,
        observacoes,
        // opcional, vindo do front:
        tipo_plano, //= "mensal",
        valor_plano, //= 89.9,
        metodo_pagamento //= "pix",
      } = req.body;

      const hashed = await bcrypt.hash(senha, 10);

      const idAluno = await AlunoDAO.inserir({
        nome,
        matricula,
        email,
        senha: hashed,
        data_nascimento,
        peso,
        altura,
        observacoes,
      });

      // 👉 assim que cria o aluno, já cria um pagamento PAGO
      const data_validade = calcularValidade(tipo_plano);

      await PagamentoDAO.criar({
        fk_id_aluno: idAluno,
        valor: valor_plano,
        data_validade,
        metodo_pagamento,
        status: "pago",        // 🔥 aqui está o que você quer
        tipo_plano,
      });

      res
        .status(201)
        .json({ message: "Aluno cadastrado com sucesso", id: idAluno });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao cadastrar aluno" });
    }
  }

  async editarParcial(req, res) {
    const { id } = req.params;

    const linhas = await AlunoDAO.editarParcial(id, req.body);
    if (linhas === 0)
      return res.status(404).json({ message: "Aluno não encontrado" });

    res.json({ message: "Aluno atualizado com sucesso" });
  }

  async desativar(req, res) {
    const { id } = req.params;
    const linhas = await AlunoDAO.desativar(id);

    if (linhas === 0)
      return res.status(404).json({ message: "Aluno não encontrado" });

    res.json({ message: "Aluno desativado com sucesso" });
  }

  async reativar(req, res) {
    const { id } = req.params;
    const linhas = await AlunoDAO.reativar(id);

    if (linhas === 0)
      return res.status(404).json({ message: "Aluno não encontrado" });

    res.json({ message: "Aluno reativado com sucesso" });
  }

  async deletar(req, res) {
    const { id } = req.params;
    const linhas = await AlunoDAO.deletar(id);

    if (linhas === 0)
      return res.status(404).json({ message: "Aluno não encontrado" });

    res.json({ message: "Aluno deletado com sucesso" });
  }

  async login(req, res) {
    const { email, senha } = req.body;

    const aluno = await AlunoDAO.buscarPorEmail(email);
    if (!aluno)
      return res.status(404).json({ message: "Aluno não encontrado" });

    const ok = await bcrypt.compare(senha, aluno.senha);
    if (!ok)
      return res.status(401).json({ message: "Senha incorreta" });

    if (aluno.ativo === 0)
      return res.status(403).json({
        message: "Aluno desativado — regularize seu pagamento.",
      });

    return res.json({
      message: "Login bem-sucedido",
      aluno: {
        id: aluno.id_aluno,
        nome: aluno.nome,
        email: aluno.email,
      },
    });
  }
}

export default new AlunoController();
