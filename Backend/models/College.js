import mongoose from "mongoose";

// Sub-schema for individual courses
const programSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "MBBS (Management)"
    totalSeats: { type: Number, required: true, default: 0 },
    availableSeats: { type: Number, required: true, default: 0 }
});

const collegeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        type: { type: String, default: "Private University" },
        estimatedDonation: { type: String }, 
        
        // 🚨 THE FIX: Array of specific programs with their own seat counts
        programs: [programSchema] 
    },
    { timestamps: true }
);

export default mongoose.model("College", collegeSchema);