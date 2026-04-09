import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { protect, staffOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure Multer to store the file temporarily in RAM
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per document
});

// @desc    Upload a document to Cloudinary
// @route   POST /api/upload
// @access  Private (Staff/Admin)
router.post("/", protect, upload.single("document"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file provided" });
        }

        // Convert the buffer to a Base64 string so Cloudinary can read it
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        // Upload to Cloudinary inside a specific folder
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "consultancy_document_vault",
            resource_type: "auto", // Allows both images (JPG/PNG) and PDFs
        });

        // Send the secure URL back to the frontend
        res.status(200).json({
            message: "Document uploaded securely",
            url: result.secure_url,
            public_id: result.public_id, // We need this if the admin wants to delete the file later
        });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Document upload failed", error: error.message });
    }
});

export default router;