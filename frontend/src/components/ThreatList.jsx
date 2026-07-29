


function ThreatList({
  threats,
  search,
  severity,
  sortBy,
  onView,
  onEdit,
  onDelete,
}) {
  const filteredThreats = threats.filter((threat) => {
    const matchesSearch = threat.threat
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSeverity =
      severity === "All" || threat.severity === severity;

    return matchesSearch && matchesSeverity;
  });

  // Step 12.5.1 - Create a copy of filtered threats
  const sortedThreats = [...filteredThreats];

  // Severity Ranking
  const severityOrder = {
    Critical: 4,
    High: 3,
    Medium: 2,
    Low: 1,
  };

  // Sort by Severity
  if (sortBy === "Severity") {
    sortedThreats.sort((a, b) => {
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }
  // Sort by Threat Name (A-Z)
  if (sortBy === "Threat") {
    sortedThreats.sort((a, b) => {
      return a.threat.localeCompare(b.threat);
    });
  }
  // Convert "10:30 AM" -> minutes
  const convertTimeToMinutes = (time) => {
    const [clock, period] = time.split(" ");
    let [hours, minutes] = clock.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  // Sort by Time (Newest First)
  if (sortBy === "Time") {
    sortedThreats.sort((a, b) => {
      return convertTimeToMinutes(b.time) - convertTimeToMinutes(a.time);
    });
  }


  return (
    <div className="bg-gray-900 rounded-xl mt-8 p-6 border border-gray-800 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-4 text-left">ID</th>
            <th className="text-left">Threat</th>
            <th className="text-left">Source IP</th>
            <th className="text-left">Severity</th>
            <th className="text-left">Status</th>
            <th className="text-left">Time</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedThreats.map((threat) => (
            <tr
              key={threat.id}
              className="border-b border-gray-800 hover:bg-gray-800 transition duration-200"
            >
              <td className="py-4 text-white">{threat.id}</td>

              <td className="text-white font-medium">
                {threat.threat}
              </td>

              <td className="text-gray-300">
                {threat.sourceIP}
              </td>

              {/* Severity Badge */}
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${threat.severity === "Critical"
                      ? "bg-red-500/20 text-red-400"
                      : threat.severity === "High"
                        ? "bg-orange-500/20 text-orange-400"
                        : threat.severity === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                    }`}
                >
                  {threat.severity}
                </span>
              </td>

              {/* Status Badge */}
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${threat.status === "Active"
                      ? "bg-red-500/20 text-red-400"
                      : threat.status === "Blocked"
                        ? "bg-green-500/20 text-green-400"
                        : threat.status === "Detected"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : threat.status === "Resolved"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-400"
                    }`}
                >
                  {threat.status}
                </span>
              </td>

              <td className="text-gray-300">
                {threat.time}
              </td>

              <td>
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(threat)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                   onClick={() => onEdit(threat)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(threat.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {sortedThreats.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="text-center text-gray-400 py-8"
              >
                No threats found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ThreatList;