import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import api from "../api/api";

function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications/");
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearNotifications = async () => {
    try {
      await api.delete("/notifications/clear");
      setNotifications([]);
    } catch (error) {
      console.error("Failed to clear notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-14 right-12 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-white font-semibold text-lg">
          Notifications
        </h2>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <p className="text-gray-400 p-4">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-400 p-4">
            No notifications found.
          </p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={{
                title: notification.title,
                severity: notification.severity,
                time: notification.timestamp,
              }}
            />
          ))
        )}
      </div>

      <div className="p-3 border-t border-gray-700 text-center">
        <button
          onClick={clearNotifications}
          className="text-cyan-400 hover:text-cyan-300 text-sm"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default NotificationDropdown;