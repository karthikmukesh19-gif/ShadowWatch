import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", threats: 12 },
  { day: "Tue", threats: 18 },
  { day: "Wed", threats: 10 },
  { day: "Thu", threats: 24 },
  { day: "Fri", threats: 15 },
  { day: "Sat", threats: 30 },
  { day: "Sun", threats: 20 },
];

function ThreatChart() {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mt-8">
      <h2 className="text-white text-xl font-bold mb-6">
        Weekly Threat Activity
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#374151" />
          <XAxis dataKey="day" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="threats"
            stroke="#06B6D4"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatChart;