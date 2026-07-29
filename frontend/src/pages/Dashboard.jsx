import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import ThreatBarChart from "../charts/ThreatBarChart";
import ThreatPieChart from "../charts/ThreatPieChart";
import RecentThreats from "../components/RecentThreats";
import api from "../api/api";
import SeverityPieChart from "../components/SeverityPieChart";
import ThreatStatusChart from "../components/ThreatStatusChart";
import ThreatTrendChart from "../components/ThreatTrendChart";

function Dashboard() {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previousThreatCount, setPreviousThreatCount] = useState(0);

  const fetchThreats = async (showLoader = false) => {
    if (showLoader) {
      setLoading(true);
    }

    try {
      const response = await api.get("/threats");
      const latestThreats = response.data;

      // Notify only when a new threat is added
      if (
        previousThreatCount > 0 &&
        latestThreats.length > previousThreatCount
      ) {
        const newestThreat = [...latestThreats].sort((a, b) => b.id - a.id)[0];

        if (newestThreat.severity === "Critical") {
          toast.error(
  `🚨 Critical Threat Detected: ${newestThreat.threat}`,  
            {
              position: "top-right",
              autoClose: 5000,
            }
          );
        }
      }

      setThreats(latestThreats);
      setPreviousThreatCount(latestThreats.length);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch threats.");
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
  fetchThreats(true);

  const interval = setInterval(() => {
    fetchThreats(false);
  }, 30000);

  return () => clearInterval(interval);
}, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-white text-xl">Loading Dashboard...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-white text-4xl font-bold">
        Welcome to ShadowWatch
      </h1>

      <p className="text-gray-400 mt-2">
        AI Powered Cybersecurity Dashboard
      </p>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mt-6">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        <StatCard
          title="Total Threats"
          value={threats.length}
          color="text-red-500"
        />

        <StatCard
          title="Active Alerts"
          value={
            threats.filter((threat) => threat.status === "Active").length
          }
          color="text-yellow-400"
        />

        <StatCard
          title="Blocked Attacks"
          value={
            threats.filter((threat) => threat.status === "Blocked").length
          }
          color="text-green-500"
        />

        <StatCard
          title="Risk Score"
          value={
            threats.length === 0
              ? "0%"
              : `${Math.round(
                  (threats.filter(
                    (threat) => threat.severity === "Critical"
                  ).length /
                    threats.length) *
                    100
                )}%`
          }
          color="text-cyan-400"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ThreatBarChart threats={threats} />
        <ThreatPieChart threats={threats} />
      </div>

      {/* Recent Threats */}
      {/* Advanced Analytics */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
  <SeverityPieChart threats={threats} />

  <ThreatStatusChart threats={threats} />

  <div className="xl:col-span-2">
    <ThreatTrendChart threats={threats} />
  </div>
</div>

{/* Recent Threats */}
<RecentThreats threats={threats} />
    </MainLayout>
  );
}

export default Dashboard;