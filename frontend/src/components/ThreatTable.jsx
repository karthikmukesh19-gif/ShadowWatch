const threats = [
  {
    id: 1,
    threat: "Malware",
    severity: "High",
    status: "Blocked",
  },
  {
    id: 2,
    threat: "Phishing",
    severity: "Medium",
    status: "Detected",
  },
  {
    id: 3,
    threat: "Ransomware",
    severity: "Critical",
    status: "Active",
  },
];

function ThreatTable() {
  return (
    <div className="bg-gray-900 rounded-xl p-6 mt-8 border border-gray-800">
      <h2 className="text-white text-xl font-bold mb-4">
        Recent Threats
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-3">ID</th>
            <th>Threat</th>
            <th>Severity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {threats.map((item) => (
            <tr key={item.id} className="border-b border-gray-800">
              <td className="py-4 text-white">{item.id}</td>
              <td className="text-white">{item.threat}</td>
              <td className="text-red-400">{item.severity}</td>
              <td className="text-green-400">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ThreatTable;