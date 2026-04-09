import express from "express";
import {
    getBroadcastTargets,
    sendBulkEmail,
    sendBulkWhatsApp,
} from "../controllers/broadcastController.js";
import { protect, superAdmin, staffOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Staff can view who is on the broadcast list
router.get("/targets", protect, staffOnly, getBroadcastTargets);

// ONLY the Super Admin can actually fire the broadcast
router.post("/email", protect, superAdmin, sendBulkEmail);
router.post("/whatsapp", protect, superAdmin, sendBulkWhatsApp);

export default router;