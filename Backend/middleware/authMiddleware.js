import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 1. Protect routes (Must be logged in)
export const protect = async (req, res, next) => {
    let token;

    // Try cookie first (works for same-domain)
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    // Fallback: Bearer token in Authorization header (needed for cross-domain Vercel deployments)
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");

            if (!req.user) {
                res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
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
    if (req.user && (req.user.role === "super-admin" || req.user.role === "counselor")) {
        next();
    } else {
        res.status(403).json({ message: "Not authorized. Staff only." });
    }
};
