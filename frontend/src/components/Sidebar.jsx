import { NavLink } from "react-router-dom";
import {
  FaShieldAlt,
  FaTachometerAlt,
  FaBug,
  FaBell,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-4 transition rounded-lg mx-2 ${
      isActive
        ? "bg-cyan-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 fixed flex flex-col">

      <div className="text-3xl font-bold text-cyan-400 p-6">
        ShadowWatch
      </div>

      <nav className="flex-1">

        <NavLink to="/dashboard" end className={menuClass}>
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink to="/threats" className={menuClass}>
          <FaBug />
          Threats
        </NavLink>

        <NavLink to="/alerts" className={menuClass}>
          <FaBell />
          Alerts
        </NavLink>

        <NavLink to="/reports" className={menuClass}>
          <FaFileAlt />
          Reports
        </NavLink>

        <NavLink to="/settings" className={menuClass}>
          <FaCog />
          Settings
        </NavLink>

      </nav>

      <div className="p-6 text-cyan-400 flex items-center gap-2">
        <FaShieldAlt />
        AI Protection Enabled
      </div>

    </div>
  );
}

export default Sidebar;