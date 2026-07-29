import { useState } from "react";
import NotificationBell from "./NotificationBell";
import NotificationDropdown from "./NotificationDropdown";

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="h-20 bg-gray-900 flex justify-between items-center px-8 border-b border-gray-700">
      <h1 className="text-white text-2xl font-bold">
        Dashboard
      </h1>

      <div className="flex items-center gap-4 relative">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
        />

        <NotificationBell
          count={3}
          onClick={() => setShowNotifications(!showNotifications)}
        />

        {showNotifications && (
          <NotificationDropdown />
        )}

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export default Navbar;