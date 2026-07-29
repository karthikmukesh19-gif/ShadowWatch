import api from "../api/api";
import { useState, useEffect } from "react";

function AddThreatModal({
  isOpen,
  onClose,
  editingThreat,
  onSuccess,
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    id: "",
    threat: "",
    sourceIP: "",
    severity: "Low",
    status: "Detected",
    time: "",
  });
  useEffect(() => {
  if (editingThreat) {
    setFormData(editingThreat);
  } else {
    setFormData({
      id: "",
      threat: "",
      sourceIP: "",
      severity: "Low",
      status: "Detected",
      time: "",
    });
  }
}, [editingThreat, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = async () => {
  try {
    if (editingThreat) {
      // UPDATE
      await api.put(`/threats/${editingThreat.id}`, {
        threat: formData.threat,
        sourceIP: formData.sourceIP,
        severity: formData.severity,
        status: formData.status,
        time: formData.time,
      });

      alert("Threat updated successfully!");
    } else {
      // CREATE
      await api.post("/threats", {
        ...formData,
        id: Number(formData.id),
      });

      alert("Threat added successfully!");
    }
onSuccess();
onClose();

  } catch (error) {
    console.error(error);
    alert("Operation failed");
  }
};

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-[450px] border border-gray-700">
        <h2 className="text-2xl text-white font-bold mb-6">
  {editingThreat ? "Edit Threat" : "Add New Threat"}
</h2>
        <div className="space-y-4">

          <input
            type="number"
            name="id"
              disabled={editingThreat}
            placeholder="Threat ID"
            value={formData.id}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg"
          />

          <input
            type="text"
            name="threat"
            placeholder="Threat Name"
            value={formData.threat}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg"
          />

          <input
            type="text"
            name="sourceIP"
            placeholder="Source IP"
            value={formData.sourceIP}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg"
          />

          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg"
          >
            <option>Detected</option>
            <option>Blocked</option>
            <option>Active</option>
            <option>Resolved</option>
          </select>

          <input
            type="text"
            name="time"
            placeholder="Time (e.g. 03:30 PM)"
            value={formData.time}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
          >
            Cancel
          </button>

<button
  onClick={handleSave}
  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white"
>
  Save
</button>
        </div>
      </div>
    </div>
  );
}

export default AddThreatModal;