import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ThreatBarChart({ threats }) {

  const data = [
    {
      severity: "Critical",
      count: threats.filter((t) => t.severity === "Critical").length,
    },
    {
      severity: "High",
      count: threats.filter((t) => t.severity === "High").length,
    },
    {
      severity: "Medium",
      count: threats.filter((t) => t.severity === "Medium").length,
    },
    {
      severity: "Low",
      count: threats.filter((t) => t.severity === "Low").length,
    },
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl text-white font-bold mb-4">
        Threat Severity Overview
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="severity" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#06B6D4"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ThreatBarChart;