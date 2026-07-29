function AuditTable({ logs }) {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      <table className="w-full text-left text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Action</th>
            <th className="px-6 py-4">Details</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-6 text-gray-400"
              >
                No Audit Logs Found
              </td>
            </tr>
          ) : (
            logs.map((log, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800"
              >
                <td className="px-6 py-4">{log.user}</td>
                <td className="px-6 py-4">{log.action}</td>
                <td className="px-6 py-4">{log.details}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      log.status === "Success"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4">{log.timestamp}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AuditTable;