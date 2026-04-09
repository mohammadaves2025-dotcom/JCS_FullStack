import Inquiry from "../models/Inquiry.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Get all contacts currently on the Waiting List
// @route   GET /api/broadcast/targets
// @access  Private (Staff/Admin)
export const getBroadcastTargets = async (req, res) => {
    const targets = await Inquiry.find({ status: "Waiting List" }).select("name email phone whatsappOptIn");
    res.status(200).json({ count: targets.length, targets });
};

// @desc    Send Bulk Email to Waiting List
// @route   POST /api/broadcast/email
// @access  Private (Super Admin Only)
export const sendBulkEmail = async (req, res) => {
    const { subject, message, html } = req.body;

    if (!subject || !message) {
        return res.status(400).json({ message: "Subject and message are required." });
    }

    // 1. Fetch only the waiting list users who provided an email
    const leads = await Inquiry.find({
        status: "Waiting List",
        email: { $exists: true, $ne: "" }
    });

    if (leads.length === 0) {
        return res.status(404).json({ message: "No valid email addresses found in the Waiting List." });
    }

    try {
        // 2. Send emails concurrently using Promise.all
        await Promise.all(
            leads.map(async (lead) => {
                const personalizedMessage = `Hi ${lead.name},\n\n${message}`;
                await sendEmail({
                    email: lead.email,
                    subject: subject,
                    message: personalizedMessage,
                    html: html,
                });
            })
        );

        res.status(200).json({ message: `Successfully broadcasted email to ${leads.length} leads.` });
    } catch (error) {
        res.status(500).json({ message: "Broadcast failed.", error: error.message });
    }
};

// @desc    Send Bulk WhatsApp to Waiting List
// @route   POST /api/broadcast/whatsapp
// @access  Private (Super Admin Only)
export const sendBulkWhatsApp = async (req, res) => {
    const { message } = req.body;

    // 1. Fetch leads who opted in for WhatsApp
    const leads = await Inquiry.find({
        status: "Waiting List",
        whatsappOptIn: true,
        phone: { $exists: true, $ne: "" }
    });

    if (leads.length === 0) {
        return res.status(404).json({ message: "No valid WhatsApp numbers found." });
    }

    try {
        // 2. The WhatsApp API Loop (Ready for Twilio / Meta Cloud API integration)
        await Promise.all(
            leads.map(async (lead) => {
                // TODO: Replace this console.log with actual Twilio/Meta API call
                // Example: await twilioClient.messages.create({ body: message, from: 'whatsapp:+123', to: `whatsapp:${lead.phone}` })
                console.log(`[WhatsApp API Mock] Sending to ${lead.phone}: ${message}`);
            })
        );

        res.status(200).json({
            message: `Successfully queued WhatsApp broadcast to ${leads.length} leads.`
        });
    } catch (error) {
        res.status(500).json({ message: "WhatsApp Broadcast failed.", error: error.message });
    }
};