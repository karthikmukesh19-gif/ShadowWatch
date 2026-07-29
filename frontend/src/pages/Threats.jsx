import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ThreatList from "../components/ThreatList";
import ThreatModal from "../components/ThreatModal";
import api from "../api/api";
import AddThreatModal from "../components/AddThreatModal";
import {
  exportToPDF,
  exportToExcel,
  exportToCSV,
} from "../utils/exportReports";

function Threats() {
  const [search, setSearch] = useState("");
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [severity, setSeverity] = useState("All");
  const [sortBy, setSortBy] = useState("None");
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingThreat, setEditingThreat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchThreats = async () => {
    try {
      setLoading(true);

      const response = await api.get("/threats");
      setThreats(response.data);
      setError("");
    } catch (err) {
      setError("Unable to fetch threats.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchThreats();
  }, []);
  // Refresh Function
  const handleRefresh = () => {
    setSearch("");
    setSeverity("All");
    setSortBy("None");
    setSelectedThreat(null);

    fetchThreats();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this threat?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/threats/${id}`);

      alert("Threat deleted successfully!");

      await fetchThreats();
    } catch (error) {
      console.error(error);
      alert("Failed to delete threat");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <h1 className="text-white text-2xl p-6">
          Loading threats...
        </h1>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <h1 className="text-red-500 text-2xl p-6">
          {error}
        </h1>
      </MainLayout>
    );
  }


  return (
    <MainLayout>
      <h1 className="text-4xl text-white font-bold">
        Threat Management
      </h1>

      <p className="text-gray-400 mt-2">
        View and manage detected cyber threats.
      </p>

      {/* Search + Filter + Sort + Refresh */}
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search Threat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg w-80 outline-none"
          />

          {/* Severity Filter */}
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
          >
            <option value="All">All</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
          >
            <option value="None">Sort: None</option>
            <option value="Severity">Sort: Severity</option>
            <option value="Threat">Sort: Threat Name</option>
            <option value="Time">Sort: Time</option>
          </select>

        </div>

        {/* Refresh Button */}
        <div className="flex gap-3 flex-wrap">

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg text-white"
          >
            + Add Threat
          </button>

          

          <button
            onClick={handleRefresh}
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg text-white"
          >
            Refresh
          </button>

        </div>
      </div>


      {/* Threat Table */}
      <ThreatList
        threats={threats}
        search={search}
        severity={severity}
        sortBy={sortBy}
        onView={setSelectedThreat}
        onEdit={(threat) => {
          setEditingThreat(threat);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/* Threat Details Modal */}
      <ThreatModal
        threat={selectedThreat}
        onClose={() => setSelectedThreat(null)}
      />
      <AddThreatModal
        isOpen={isModalOpen}
        editingThreat={editingThreat}
        onSuccess={fetchThreats}
        onClose={() => {
          setIsModalOpen(false);
          setEditingThreat(null);
        }}
      />
    </MainLayout>
  );
}

export default Threats;