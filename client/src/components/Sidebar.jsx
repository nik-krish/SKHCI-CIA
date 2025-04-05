import clsx from "clsx";
import React from "react";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard className="text-xl" />,
  },
  {
    label: "Chat",
    link: "http://localhost:5173",
    icon: <FaTasks className="text-xl" />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks className="text-xl" />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt className="text-xl" />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions className="text-xl" />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions className="text-xl" />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers className="text-xl" />,
  },
  {
    label: "Status",
    link: "status",
    icon: <IoCheckmarkDoneOutline className="text-xl" />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt className="text-xl" />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    const isActive = path === el.link.split("/")[0];
    return (
      <Link
        onClick={closeSidebar}
        to={el.link}
        className={clsx(
          "flex items-center gap-4 px-6 py-4 transition-all duration-300 group",
          isActive
            ? "bg-white/10 text-white border-l-4 border-purple-400"
            : "text-gray-300 hover:bg-white/5 hover:text-white"
        )}
      >
        <span
          className={clsx(
            "transition-transform duration-300",
            isActive ? "text-purple-400 scale-110" : "group-hover:scale-110"
          )}
        >
          {el.icon}
        </span>
        <span className="font-medium text-lg">{el.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl">
      {/* Logo/Branding */}
      <div className="p-8 pb-12 flex flex-col items-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <MdOutlineAddTask className="text-white text-3xl" />
        </div>
        <h1 className="text-2xl font-bold text-white">Task Manager</h1>
        <p className="text-gray-400 text-sm mt-1">Productivity Dashboard</p>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col px-4 overflow-y-auto">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      {/* User & Settings */}
      <div className="p-6 border-t border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0)}
          </div>
          <div>
            <p className="text-white font-medium">{user?.name}</p>
            <p className="text-gray-400 text-xs">{user?.role}</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
          <MdSettings className="text-xl" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
