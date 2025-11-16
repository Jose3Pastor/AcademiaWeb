import db from "./db.js";

(async () => {
  try {
    const [rows] = await db.query("SELECT NOW() AS data_atual");
    console.log("✅ Conexão bem-sucedida com o MySQL!");
    console.log("📅 Data/hora do servidor MySQL:", rows[0].data_atual);
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao conectar com o MySQL:", err.message);
    process.exit(1);
  }
})();
