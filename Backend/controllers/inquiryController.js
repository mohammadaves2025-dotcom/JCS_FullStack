import Inquiry from "../models/Inquiry.js";
import Client from "../models/Client.js"; // Needed for the conversion process
import User from "../models/User.js"; // Needed to create a user account during conversion
import sendEmail from "../utils/sendEmail.js"; // Your custom email utility
import { isEmailValid } from "../utils/emailValidator.js";

// @desc    Create a new inquiry (From the public website form)
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res) => {
    const { name, phone, email, interestedCourse, preferredCity, source } = req.body;

    if (!name || !phone || !email || !interestedCourse || !preferredCity) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    // 🟢 THE FIX: Run the email through our validator
    const emailCheck = isEmailValid(email);
    if (!emailCheck.isValid) {
        // This will send the error message straight back to your frontend UI
        return res.status(400).json({ message: emailCheck.message });
    }

    try {
        const inquiry = await Inquiry.create({
            name,
            phone,
            email: email.toLowerCase().trim(), // Force lowercase and remove spaces!
            interestedCourse,
            preferredCity,
            source: source || 'Website Form',
        });

        res.status(201).json({ message: "Counseling request received successfully.", inquiry });
    } catch (error) {
        console.error("Error creating inquiry:", error);
        res.status(500).json({ message: "Server error while saving your request." });
    }
};

// @desc    Get all inquiries (With optional status filtering)
// @route   GET /api/inquiries
// @access  Private (Staff/Admin)

export const getInquiries = async (req, res) => {

    // If the admin clicks a filter like "?status=New" on the frontend
    const filter = req.query.status ? { status: req.query.status } : {};

    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
    res.status(200).json(inquiries);
};

// @desc    Get today's follow-ups for the Smart Reminder System
// @route   GET /api/inquiries/follow-ups
// @access  Private (Staff/Admin)


export const getTodayFollowUps = async (req, res) => {

    // Find inquiries in the Waiting List where the follow-up date is today or in the past
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const followUps = await Inquiry.find({
        status: "Waiting List",
        nextFollowUpDate: { $lte: new Date() } // Less than or equal to current time
    }).sort({ nextFollowUpDate: 1 });

    res.status(200).json(followUps);
};

// @desc    Update inquiry details (Admin jotting notes or changing follow-up date)
// @route   PUT /api/inquiries/:id
// @access  Private (Staff/Admin)

// @desc    Update inquiry details
// @route   PUT /api/inquiries/:id
// @access  Private (Staff/Admin)
export const updateInquiry = async (req, res) => {
    // 🚨 1. Added temperature and waitlistReason to the extraction list
    const { status, adminNotes, nextFollowUpDate, temperature, waitlistReason } = req.body;

    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (inquiry) {
            // 2. Standard updates
            if (status) inquiry.status = status;
            if (adminNotes !== undefined) inquiry.adminNotes = adminNotes;
            if (nextFollowUpDate) inquiry.nextFollowUpDate = nextFollowUpDate;

            // 🚨 3. Save the new God-Level fields!
            if (temperature) inquiry.temperature = temperature;
            if (waitlistReason !== undefined) inquiry.waitlistReason = waitlistReason;

            const updatedInquiry = await inquiry.save();
            res.status(200).json(updatedInquiry);
        } else {
            res.status(404).json({ message: "Inquiry not found" });
        }
    } catch (error) {
        console.error("Error updating inquiry:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Convert an Inquiry into a paying Client profile
// @route   POST /api/inquiries/:id/convert
// @access  Private (Super Admin Only)


export const convertInquiryToClient = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) return res.status(404).json({ message: "Lead not found" });

        // 1. VALIDATION: Ensure they have an email before converting
        if (!inquiry.email) {
            return res.status(400).json({ message: "Cannot convert: Lead must have an email address to create a portal account." });
        }

        // 2. Create the Client Profile
        const newClient = await Client.create({
            inquiryId: inquiry._id,
            name: inquiry.name,
            phone: inquiry.phone,
            email: inquiry.email,
            targetCourse: inquiry.interestedCourse,
            admissionStatus: "Documents Pending",
        });

        // 3. USER ACCOUNT CREATION
        let userExists = await User.findOne({ email: inquiry.email });
        let rawPassword = "";

        if (!userExists) {
            rawPassword = `JCS-${Math.floor(1000 + Math.random() * 9000)}`;

            await User.create({
                name: inquiry.name,
                email: inquiry.email,
                password: rawPassword,
                role: "student",
                clientProfileId: newClient._id,
            });
        }

        // 🚨 4. FIRE THE WELCOME EMAIL (Using YOUR specific sendEmail utility)
        if (!userExists) {
            const loginURL = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login`;

            const htmlEmail = `
                <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #111827;">Welcome to Jamia Consultancy Services! 🎉</h2>
                    <p style="color: #4B5563; font-size: 16px;">Hi ${inquiry.name.split(' ')[0]},</p>
                    <p style="color: #4B5563; font-size: 16px;">Your secure Admission Portal has been successfully created. You can now log in to track your application status, view your financial ledger, and securely upload your required documents.</p>
                    
                    <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0; color: #374151;"><strong>Login URL:</strong> <a href="${loginURL}" style="color: #00D084;">${loginURL}</a></p>
                        <p style="margin: 0 0 10px 0; color: #374151;"><strong>Email (Username):</strong> ${inquiry.email}</p>
                        <p style="margin: 0; color: #374151;"><strong>Temporary Password:</strong> <span style="background: #E5E7EB; padding: 3px 8px; border-radius: 4px; font-family: monospace;">${rawPassword}</span></p>
                    </div>

                    <p style="color: #4B5563; font-size: 14px;"><em>*Please log in and change your password immediately for security purposes.</em></p>
                    <br/>
                    <p style="color: #4B5563; font-size: 16px;">Best Regards,<br/><strong>The JCS Team</strong></p>
                </div>
            `;

            const plainTextFallback = `Welcome to Jamia Consultancy Services! Your portal is ready. Login at ${loginURL} with your email and this temporary password: ${rawPassword}`;

            try {
                await sendEmail({
                    email: inquiry.email,
                    subject: "Your JCS Admission Portal is Ready!",
                    message: plainTextFallback, // Plugs into options.message (text)
                    html: htmlEmail,            // Plugs into options.html (HTML)
                });
            } catch (emailError) {
                console.error("User created, but email failed to send:", emailError);
            }
        }

        // 5. Change Lead Status to Converted
        inquiry.status = "Converted";
        await inquiry.save();

        res.status(200).json({ message: "Lead converted, User account created, and Welcome Email sent!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during conversion" });
    }
};

// @desc    Delete an inquiry permanently
// @route   DELETE /api/inquiries/:id
// @access  Private (Super Admin Only)
export const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        // Use deleteOne() to remove it from MongoDB
        await inquiry.deleteOne();

        res.status(200).json({ message: "Lead permanently deleted." });
    } catch (error) {
        console.error("Error deleting inquiry:", error);
        res.status(500).json({ message: "Server error during deletion." });
    }
};