import Client from "../models/Client.js";
import Inquiry from "../models/Inquiry.js";
import College from "../models/College.js";


// @desc    Get all converted clients (The main CRM Table)
// @route   GET /api/clients
// @access  Private (Staff/Admin)
export const getClients = async (req, res) => {
    try {
        // 🔥 THE FIX: Removed .populate('targetCollege')
        const clients = await Client.find({}).sort({ createdAt: -1 });
        res.status(200).json(clients);
    } catch (error) {
        console.error("CRITICAL ERROR FETCHING CLIENTS:", error);
        res.status(500).json({ message: "Server error fetching clients" });
    }
};

// @desc    Get single client profile
// @route   GET /api/clients/:id
// @access  Private (Admin/Student)

export const getClientById = async (req, res) => {
    try {
        let client;

        // 🟢 THE FIX: If the ID is "my-profile", find the client linked to the logged-in user
        if (req.params.id === 'my-profile') {
            client = await Client.findOne({ email: req.user.email });
        } else {
            // Otherwise, look it up by the provided ObjectId
            client = await Client.findById(req.params.id);
        }

        if (!client) {
            return res.status(404).json({ message: "Admission profile not found." });
        }

        res.json(client);
    } catch (error) {
        // This is where the CastError was happening before
        console.error(error);
        res.status(500).json({ message: "Error retrieving profile" });
    }
};

// @desc    Update client financials, status, or documents
// @route   PUT /api/clients/:id
// @access  Private (Admin/Super Admin)
// @desc    Update client financials, status, course, or documents
// @route   PUT /api/clients/:id
// @access  Private (Admin/Super Admin)
export const updateClient = async (req, res) => {
    // 🚨 1. Add the new fields to the extraction list
    const {
        admissionStatus,
        totalAgreedAmount,
        amountPaid,
        documents,
        profilePhoto,
        targetColleges,
        targetCourse,
        bloodGroup,         // 🟢 NEW
        address,            // 🟢 NEW
        requiredDocuments   // 🟢 NEW
    } = req.body;

    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        // 2. Standard updates
        if (admissionStatus) client.admissionStatus = admissionStatus;
        if (profilePhoto !== undefined) client.profilePhoto = profilePhoto;
        if (targetColleges) client.targetColleges = targetColleges;
        if (targetCourse !== undefined) client.targetCourse = targetCourse;

        // 🚨 3. Save the new fields
        if (bloodGroup !== undefined) client.bloodGroup = bloodGroup;
        if (address !== undefined) client.address = address;
        if (requiredDocuments) client.requiredDocuments = requiredDocuments; // Admin can push ["Gap Certificate"] here!

        // 4. 🟢 FIXED Financial Updates (Crash-Proofed)

        // Safety net: If the client document lacks a financials object, create an empty one first
        if (!client.financials) {
            client.financials = { totalAgreedAmount: 0, amountPaid: 0 };
        }

        if (totalAgreedAmount !== undefined) {
            client.financials.totalAgreedAmount = Number(totalAgreedAmount);
        }
        if (amountPaid !== undefined) {
            client.financials.amountPaid = Number(amountPaid);
        }

        // Tell Mongoose explicitly to track this nested object
        client.markModified('financials');

        // 5. Document Updates
        if (documents) {
            client.documents = documents;
        }

        const updatedClient = await client.save();
        res.status(200).json(updatedClient);

    } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({ message: "Server error" });
    }
};
// @desc    Get Dashboard Statistics (The Analytics Engine)
// @route   GET /api/clients/stats
// @access  Private (Super Admin Only)
export const getDashboardStats = async (req, res) => {

    try {
        // 1. Lead Conversion Rate
        const totalInquiries = await Inquiry.countDocuments();
        const convertedClients = await Client.countDocuments();

        // 2. Revenue Analytics
        const revenueData = await Client.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $ifNull: ["$financials.totalAgreedAmount", 0] } },
                    totalCollected: { $sum: { $ifNull: ["$financials.amountPaid", 0] } },
                },
            },
        ]);

        // 3. Status Distribution (Pie Chart Data)
        const statusDistribution = await Client.aggregate([
            { $group: { _id: "$admissionStatus", count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            leads: totalInquiries,
            conversions: convertedClients,
            revenue: revenueData[0] || { totalRevenue: 0, totalCollected: 0 },
            statusDistribution,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Get logged in student's client profile
// @route   GET /api/clients/my-profile
// @access  Private (Student)
export const getMyProfile = async (req, res) => {
    try {
        // 🟢 Added .trim() to kill accidental spaces
        const cleanEmail = req.user.email.trim();

        const client = await Client.findOne({
            email: { $regex: new RegExp("^" + cleanEmail + "$", "i") }
        });

        if (!client) {
            console.log(`❌ 404 Error: Could not find Client document for email: '${cleanEmail}'`);
            return res.status(404).json({ message: "Student profile not found." });
        }

        res.status(200).json(client);
    } catch (error) {
        console.error("Error fetching student profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// @desc    Student uploads a document to their own profile
// @route   PUT /api/clients/my-profile/documents
// @access  Private (Student)
export const updateMyDocuments = async (req, res) => {
    const { document } = req.body; // Expecting { docType, url, public_id }

    try {
        const client = await Client.findOne({ email: req.user.email });

        if (!client) return res.status(404).json({ message: "Profile not found" });

        client.documents.push(document);
        const updatedClient = await client.save();

        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(500).json({ message: "Server error saving document" });
    }
};