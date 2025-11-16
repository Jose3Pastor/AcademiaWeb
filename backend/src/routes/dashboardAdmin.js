import express from "express";
import DashboardAdminController from "../controllers/DashboardAdminController.js";

const router = express.Router();

// Dashboard geral do administrador
router.get("/", DashboardAdminController.resumo);

export default router;
