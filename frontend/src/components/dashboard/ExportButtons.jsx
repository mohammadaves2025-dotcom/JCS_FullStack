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

   

    return (
        <div className="flex gap-3">
            <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-jcs-brand transition-all shadow-sm"
            >
                <FiGrid className="text-green-600" /> Excel
            </button>
            
        </div>
    );
};

export default ExportButtons;