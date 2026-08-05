const API_URL = import.meta.env.VITE_API_URL;

export async function getScanHistory() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/scan-history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch scan history");
  }

  return await response.json();
}