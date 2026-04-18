import Client from "../models/Client.js";
import Inquiry from "../models/Inquiry.js";
import College from "../models/College.js";

// @desc    Get all converted clients
// @route   GET /api/clients
// @access  Private (Staff/Admin)
export const getClients = async (req, res) => {
    try {
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
        if (req.params.id === 'my-profile') {
            client = await Client.findOne({ email: req.user.email });
        } else {
            client = await Client.findById(req.params.id);
        }
        if (!client) {
            return res.status(404).json({ message: "Admission profile not found." });
        }
        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving profile" });
    }
};

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private (Admin/Super Admin)
export const updateClient = async (req, res) => {
    const {
        admissionStatus,
        temperature,
        totalAgreedAmount,
        amountPaid,
        documents,
        profilePhoto,
        targetColleges,
        targetCourse,
        bloodGroup,
        address,
        requiredDocuments,
        socialCategory,        // 🟢 NEW
        universityAccounts,
        guardianDetails    // 🟢 NEW
    } = req.body;

    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        if (admissionStatus) client.admissionStatus = admissionStatus;
        if (temperature !== undefined) client.temperature = temperature;
        if (profilePhoto !== undefined) client.profilePhoto = profilePhoto;
        if (targetColleges) client.targetColleges = targetColleges;
        if (targetCourse !== undefined) client.targetCourse = targetCourse;
        if (bloodGroup !== undefined) client.bloodGroup = bloodGroup;
        if (address !== undefined) client.address = address;
        if (requiredDocuments) client.requiredDocuments = requiredDocuments;
        if (socialCategory !== undefined) client.socialCategory = socialCategory;  // 🟢 NEW
        if (universityAccounts !== undefined) client.universityAccounts = universityAccounts; // 🟢 NEW


        if (guardianDetails !== undefined) {
            client.guardianDetails = { ...client.guardianDetails, ...guardianDetails };
        }

        if (!client.financials) {
            client.financials = { totalAgreedAmount: 0, amountPaid: 0 };
        }
        if (totalAgreedAmount !== undefined) {
            client.financials.totalAgreedAmount = Number(totalAgreedAmount);
        }
        if (amountPaid !== undefined) {
            client.financials.amountPaid = Number(amountPaid);
        }
        client.markModified('financials');

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

// @desc    Get Dashboard Statistics
// @route   GET /api/clients/stats
// @access  Private (Super Admin Only)
export const getDashboardStats = async (req, res) => {
    try {
        const totalInquiries = await Inquiry.countDocuments();
        const convertedClients = await Client.countDocuments();

        const revenueData = await Client.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $ifNull: ["$financials.totalAgreedAmount", 0] } },
                    totalCollected: { $sum: { $ifNull: ["$financials.amountPaid", 0] } },
                },
            },
        ]);

        const statusDistribution = await Client.aggregate([
            { $group: { _id: "$admissionStatus", count: { $sum: 1 } } }
        ]);

        const leadDistribution = await Client.aggregate([
            { $group: { _id: "$temperature", count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            leads: totalInquiries,
            conversions: convertedClients,
            revenue: revenueData[0] || { totalRevenue: 0, totalCollected: 0 },
            statusDistribution,
            leadDistribution,
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
        const cleanEmail = req.user.email.trim();
        const client = await Client.findOne({
            email: { $regex: new RegExp("^" + cleanEmail + "$", "i") }
        });

        if (!client) {
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
    const { document } = req.body;

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
