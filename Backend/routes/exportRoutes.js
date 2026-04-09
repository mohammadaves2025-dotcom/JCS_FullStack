import express from "express";
import { exportClientsToExcel, exportClientsToPDF } from "../controllers/exportController.js";
import { protect, superAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Both routes are protected and strictly for the Super Admin
router.get("/excel", protect, superAdmin, exportClientsToExcel);
router.get("/pdf", protect, superAdmin, exportClientsToPDF);

export default router;