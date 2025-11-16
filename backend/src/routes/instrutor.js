import express from "express";
import InstrutorController from "../controllers/InstrutorController.js";

const router = express.Router();
  
// ta tudo funcioando ok

router.get("/", InstrutorController.listar);
router.post("/", InstrutorController.cadastrar);

// login
router.post("/login", InstrutorController.login);

// PATCH parcial
router.patch("/:id", InstrutorController.editarParcial);

// ativar / desativar
router.patch("/desativar/:id", InstrutorController.desativar);
router.patch("/reativar/:id", InstrutorController.reativar);

// remover
router.delete("/:id", InstrutorController.deletar);

export default router;
