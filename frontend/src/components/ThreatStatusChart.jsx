import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function ThreatStatusChart({ threats }) {
  const statusCount = {};

  threats.forEach((t) => {
    statusCount[t.status] = (statusCount[t.status] || 0) + 1;
  });

  const data = Object.keys(statusCount).map((key) => ({
    status: key,
    count: statusCount[key],
  }));

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">
        Threat Status
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="status" />
          <YAxis />

          <Tooltip />

          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatStatusChart;