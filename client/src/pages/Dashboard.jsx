import clsx from "clsx";
import moment from "moment";
import React, { useEffect } from "react";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { Chart, Loading, UserInfo } from "../components";
import { useGetDasboardStatsQuery } from "../redux/slices/api/taskApiSlice";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import { useSelector } from "react-redux";

const Card = ({ label, count, bg, icon }) => {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between h-full">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {label}
          </p>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
            {count}
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Updated: {moment().format("MMM D")}
          </p>
        </div>
        <div
          className={clsx(
            "w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl shadow",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { data, isLoading, error } = useGetDasboardStatsQuery();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const totals = data?.tasks || [];

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" />
      </div>
    );

  const stats = [
    {
      _id: "1",
      label: "Total Tasks",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-blue-500",
    },
    {
      _id: "2",
      label: "Completed",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-green-500",
    },
    {
      _id: "3",
      label: "In Progress",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-yellow-500",
    },
    {
      _id: "4",
      label: "To Do",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard Overview
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {moment().format("MMMM D, YYYY")}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats?.map(({ icon, bg, label, total }, index) => (
            <Card key={index} icon={icon} bg={bg} label={label} count={total} />
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 md:mb-0">
              Task Priority Distribution
            </h4>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg">
                This Month
              </button>
            </div>
          </div>
          <div className="h-80">
            <Chart data={data?.graphData} />
          </div>
        </div>

        {/* Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TaskTable tasks={data?.last10Task} />
          </div>
          {data && user?.isAdmin && (
            <div>
              <UserTable users={data?.users} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className="border-b border-gray-200 dark:border-gray-700">
      <tr className="text-left">
        <th className="pb-3 font-medium text-gray-600 dark:text-gray-300">
          User
        </th>
        <th className="pb-3 font-medium text-gray-600 dark:text-gray-300">
          Status
        </th>
        <th className="pb-3 font-medium text-gray-600 dark:text-gray-300">
          Joined
        </th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <td className="py-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            {getInitials(user?.name)}
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-white">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.role}
            </p>
          </div>
        </div>
      </td>

      <td>
        <span
          className={clsx(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            user?.isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </span>
      </td>
      <td className="text-sm text-gray-500 dark:text-gray-400">
        {moment(user?.createdAt).format("MMM D, YYYY")}
      </td>
    </tr>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Team Members
        </h3>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {users?.slice(0, 5).map((user) => (
              <TableRow key={user._id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 text-center border-t border-gray-200 dark:border-gray-700">
        <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          View All Users
        </button>
      </div>
    </div>
  );
};

const TaskTable = ({ tasks }) => {
  const { user } = useSelector((state) => state.auth);

  const ICONS = {
    high: <MdKeyboardDoubleArrowUp className="text-lg" />,
    medium: <MdKeyboardArrowUp className="text-lg" />,
    low: <MdKeyboardArrowDown className="text-lg" />,
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-200 dark:border-gray-700">
      <tr className="text-left">
        <th className="pb-3 font-medium text-gray-600 dark:text-gray-300">
          Task
        </th>
        <th className="pb-3 font-medium text-gray-600 dark:text-gray-300">
          Priority
        </th>
        <th className="pb-3 font-medium text-gray-600 dark:text-gray-300">
          Team
        </th>
        <th className="pb-3 font-medium text-gray-600 dark:text-gray-300 hidden md:table-cell">
          Created
        </th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <td className="py-3">
        <div className="flex items-center space-x-3">
          <div
            className={clsx("w-2.5 h-2.5 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className="font-medium text-gray-800 dark:text-white line-clamp-1">
            {task?.title}
          </p>
        </div>
      </td>
      <td>
        <div className="flex items-center space-x-2">
          <span className={clsx(PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className="capitalize text-gray-800 dark:text-gray-200">
            {task?.priority}
          </span>
        </div>
      </td>

      <td>
        <div className="flex -space-x-2">
          {task?.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-white",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className="hidden md:table-cell text-sm text-gray-500 dark:text-gray-400">
        {moment(task?.date).fromNow()}
      </td>
    </tr>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Recent Tasks
        </h3>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {tasks.map((task) => (
              <TableRow key={task._id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 text-center border-t border-gray-200 dark:border-gray-700">
        <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          View All Tasks
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
