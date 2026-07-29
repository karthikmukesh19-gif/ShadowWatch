function ThreatModal({ threat, onClose }) {
  if (!threat) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-[500px] rounded-xl border border-gray-700 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Threat Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-400 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Threat Details */}
        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-gray-400">ID</span>
            <span className="text-white">{threat.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Threat</span>
            <span className="text-white">{threat.threat}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Source IP</span>
            <span className="text-white">{threat.sourceIP}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Severity</span>
            <span className="text-white">{threat.severity}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>
            <span className="text-white">{threat.status}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Time</span>
            <span className="text-white">{threat.time}</span>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default ThreatModal;