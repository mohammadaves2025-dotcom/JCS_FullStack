import Transaction from "../models/Transaction.js";
import Client from "../models/Client.js";

// @desc    Get all transactions (with optional filters)
// @route   GET /api/transactions
// @access  Private (Super Admin)
export const getTransactions = async (req, res) => {
    try {
        const { clientId, type, method, from, to } = req.query;
        const filter = {};

        if (clientId) filter.clientId = clientId;
        if (type) filter.type = type;
        if (method) filter.paymentMethod = method;
        if (from || to) {
            filter.createdAt = {};
            if (from) filter.createdAt.$gte = new Date(from);
            if (to) filter.createdAt.$lte = new Date(to);
        }

        const transactions = await Transaction.find(filter)
            .sort({ createdAt: -1 })
            .populate("clientId", "name phone email admissionStatus")
            .populate("recordedBy", "name");

        // Summary stats
        const totalReceived = transactions
            .filter(t => t.type === "Payment Received" && t.status === "Confirmed")
            .reduce((sum, t) => sum + t.amount, 0);

        const totalRefunded = transactions
            .filter(t => t.type === "Refund" && t.status === "Confirmed")
            .reduce((sum, t) => sum + t.amount, 0);

        res.status(200).json({ transactions, totalReceived, totalRefunded, net: totalReceived - totalRefunded });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private (Super Admin)
export const createTransaction = async (req, res) => {
    const { clientId, type, amount, paymentMethod, referenceNumber, description, status } = req.body;

    if (!clientId || !amount) {
        return res.status(400).json({ message: "Client and amount are required." });
    }

    try {
        const client = await Client.findById(clientId);
        if (!client) return res.status(404).json({ message: "Client not found" });

        // 🟢 FIX: Resolve fallbacks BEFORE creating the transaction
        const resolvedType = type || "Payment Received";
        const resolvedStatus = status || "Confirmed";

        const transaction = await Transaction.create({
            clientId,
            clientName: client.name,
            clientPhone: client.phone,
            clientEmail: client.email,
            type: resolvedType,
            amount: Number(amount),
            paymentMethod: paymentMethod || "UPI",
            referenceNumber: referenceNumber || "",
            description: description || "",
            recordedBy: req.user._id,
            status: resolvedStatus
        });

        // 🟢 Auto-sync financials on the client using the resolved variables
        if (resolvedType === "Payment Received" && resolvedStatus !== "Failed") {
            // Ensure financials object exists before doing math
            if (!client.financials) client.financials = { totalAgreedAmount: 0, amountPaid: 0 };
            
            client.financials.amountPaid = (client.financials.amountPaid || 0) + Number(amount);
            client.markModified("financials");
            await client.save();
        }

        res.status(201).json(transaction);
    } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private (Super Admin)
export const deleteTransaction = async (req, res) => {
    try {
        const tx = await Transaction.findByIdAndDelete(req.params.id);
        if (!tx) return res.status(404).json({ message: "Transaction not found" });
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
