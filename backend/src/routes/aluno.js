import express from "express";
import AlunoController from "../controllers/AlunoController.js";

const router = express.Router();

router.get("/", AlunoController.listar); //ok
router.post("/", AlunoController.cadastrar); //ok

// login
router.post("/login", AlunoController.login);


// PATCH parcial
router.patch("/:id", AlunoController.editarParcial); //ok

// ativar / desativar
router.patch("/desativar/:id", AlunoController.desativar); //ok
router.patch("/reativar/:id", AlunoController.reativar); //pk

// deletar
router.delete("/:id", AlunoController.deletar); //ok

export default router;
