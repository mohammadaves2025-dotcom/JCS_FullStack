import express from "express";
import { loginUser, registerUser, logoutUser ,registerStaff} from "../controllers/authController.js";
import { protect, superAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser); // Registers a new user
router.post("/login", loginUser); // Logs a user in
router.post("/logout", logoutUser); // Logs a user out

// Notice how we stack the middleware: Must be logged in AND be a super-admin
router.post("/register-staff", protect, superAdmin, registerStaff);

export default router;