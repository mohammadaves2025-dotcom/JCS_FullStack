import express from "express";
import { getClients, getClientById ,updateClient ,getDashboardStats, getMyProfile, updateMyDocuments } from "../controllers/clientController.js";
import { protect, superAdmin, staffOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route("/my-profile").get(protect, getMyProfile);
router.route("/my-profile/documents").put(protect, updateMyDocuments);


// Only Super Admin should see the revenue/analytics dashboard
router.get("/stats", protect, superAdmin, getDashboardStats);


// Staff can see the client list, but only Super Admin should update financial deals
router.route("/")
    .get(protect, getClients);


router.route("/:id")
    .get(protect, protect, getClientById) // Both staff and the student themselves can see this
    .put(protect, superAdmin, updateClient);


export default router;