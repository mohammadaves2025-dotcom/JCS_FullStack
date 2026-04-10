import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // ✅ Normalize email on login to match normalized email stored at registration
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token, // Included for Authorization: Bearer fallback on cross-domain Vercel
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

// @desc    Register a new user (Admin or Student)
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // ✅ Normalize email on save so login always finds it
        const normalizedEmail = email.toLowerCase().trim();

        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ Pass plain password — User model's pre('save') hook hashes it automatically
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password,
            role: role || "student",
        });

        const token = generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(0),
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error during logout" });
    }
};

// @desc    Register a staff member (counselor etc.)
// @route   POST /api/users/register-staff
// @access  Super Admin only
export const registerStaff = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ Pass plain password — pre('save') hook hashes it automatically
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password,
            role: role || "counselor",
        });

        res.status(201).json({
            message: "Staff member created successfully",
            user: { name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error("Register staff error:", error);
        res.status(500).json({ message: "Server error while creating staff" });
    }
};
