import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 1. Protect routes (Must be logged in)
export const protect = async (req, res, next) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Note: Make sure it's decoded.userId (if that's what generateToken uses)
            req.user = await User.findById(decoded.userId).select("-password");
            
            // 🚨 THE FIX: If the cookie is valid but the user was deleted from the DB, kick them out!
            if (!req.user) {
                res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) }); // Kill the zombie cookie
                return res.status(401).json({ message: "Not authorized, user no longer exists" });
            }
            
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

// 2. Super Admin Only (For financial data and staff creation)
export const superAdmin = (req, res, next) => {
    if (req.user && req.user.role === "super-admin") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized. Super Admin only." });
    }
};

// 3. Staff/Counselor Access (For calling leads)
export const staffOnly = (req, res, next) => {
    // 🚨 Updated to match your User Schema Enum ["super-admin", "counselor"]
    if (req.user && (req.user.role === "super-admin" || req.user.role === "counselor")) {
        next();
    } else {
        res.status(403).json({ message: "Not authorized. Staff only." });
    }
};