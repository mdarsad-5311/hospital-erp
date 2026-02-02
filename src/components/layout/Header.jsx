import React from "react";
import { Bell, Search, MessageSquare } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const { user } = useAuth();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="h-16 bg-white  border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 ml-2">
      {/* Search */}
      <div className="relative w-96 hidden md:block">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search patients, appointments, records..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 bg-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>

        {/* Messages */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <MessageSquare size={20} />
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
            5
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
            {initials}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-500">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role?.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
