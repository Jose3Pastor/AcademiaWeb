import express from "express";
import ExercicioController from "../controllers/ExercicioController.js";

const router = express.Router();

router.post("/", ExercicioController.criar);
router.get("/:idFicha", ExercicioController.listarPorFicha);
router.get("/buscar/:idExercicio", ExercicioController.buscarPorId);
router.get("/nome/:nome", ExercicioController.buscarPorNome); // 🆕
router.patch("/:idExercicio", ExercicioController.atualizar);
router.delete("/:idExercicio", ExercicioController.deletar);

export default router;
