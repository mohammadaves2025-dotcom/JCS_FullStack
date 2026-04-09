import express from "express";
import {
    createInquiry,
    getInquiries,
    getTodayFollowUps,
    updateInquiry,
    convertInquiryToClient,
    deleteInquiry // 🚨 1. Import the new controller
} from "../controllers/inquiryController.js";
import { protect, staffOnly, superAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createInquiry);
router.route("/").get(protect, staffOnly, getInquiries);
router.route("/follow-ups").get(protect, staffOnly, getTodayFollowUps);

// 🚨 2. Add the DELETE method here, protected by superAdmin middleware
router.route("/:id")
    .put(protect, staffOnly, updateInquiry)
    .delete(protect, superAdmin, deleteInquiry);

router.route("/:id/convert").post(protect, superAdmin, convertInquiryToClient);

export default router;