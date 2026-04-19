import College from "../models/College.js";

// @desc    Add a new college to the inventory
// @route   POST /api/colleges
export const createCollege = async (req, res) => {
    const { name, city, state, type, estimatedDonation, programs } = req.body;

    try {
        const collegeExists = await College.findOne({ name });
        if (collegeExists) return res.status(400).json({ message: "College already exists." });

        // Ensure available seats matches total seats on creation
        const formattedPrograms = programs.map(p => ({
            name: p.name,
            totalSeats: p.totalSeats,
            availableSeats: p.totalSeats // Initially, all seats are available
        }));

        const college = await College.create({
            name, city, state, type, estimatedDonation,
            programs: formattedPrograms,
        });

        res.status(201).json(college);
    } catch (error) {
        console.error("Error creating college:", error);
        res.status(500).json({ message: "Server error creating college" });
    }
};

// @desc    Get all colleges
// @route   GET /api/colleges
export const getColleges = async (req, res) => {
    try {
        const colleges = await College.find({}).sort({ name: 1 });
        res.status(200).json(colleges);
    } catch (error) {
        console.error("Error fetching colleges:", error);
        res.status(500).json({ message: "Server error fetching colleges" });
    }
};

// @desc    Update college details
// @route   PUT /api/colleges/:id
export const updateCollege = async (req, res) => {
    const { name, city, state, type, estimatedDonation, programs } = req.body;

    try {
        const college = await College.findById(req.params.id);

        if (college) {
            college.name = name || college.name;
            college.city = city || college.city;
            college.state = state || college.state;
            college.type = type || college.type;
            college.estimatedDonation = estimatedDonation || college.estimatedDonation;

            if (programs) college.programs = programs;

            const updatedCollege = await college.save();
            res.status(200).json(updatedCollege);
        } else {
            res.status(404).json({ message: "College not found" });
        }
    } catch (error) {
        console.error("Error updating college:", error);
        res.status(500).json({ message: "Server error updating college" });
    }
};

// @desc    Adjust Seat Inventory for a SPECIFIC COURSE
// @route   PATCH /api/colleges/:id/inventory
export const adjustSeatInventory = async (req, res) => {
    const { programId, seatsSold } = req.body; // e.g. seatsSold: 1 (deduct) or -1 (refund)

    try {
        const college = await College.findById(req.params.id);
        if (!college) return res.status(404).json({ message: "College not found" });

        // Find the specific program inside the array using Mongoose's .id() method
        const program = college.programs.id(programId);
        if (!program) return res.status(404).json({ message: "Program not found" });

        // Validate we aren't selling seats we don't have
        if (program.availableSeats < seatsSold) {
            return res.status(400).json({ message: "Not enough seats available." });
        }
        // Validate we aren't refunding beyond the maximum total seats
        if (program.availableSeats - seatsSold > program.totalSeats) {
            return res.status(400).json({ message: "Cannot exceed total seat capacity." });
        }

        // Deduct (or add) the seats
        program.availableSeats -= seatsSold;

        const updatedCollege = await college.save();
        res.status(200).json(updatedCollege);
    } catch (error) {
        console.error("Error adjusting seat inventory:", error);
        res.status(500).json({ message: "Server error adjusting inventory" });
    }
};


// @desc    Get single college details
// @route   GET /api/colleges/:id
// @access  Private (Staff/Admin)
export const getCollegeById = async (req, res) => {
    try {
        const college = await College.findById(req.params.id);

        if (college) {
            res.status(200).json(college);
        } else {
            res.status(404).json({ message: "College not found" });
        }
    } catch (error) {
        console.error("Error fetching college:", error);
        res.status(500).json({ message: "Server error fetching college" });
    }
};