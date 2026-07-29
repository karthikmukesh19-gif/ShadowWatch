import { Bell } from "lucide-react";

function NotificationBell({ count = 0, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-lg hover:bg-gray-800 transition"
    >
      <Bell className="w-6 h-6 text-white" />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
          {count}
        </span>
      )}
    </button>
  );
}

export default NotificationBell;