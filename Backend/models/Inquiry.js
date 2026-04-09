import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },

    // 🟢 ADD THESE BACK: Missing fields causing the ReferenceError
    interestedCourse: { type: String, required: true },
    preferredCity: { type: String, required: true },

    // Marketing & ROI Tracking
    source: {
      type: String,
      enum: ["Instagram", "Google", "Referral", "Website Form", "Other", "Google Search"],
      default: "Website Form"
    },

    // CRM Pipeline
    status: { 
      type: String,
      enum: ["New", "Waiting List", "Converted", "Dead"],
      default: "New"
    },

    temperature: {
      type: String,
      enum: ["Hot", "Warm", "Cold", "Unassigned"],
      default: "Unassigned"
    },
    waitlistReason: {
      type: String,
      enum: ["Arranging Funds", "Awaiting Exam Results", "Comparing Options", "Parents Undecided", "Other", ""],
      default: ""
    },

    // The Audit Trail
    interactions: [
      {
        date: { type: Date, default: Date.now },
        note: { type: String, required: true },
        type: { type: String, enum: ["Call", "WhatsApp", "Email", "Note"], default: "Note" }
      }
    ],

    nextFollowUpDate: { type: Date },
    adminNotes: { type: String, default: "" },
    whatsappOptIn: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);