import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import {
  addTransaction,
  deleteTransaction,
  getTransaction,
  getTransactionSummary,
  updateTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/add", auth, addTransaction);
router.get("/", auth, getTransaction);
router.put('/:id',auth,updateTransaction);
router.get('/summary',auth,getTransactionSummary)
router.delete('/:id',auth,deleteTransaction)

export default router;
