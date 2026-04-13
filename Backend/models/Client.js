import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  inquiryId: { type: mongoose.Schema.Types.ObjectId, ref: "Inquiry" },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },

  profilePhoto: { type: String, default: "" },
  bloodGroup: { type: String, default: "" },
  address: { type: String, default: "" },

  // 🟢 NEW: Social Category
  socialCategory: {
    type: String,
    enum: ["General", "OBC", "SC", "ST", "OBC-NCL", "EWS"],
    default: "General"
  },

  requiredDocuments: { 
    type: [String], 
    default: ["10th Marksheet", "12th Marksheet", "Aadhar Card"] 
  },

  targetCourse: { type: String },
  targetColleges: [{ type: String }],

  // 🟢 NEW: University Account Credentials (stored by admin for partner universities)
  universityAccounts: [
    {
      universityName: { type: String },
      portalUrl: { type: String },
      username: { type: String },
      password: { type: String },
      notes: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],

  admissionStatus: {
    type: String,
    enum: ["Documents Pending", "Documents Verified", "College Applied", "Seat Confirmed"],
    default: "Documents Pending"
  },

  financials: {
    totalAgreedAmount: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 }
  },

  documents: [
    {
      docType: { type: String },
      url: { type: String },
      public_id: { type: String }
    }
  ],
  temperature: { type: String, enum: ["Hot", "Warm", "Cold"], default: "Warm" },
  waitlistReason: { type: String },
  interactions: [
    {
      date: { type: Date, default: Date.now },
      note: { type: String },
      type: { type: String, enum: ["Call", "WhatsApp", "Email", "Office Visit"] }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Client", clientSchema);
