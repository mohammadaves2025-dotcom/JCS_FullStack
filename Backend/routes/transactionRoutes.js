import express from "express";
import { getTransactions, createTransaction, deleteTransaction } from "../controllers/transactionController.js";
import { protect, superAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, superAdmin, getTransactions);
router.post("/", protect, superAdmin, createTransaction);
router.delete("/:id", protect, superAdmin, deleteTransaction);

export default router;
