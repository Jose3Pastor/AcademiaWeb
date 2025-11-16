import express from "express";
import PagamentoController from "../controllers/PagamentoController.js";

const router = express.Router();

// Lista pagamentos do aluno (tela de pagamentos do aluno)
router.get("/aluno/:idAluno", PagamentoController.listarPorAluno);

// Cria uma nova cobrança (pode ser feita pelo admin/instrutor no futuro)
router.post("/", PagamentoController.criar);

router.get("/", PagamentoController.listarTodos);

// Simula o aluno clicando em "Pagar"
router.patch("/pagar/:idPagamento", PagamentoController.pagar);

// 🆕 PATCH para editar parcialmente um pagamento
router.patch("/:idPagamento", PagamentoController.editarParcial);

// Remover pagamento
router.delete("/:idPagamento", PagamentoController.deletar);

export default router;



