import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import AuditTable from "../components/AuditTable";
import api from "../api/api";

function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await api.get("/audit-logs/");
      setLogs(response.data);
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-white mb-6">
        Audit Logs
      </h1>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <AuditTable logs={logs} />
      )}
    </MainLayout>
  );
}

export default AuditLogs;