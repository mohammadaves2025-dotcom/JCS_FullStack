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


dotenv.config();
connectDB();

const app = express();

// ☢️ THE NUCLEAR CORS FIX: Must be the VERY FIRST thing in the app!
app.use((req, res, next) => {
    // 1. Hardcode your exact frontend URL
    res.setHeader("Access-Control-Allow-Origin", "https://jcs-full-stack-qaui.vercel.app");
    
    // 2. Allow all required methods
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    
    // 3. Allow headers and cookies
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // 4. Instantly return 200 OK for Preflight requests (Kills the "not HTTP ok status" error)
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});

// // Middleware
// app.use(cors({
//     origin: process.env.FRONTEND_URL, // e.g., 'https://jcs-full-stack-qaui.vercel.app'
//     credentials: true, 
// }));

// app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // <-- ADD THIS to read the secure cookies

// Routes
app.use("/api/users", userRoutes); 
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/exports", exportRoutes);
app.use("/api/broadcast", broadcastRoutes);

app.get("/", (req, res) => {
  res.send("JCS CRM API is running on Vercel!");
});

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
// });

export default app;