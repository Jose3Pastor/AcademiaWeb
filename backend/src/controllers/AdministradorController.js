import bcrypt from "bcrypt";
import AdministradorDAO from "../dao/AdministradorDAO.js";

class AdministradorController {

  async listar(req, res) {
    const admins = await AdministradorDAO.listarTodos();
    res.json(admins);
  }

  async cadastrar(req, res) {
    const { nome, matricula, email, senha } = req.body;

    const hashed = await bcrypt.hash(senha, 10);

    const id = await AdministradorDAO.inserir({
      nome,
      matricula,
      email,
      senha: hashed
    });

    res.status(201).json({ message: "Administrador criado com sucesso", id });
  }

  async editar(req, res) {
    const { id } = req.params;

    const linhas = await AdministradorDAO.atualizarParcial(id, req.body);
    if (!linhas) return res.status(404).json({ message: "Administrador não encontrado" });

    res.json({ message: "Administrador atualizado" });
  }

  async deletar(req, res) {
    const { id } = req.params;

    const linhas = await AdministradorDAO.deletar(id);
    if (!linhas) return res.status(404).json({ message: "Administrador não encontrado" });

    res.json({ message: "Administrador removido" });
  }

  async login(req, res) {
    const { email, senha } = req.body;

    const admin = await AdministradorDAO.buscarPorEmail(email);
    if (!admin) return res.status(404).json({ message: "Administrador não encontrado" });

    const ok = await bcrypt.compare(senha, admin.senha);
    if (!ok) return res.status(401).json({ message: "Senha incorreta" });

    res.json({
      message: "Login bem-sucedido",
      admin: {
        id: admin.id_administrador,
        nome: admin.nome,
        email: admin.email
      }
    });
  }
}

export default new AdministradorController();
