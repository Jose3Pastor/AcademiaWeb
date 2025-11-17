import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Rotas
import alunoRoutes from "./routes/aluno.js";
import instrutorRoutes from "./routes/instrutor.js";
import planoRoutes from "./routes/plano.js";
import fichaRoutes from "./routes/ficha.js";
import exercicioRoutes from "./routes/exercicio.js";
import pagamentoRoutes from "./routes/pagamento.js";
import verificarPagamentosAtrasados from "./jobs/verificarPagamentos.js";
import adminRoutes from "./routes/administrador.js";
import dashboardAdminRoutes from "./routes/dashboardAdmin.js";
import dashboardInstrutorRoutes from "./routes/dashboardInstrutor.js";
import dashboardAlunoRoutes from "./routes/dashboardAluno.js";
import frequenciaRoutes from "./routes/frequencia.js";
import verificarFrequenciaDiaria from "./jobs/verificarFrequenciaDiaria.js";



// Configuração do banco de dados 

import db from "./config/db.js";

dotenv.config();
const app = express();


// Middlewares
app.use(cors());
app.use(express.json());


// Teste inicial de conexão
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ Conectado ao MySQL com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err.message);
  }
})();

// depois de configurar o app e db:
verificarPagamentosAtrasados();
verificarFrequenciaDiaria();


// Rotas principais
app.use("/alunos", alunoRoutes);
app.use("/instrutores", instrutorRoutes);
app.use("/planos", planoRoutes);
app.use("/fichas", fichaRoutes);
app.use("/exercicios", exercicioRoutes);
app.use("/pagamentos", pagamentoRoutes);
app.use("/administradores", adminRoutes);
app.use("/dashboard/admin", dashboardAdminRoutes);
app.use("/dashboard/instrutor", dashboardInstrutorRoutes);
app.use("/dashboard/aluno", dashboardAlunoRoutes);
app.use("/frequencia", frequenciaRoutes);

// Rota básica
app.get("/", (req, res) => res.send("🔥 API da Academia rodando"));


// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
