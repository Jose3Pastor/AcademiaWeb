import express from "express";
import AdministradorController from "../controllers/AdministradorController.js";


const router = express.Router();

router.get("/", AdministradorController.listar);
router.post("/", AdministradorController.cadastrar);
router.post("/login", AdministradorController.login);
router.patch("/:id", AdministradorController.editar);
router.delete("/:id", AdministradorController.deletar);

export default router;
