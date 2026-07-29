import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#f97316", "#ef4444"];

function SeverityPieChart({ threats }) {
  const severityCount = {};

  threats.forEach((t) => {
    severityCount[t.severity] = (severityCount[t.severity] || 0) + 1;
  });

  const data = Object.keys(severityCount).map((key) => ({
    name: key,
    value: severityCount[key],
  }));

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">
        Threats by Severity
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SeverityPieChart;