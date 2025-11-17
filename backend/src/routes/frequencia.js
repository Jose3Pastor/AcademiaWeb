import express from "express";
import FrequenciaController from "../controllers/FrequenciaController.js";

const router = express.Router();

// Registrar presença (manual)
router.post("/registrar/:idAluno", FrequenciaController.registrarPresencaHoje);

// Listar histórico completo do aluno
router.get("/aluno/:idAluno", FrequenciaController.listarPorAluno);

// 📌 Frequência HOJE
router.get("/hoje/:idAluno", FrequenciaController.listarHoje);

// 📌 Frequência de UM MÊS específico
router.get("/mes/:idAluno/:ano/:mes", FrequenciaController.listarPorMes);

export default router;
