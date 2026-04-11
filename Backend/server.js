import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import broadcastRoutes from "./routes/broadcastRoutes.js";
import archiveRoutes from "./routes/archiveRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS: Read allowed origin from env — never hardcode a URL
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173", // Vite dev server
    "http://localhost:3000",
].filter(Boolean); // Remove undefined if FRONTEND_URL not set

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (!origin || allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin || "*");
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Instantly respond to preflight requests
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/exports", exportRoutes);
app.use("/api/broadcast", broadcastRoutes);
app.use("/api/archives", archiveRoutes);

app.get("/", (req, res) => {
    res.send("JCS CRM API is running!");
});

// ✅ Global error handler — catches any unhandled errors so the server never crashes silently
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
});

export default app;
