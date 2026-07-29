import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function ThreatTrendChart({ threats }) {
  const data = threats.map((t) => ({
    name: `ID ${t.id}`,
    value: t.id,
  }));

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">
        Threat Trend
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatTrendChart;