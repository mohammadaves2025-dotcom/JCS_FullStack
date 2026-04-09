import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FiDownload, FiFileText, FiGrid } from 'react-icons/fi';

const ExportButtons = ({ data, filename, sheetName = "Data" }) => {

    // 📊 Excel Export Logic
    const exportToExcel = () => {
        // 1. Create a worksheet from the JSON data
        const worksheet = XLSX.utils.json_to_sheet(data);
        // 2. Create a workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        // 3. Trigger download
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    };

    // 📄 PDF Export Logic
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Branded Header for the PDF
        doc.setFontSize(18);
        doc.text("Jamia Consultancy Services", 14, 20);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Report Generated: ${new Date().toLocaleString()}`, 14, 26);

        // AutoTable logic: Extracts keys as headers and values as rows
        const tableColumn = Object.keys(data[0]);
        const tableRows = data.map(item => Object.values(item));

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 35,
            theme: 'striped',
            headStyles: { fillStyle: '#1B5135', textColor: [255, 255, 255] }, // JCS Deep Green
        });

        doc.save(`${filename}.pdf`);
    };

    return (
        <div className="flex gap-3">
            <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-jcs-brand transition-all shadow-sm"
            >
                <FiGrid className="text-green-600" /> Excel
            </button>
            <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-red-400 transition-all shadow-sm"
            >
                <FiFileText className="text-red-500" /> PDF
            </button>
        </div>
    );
};

export default ExportButtons;