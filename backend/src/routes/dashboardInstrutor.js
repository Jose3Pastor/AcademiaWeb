import express from "express";
import DashboardInstrutorController from "../controllers/DashboardInstrutorController.js";

const router = express.Router();

// Dashboard geral do instrutor
router.get("/", DashboardInstrutorController.resumo);

export default router;