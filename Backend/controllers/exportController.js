import Client from "../models/Client.js";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

// @desc    Download All Clients as an Excel Spreadsheet
// @route   GET /api/exports/excel
// @access  Private (Super Admin Only)
export const exportClientsToExcel = async (req, res) => {
    try {
        const clients = await Client.find({}).populate("targetCollege", "name");

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Client Database");

        // Define the columns for the Excel sheet
        worksheet.columns = [
            { header: "Name", key: "name", width: 25 },
            { header: "Phone", key: "phone", width: 20 },
            { header: "Status", key: "status", width: 20 },
            { header: "Target College", key: "college", width: 35 },
            { header: "Total Fee (₹)", key: "totalFee", width: 15 },
            { header: "Amount Paid (₹)", key: "amountPaid", width: 15 },
        ];

        // Make the header row bold
        worksheet.getRow(1).font = { bold: true };

        // Loop through database and add rows to the Excel sheet
        clients.forEach((client) => {
            worksheet.addRow({
                name: client.name,
                phone: client.phone,
                status: client.admissionStatus,
                college: client.targetCollege ? client.targetCollege.name : "Not Assigned",
                totalFee: client.financials.totalAgreedAmount,
                amountPaid: client.financials.amountPaid,
            });
        });

        // Tell the browser to expect a downloadable file
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=Client_Database.xlsx");

        // Send the file directly to the user's browser
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ message: "Failed to generate Excel file", error: error.message });
    }
};

// @desc    Download All Clients as a PDF Report
// @route   GET /api/exports/pdf
// @access  Private (Super Admin Only)
export const exportClientsToPDF = async (req, res) => {
    try {
        const clients = await Client.find({}).populate("targetCollege", "name");

        // Initialize the PDF document
        const doc = new PDFDocument({ margin: 50 });

        // Tell the browser to expect a downloadable PDF
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=Client_Report.pdf");

        // Pipe the PDF directly to the response
        doc.pipe(res);

        // Add a Title
        doc.fontSize(20).text("Official Client Database Report", { align: "center" });
        doc.moveDown();
        doc.fontSize(10).text(`Generated on: ${new Date().toLocaleDateString()}`, { align: "center" });
        doc.moveDown(2);

        // Loop through clients and format them nicely
        clients.forEach((client, index) => {
            const collegeName = client.targetCollege ? client.targetCollege.name : "Not Assigned";
            const balance = client.financials.totalAgreedAmount - client.financials.amountPaid;

            doc.fontSize(14).text(`${index + 1}. ${client.name}`, { underline: true });
            doc.fontSize(12)
                .text(`Phone: ${client.phone}`)
                .text(`Status: ${client.admissionStatus}`)
                .text(`Target College: ${collegeName}`)
                .text(`Financials: Total: ₹${client.financials.totalAgreedAmount} | Paid: ₹${client.financials.amountPaid} | Balance: ₹${balance}`);

            doc.moveDown(); // Space between clients
        });

        // Finalize the PDF and end the stream
        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Failed to generate PDF", error: error.message });
    }
};