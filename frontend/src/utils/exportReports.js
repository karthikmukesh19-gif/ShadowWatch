import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// -------------------- PDF --------------------
export const exportToPDF = (threats) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("ShadowWatch Threat Report", 14, 20);

  const tableData = threats.map((t) => [
    t.id,
    t.threat,
    t.sourceIP,
    t.severity,
    t.status,
    t.time,
  ]);

  autoTable(doc, {
    head: [["ID", "Threat", "Source IP", "Severity", "Status", "Time"]],
    body: tableData,
    startY: 30,
  });

  doc.save("ShadowWatch_Report.pdf");
};

// -------------------- Excel --------------------
export const exportToExcel = (threats) => {
  const worksheet = XLSX.utils.json_to_sheet(threats);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Threats");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "ShadowWatch_Report.xlsx");
};

// -------------------- CSV --------------------
export const exportToCSV = (threats) => {
  const worksheet = XLSX.utils.json_to_sheet(threats);
  const csv = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "ShadowWatch_Report.csv");
};