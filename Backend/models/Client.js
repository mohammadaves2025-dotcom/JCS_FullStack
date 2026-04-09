import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  inquiryId: { type: mongoose.Schema.Types.ObjectId, ref: "Inquiry" },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },

  // 🟢 NEW: Profile Photo URL
  profilePhoto: { type: String, default: "" },
  bloodGroup: { type: String, default: "" },
  address: { type: String, default: "" },
  requiredDocuments: { 
      type: [String], 
      default: ["10th Marksheet", "12th Marksheet", "Aadhar Card"] 
  },

  // 🟢 NEW: College Interests
  targetCourse: { type: String },
  targetColleges: [{ type: String }], // Array of college names

  admissionStatus: {
    type: String,
    enum: ["Documents Pending", "Documents Verified", "College Applied", "Seat Confirmed"],
    default: "Documents Pending"
  },

  financials: {
    totalAgreedAmount: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 }
  },

  // Flexible array so you can upload ANYTHING
  documents: [
    {
      docType: { type: String },
      url: { type: String },
      public_id: { type: String }
    }
  ],
  temperature: { type: String, enum: ["Hot", "Warm", "Cold"], default: "Warm" },
  waitlistReason: { type: String }, // "Funds", "Exams", etc.
  interactions: [
    {
      date: { type: Date, default: Date.now },
      note: { type: String },
      type: { type: String, enum: ["Call", "WhatsApp", "Email", "Office Visit"] }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Client", clientSchema);