function NotificationItem({ notification }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white font-medium">
            {notification.title}
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            {notification.time}
          </p>
        </div>

        <span
          className={`text-white text-xs px-2 py-1 rounded-full ${getSeverityColor(
            notification.severity
          )}`}
        >
          {notification.severity}
        </span>
      </div>
    </div>
  );
}

export default NotificationItem;