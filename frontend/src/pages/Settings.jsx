import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function Settings() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <MainLayout>
      <h1 className="text-4xl text-white font-bold">
        Settings
      </h1>

      <p className="text-gray-400 mt-2">
        Manage your ShadowWatch preferences.
      </p>

      {/* Profile */}
      <div className="bg-gray-900 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-semibold text-white mb-6">
          👤 Profile
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-gray-400">Username</p>
            <p className="text-white font-semibold">Admin</p>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <p className="text-white font-semibold">
              admin@shadowwatch.com
            </p>
          </div>

          <div>
            <p className="text-gray-400">Role</p>
            <p className="text-cyan-400 font-semibold">
              Administrator
            </p>
          </div>
        </div>
      </div>

     

      {/* Notifications */}
      <div className="bg-gray-900 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-semibold text-white mb-6">
          🔔 Notifications
        </h2>

        <div className="space-y-4">

          <label className="flex justify-between items-center text-white">
            <span>Enable Notifications</span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
              className="w-5 h-5"
            />
          </label>

          <label className="flex justify-between items-center text-white">
            <span>Critical Alerts</span>

            <input
              type="checkbox"
              checked={criticalAlerts}
              onChange={() =>
                setCriticalAlerts(!criticalAlerts)
              }
              className="w-5 h-5"
            />
          </label>

        </div>
      </div>

      {/* Security */}
      <div className="bg-gray-900 rounded-xl p-6 mt-8 mb-10">
        <h2 className="text-2xl font-semibold text-white mb-6">
          🔒 Security
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white"
          >
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white"
          >
            Logout
          </button>

        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;