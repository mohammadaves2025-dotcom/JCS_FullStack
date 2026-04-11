import Archive from "../models/Archive.js";

export const getArchives = async (req, res) => {
    try {
        const { year } = req.query;
        const query = year ? { admissionYear: year } : {};
        const records = await Archive.find(query).sort({ admissionYear: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "Error fetching archives" });
    }
};

export const addArchiveRecord = async (req, res) => {
    try {
        const record = await Archive.create(req.body);
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ message: "Failed to create archive record" });
    }
};