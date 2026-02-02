import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../../contexts/AuthContext";
import { Assistant } from "../ai/Assistant";

export default function DashboardLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar - Fixed width */}
      <aside className="w-64 flex-shrink-0 border-r bg-white h-full overflow-y-auto hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <Assistant />
    </div>
  );
}
