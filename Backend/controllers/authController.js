import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// @desc    Auth user & get token (Login)
// @route   POST /api/users/auth
// @access  Public
// 🟢 Update your loginUser function inside authController.js
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);

    if (isMatch) {
        // 1. Set the secure cookie
        generateToken(res, user._id); 

        // 2. Send the JSON response WITHOUT the token key 
        // (The browser handles the cookie automatically)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, 
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};
// @desc    Register a new user (Admin or Student)
// @route   POST /api/users
// @access  Public (or restrict to Admin later)

export const registerUser = async (req, res) => {

    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || "student", // Defaults to student if not specified
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
};

export const registerStaff = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || "counselor",
    });

    if (user) {
        res.status(201).json({ message: "Staff member created successfully", user: { name: user.name, role: user.role } });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};