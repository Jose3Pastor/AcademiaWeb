// src/jobs/verificarFrequenciaDiaria.js
import cron from "node-cron";
import FrequenciaDAO from "../dao/FrequenciaDAO.js";

function verificarFrequenciaDiaria() {
    //"* * * * *". / */10 * * * * * / 0 0 * * *
  // roda todo dia à meia-noite
  cron.schedule("0 0 * * *", async () => {
    console.log("⏳ Rodando geração de ausências de frequência (dia anterior)...");

    try {
      const qtd = await FrequenciaDAO.gerarAusenciasDiaAnterior();
      console.log(`✅ Frequência: ausências geradas para ${qtd} alunos.`);
    } catch (err) {
      console.error("❌ Erro ao gerar ausências de frequência:", err);
    }
  });
}

export default verificarFrequenciaDiaria;
