import express from "express";
import { getArchives, addArchiveRecord } from "../controllers/archiveController.js";
import { protect, superAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(protect, superAdmin, getArchives)
    .post(protect, superAdmin, addArchiveRecord);

export default router;