import cron from "node-cron";
import PagamentoDAO from "../dao/PagamentoDAO.js";
import AlunoDAO from "../dao/AlunoDAO.js";

function verificarPagamentosAtrasados() {
  //"* * * * *". */10 * * * * *
  // roda todo dia à meia-noite
  cron.schedule("0 0 * * *", async () => {
    console.log("⏳ Rodando verificação diária de pagamentos...");

    try {
      const hoje = new Date();
      const pagamentos = await PagamentoDAO.listarTodos();

      for (const pag of pagamentos) {
        if (!pag.data_validade) continue;

        const validade = new Date(pag.data_validade);

        if (validade < hoje && pag.status !== "atrasado") {
          console.log(
            `🚨 Pagamento ${pag.id_pagamento} atrasado. Desativando aluno ${pag.fk_id_aluno}...`
          );

          // marca como atrasado
          await PagamentoDAO.atualizarStatus(pag.id_pagamento, "atrasado");

          // desativa aluno
          await AlunoDAO.desativar(pag.fk_id_aluno);
        }
      }

      console.log("✅ Verificação diária concluída.");
    } catch (err) {
      console.error("❌ Erro ao rodar verificação diária:", err);
    }
  });
}

export default verificarPagamentosAtrasados;
