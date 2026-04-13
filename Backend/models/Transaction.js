import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  clientName: { type: String, required: true },
  clientPhone: { type: String },
  clientEmail: { type: String },

  type: {
    type: String,
    enum: ["Payment Received", "Refund", "Discount", "Adjustment"],
    default: "Payment Received"
  },

  amount: { type: Number, required: true },

  paymentMethod: {
    type: String,
    enum: ["Cash", "Bank Transfer", "UPI", "Cheque", "Card", "Other"],
    default: "UPI"
  },

  referenceNumber: { type: String, default: "" }, // UTR / cheque no. / etc.

  description: { type: String, default: "" },

  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  status: {
    type: String,
    enum: ["Confirmed", "Pending", "Failed"],
    default: "Confirmed"
  }
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
