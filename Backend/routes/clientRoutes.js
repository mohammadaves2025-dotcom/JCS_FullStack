import express from "express";
import { getClients, getClientById, updateClient, createClient, getDashboardStats, getMyProfile, updateMyDocuments } from "../controllers/clientController.js";
import { protect, superAdmin, staffOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/my-profile").get(protect, getMyProfile);
router.route("/my-profile/documents").put(protect, updateMyDocuments);

router.get("/stats", protect, superAdmin, getDashboardStats);

router.route("/")
    .get(protect, getClients)
    .post(protect, superAdmin, createClient);   // 🟢 NEW: direct client add

router.route("/:id")
    .get(protect, getClientById)
    .put(protect, superAdmin, updateClient);

export default router;