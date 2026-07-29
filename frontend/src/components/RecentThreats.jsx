function RecentThreats({ threats }) {
  const recentThreats = [...threats]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mt-8">
      <h2 className="text-2xl text-white font-bold mb-4">
        Recent Threats
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-3">Threat</th>
            <th>Status</th>
            <th>Severity</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {recentThreats.map((threat) => (
            <tr
              key={threat.id}
              className="border-b border-gray-800 text-white"
            >
              <td className="py-3">{threat.threat}</td>
              <td>{threat.status}</td>
              <td>{threat.severity}</td>
              <td>{threat.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentThreats;