import bcrypt from "bcrypt";
import InstrutorDAO from "../dao/InstrutorDAO.js";

class InstrutorController {
  async listar(req, res) {
    const instrutores = await InstrutorDAO.listarTodos();
    res.json(instrutores);
  }

  async cadastrar(req, res) {
    const { nome, matricula, email, senha, data_nascimento } = req.body;

    const hashed = await bcrypt.hash(senha, 10);

    const id = await InstrutorDAO.inserir({
      nome,
      matricula,
      email,
      senha: hashed,
      data_nascimento,
    });

    res.status(201).json({ message: "Instrutor cadastrado", id });
  }

  async editarParcial(id, campos) {
    const colunas = Object.keys(campos)
      .map((c) => `${c} = ?`)
      .join(", ");

    const valores = Object.values(campos);

    const [result] = await db.query(
      `UPDATE Instrutor SET ${colunas} WHERE id_instrutor = ?`,
      [...valores, id]
    );

    return result.affectedRows;
  }

  async desativar(req, res) {
    const { id } = req.params;
    const linhas = await InstrutorDAO.desativar(id);

    if (linhas === 0)
      return res.status(404).json({ message: "Instrutor não encontrado" });

    res.json({ message: "Instrutor desativado com sucesso" });
  }

  async reativar(req, res) {
    const { id } = req.params;
    const linhas = await InstrutorDAO.reativar(id);

    if (linhas === 0)
      return res.status(404).json({ message: "Instrutor não encontrado" });

    res.json({ message: "Instrutor reativado com sucesso" });
  }

  async deletar(req, res) {
    const { id } = req.params;
    const linhas = await InstrutorDAO.deletar(id);

    if (linhas === 0)
      return res.status(404).json({ message: "Instrutor não encontrado" });

    res.json({ message: "Instrutor deletado com sucesso" });
  }

  async login(req, res) {
    const { email, senha } = req.body;

    const instrutor = await AlunoDAO.buscarPorEmail(email);
    if (!instrutor)
      return res.status(404).json({ message: "instrutor não encontrado" });

    const ok = await bcrypt.compare(senha, aluno.senha);
    if (!ok)
      return res.status(401).json({ message: "Senha incorreta" });

    if (instrutor.ativo === 0)
      return res.status(403).json({
        message: "instrutor desativado ."
      });

    return res.json({
      message: "Login bem-sucedido",
      instrutor: {
        id: instrutor.id_instrutor,
        nome: instrutor.nome,
        email: instrutor.email
      }
    });
  }
}

export default new InstrutorController();
