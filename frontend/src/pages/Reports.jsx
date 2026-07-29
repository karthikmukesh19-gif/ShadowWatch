import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api/api";

import {
  exportToPDF,
  exportToExcel,
  exportToCSV,
} from "../utils/exportReports";

function Reports() {
  const [threats, setThreats] = useState([]);

  const fetchThreats = async () => {
    try {
      const response = await api.get("/threats");
      setThreats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, []);

  const critical = threats.filter(
    (t) => t.severity === "Critical"
  ).length;

  const blocked = threats.filter(
    (t) => t.status === "Blocked"
  ).length;

  const risk =
    threats.length === 0
      ? 0
      : Math.round((critical / threats.length) * 100);

  return (
    <MainLayout>
      <h1 className="text-4xl text-white font-bold">
        Reports
      </h1>

      <p className="text-gray-400 mt-2">
        Generate and download cybersecurity reports.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

        <div className="bg-gray-900 rounded-xl p-6">
          <p className="text-gray-400">Total Threats</p>
          <h2 className="text-3xl font-bold text-white mt-2">
            {threats.length}
          </h2>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <p className="text-gray-400">Critical Threats</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {critical}
          </h2>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <p className="text-gray-400">Blocked Threats</p>
          <h2 className="text-3xl font-bold text-green-500 mt-2">
            {blocked}
          </h2>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <p className="text-gray-400">Risk Score</p>
          <h2 className="text-3xl font-bold text-cyan-400 mt-2">
            {risk}%
          </h2>
        </div>

      </div>

      {/* Export Section */}
      <div className="bg-gray-900 rounded-xl p-8 mt-10">

        <h2 className="text-2xl text-white font-semibold">
          Export Reports
        </h2>

        <p className="text-gray-400 mt-2">
          Download threat reports in your preferred format.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">

          <button
            onClick={() => exportToPDF(threats)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            📄 Export PDF
          </button>

          <button
            onClick={() => exportToExcel(threats)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            📊 Export Excel
          </button>

          <button
            onClick={() => exportToCSV(threats)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg"
          >
            📋 Export CSV
          </button>

        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-gray-900 rounded-xl p-8 mt-10">

        <h2 className="text-2xl text-white font-semibold mb-6">
          Recent Reports
        </h2>

        <table className="w-full">

          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="pb-3">Report</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Generated</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b border-gray-800">
              <td className="py-4 text-white">
                Threat Report
              </td>

              <td className="text-green-400">
                Ready
              </td>

              <td className="text-gray-400">
                Just Now
              </td>
            </tr>

            <tr>
              <td className="py-4 text-white">
                CSV / Excel Report
              </td>

              <td className="text-green-400">
                Ready
              </td>

              <td className="text-gray-400">
                On Demand
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}

export default Reports;