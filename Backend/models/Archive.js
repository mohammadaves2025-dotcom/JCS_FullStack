import mongoose from "mongoose";

const archiveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    course: { type: String },
    college: { type: String },
    admissionYear: { type: Number, required: true }, // e.g., 2024, 2025
    finalStatus: { type: String, default: "Admitted" },
    totalFee: { type: Number },
    notes: { type: String }
}, { timestamps: true });

export default mongoose.model("Archive", archiveSchema);