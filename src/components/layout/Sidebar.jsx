import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  Pill,
  TestTube,
  Receipt,
  Settings,
  Building2,
  ClipboardList,
  UserCog,
  LogOut,
  ChevronLeft,
  Activity,
  BedDouble,
  FileText,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} />, roles: ["admin","doctor","nurse","receptionist","pharmacist","lab_technician","accountant"] },
  { label: "Patients", href: "/patients", icon: <Users size={20} />, roles: ["admin","doctor","nurse","receptionist"] },
  { label: "Appointments", href: "/appointments", icon: <Calendar size={20} />, roles: ["admin","doctor","nurse","receptionist"] },
  { label: "OPD", href: "/opd", icon: <Stethoscope size={20} />, roles: ["admin","doctor","nurse","receptionist"] },
  { label: "IPD / Beds", href: "/ipd", icon: <BedDouble size={20} />, roles: ["admin","doctor","nurse"] },
  { label: "Medical Records", href: "/records", icon: <FileText size={20} />, roles: ["admin","doctor","nurse"] },
  { label: "Pharmacy", href: "/pharmacy", icon: <Pill size={20} />, roles: ["admin","pharmacist"] },
  { label: "Laboratory", href: "/laboratory", icon: <TestTube size={20} />, roles: ["admin","lab_technician","doctor"] },
  { label: "Billing", href: "/billing", icon: <Receipt size={20} />, roles: ["admin","accountant","receptionist"] },
  { label: "Departments", href: "/departments", icon: <Building2 size={20} />, roles: ["admin"] },
  { label: "Staff", href: "/staff", icon: <UserCog size={20} />, roles: ["admin"] },
  { label: "Reports", href: "/reports", icon: <ClipboardList size={20} />, roles: ["admin","accountant"] },
  { label: "Settings", href: "/settings", icon: <Settings size={20} />, roles: ["admin"] },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-blue-900 text-gray-100 flex flex-col z-50 transition-all duration-300 ${
        collapsed ? "w-20" : "w-70"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Activity size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold">MediCare</h1>
              <p className="text-xs text-gray-400">Hospital ERP</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-800"
        >
          <ChevronLeft
            size={20}
            className={`transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-300 hover:bg-blue-800 hover:text-white"
                    }`}
                >
                  {item.icon}
                  {!collapsed && (
                    <span className="font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-gray-800">
        {!collapsed && user && (
          <div className="mb-3">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-xs text-gray-400 capitalize">
              {user.role.replace("_", " ")}
            </p>
          </div>
        )}

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
