export default function ScanResult({ result }) {
  return (
    <div className="bg-[#1B2433] mt-8 p-6 rounded-xl shadow-lg text-white">

      <h2 className="text-2xl font-bold mb-6">
        Scan Result
      </h2>

      <div className="space-y-4">

        <div>
          <span className="font-semibold">
            Prediction:
          </span>{" "}
          <span className="text-green-400">
            {result.prediction}
          </span>
        </div>

        <div>
          <span className="font-semibold">
            Confidence:
          </span>{" "}
          {result.confidence}%
        </div>

        <div>
          <span className="font-semibold">
            Risk:
          </span>{" "}
          {result.risk}
        </div>

        <div>
          <span className="font-semibold">
            Explanation:
          </span>

          <p className="mt-2 text-gray-300">
            {result.explanation}
          </p>
        </div>

      </div>
    </div>
  );
}