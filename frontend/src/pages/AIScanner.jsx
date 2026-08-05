import { useState } from "react";
import ScanResult from "../components/ScanResult";

export default function AIScanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const handleScan = async () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/scan-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          url,
        }),
      });

      if (!response.ok) {
        throw new Error("Scan failed");
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to scan URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-2">
        🤖 AI Phishing Scanner
      </h1>

      <p className="text-gray-400 mb-8">
        Scan URLs using Artificial Intelligence.
      </p>

      <div className="bg-[#1B2433] rounded-xl p-6 shadow-lg">

        <label className="block mb-2 text-lg">
          Enter Website URL
        </label>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-4 rounded-lg bg-[#111827] border border-gray-600 text-white outline-none"
        />

        <button
          onClick={handleScan}
          disabled={loading}
          className="mt-5 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Scanning..." : "Scan URL"}
        </button>
      </div>

      {result && <ScanResult result={result} />}
    </div>
  );
}