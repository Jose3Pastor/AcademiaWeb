import express from "express";
import FichaTreinoController from "../controllers/FichaTreinoController.js";

const router = express.Router();

router.post("/", FichaTreinoController.criar);
router.get("/:idPlano", FichaTreinoController.listarPorPlano);
router.patch("/:idFicha", FichaTreinoController.atualizar);
router.patch("/desativar/:idFicha", FichaTreinoController.desativar);
router.delete("/:idFicha", FichaTreinoController.deletar);

export default router;
