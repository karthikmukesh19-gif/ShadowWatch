import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#EF4444", "#F97316", "#EAB308", "#22C55E"];

function ThreatPieChart({ threats }) {

  const data = [
    {
      name: "Critical",
      value: threats.filter((t) => t.severity === "Critical").length,
    },
    {
      name: "High",
      value: threats.filter((t) => t.severity === "High").length,
    },
    {
      name: "Medium",
      value: threats.filter((t) => t.severity === "Medium").length,
    },
    {
      name: "Low",
      value: threats.filter((t) => t.severity === "Low").length,
    },
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-bold text-white mb-4">
        Threat Distribution
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ThreatPieChart;