import express from "express";
import { createCollege, getColleges, getCollegeById, updateCollege, adjustSeatInventory } from "../controllers/collegeController.js";
import { protect, superAdmin, staffOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// General College Routes
router.route("/")
  .post(protect, superAdmin, createCollege)
  .get(protect, staffOnly, getColleges);

// Specific College Routes
router.route("/:id")
  .get(protect, staffOnly, getCollegeById)
  .put(protect, superAdmin, updateCollege);

// The highly specific Inventory Adjustment Route (Using PATCH because it's a partial update)
router.route("/:id/inventory")
  .patch(protect, superAdmin, adjustSeatInventory);

export default router;