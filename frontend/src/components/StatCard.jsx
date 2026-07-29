function StatCard({ title, value, color }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
      <h2 className="text-gray-400 text-sm">{title}</h2>

      <h1 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h1>
    </div>
  );
}

export default StatCard;