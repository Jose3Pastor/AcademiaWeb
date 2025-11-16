import express from "express";
import PlanoTreinoController from "../controllers/PlanoTreinoController.js";

const router = express.Router();

router.post("/", PlanoTreinoController.criar);
router.get("/aluno/:idAluno", PlanoTreinoController.listarPorAluno);
router.patch("/:idPlano", PlanoTreinoController.atualizar);
router.patch("/desativar/:idPlano", PlanoTreinoController.desativar);
router.delete("/:idPlano", PlanoTreinoController.deletar);

export default router;
