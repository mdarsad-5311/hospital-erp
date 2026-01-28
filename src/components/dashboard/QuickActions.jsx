import React from "react";
import {
  UserPlus,
  CalendarPlus,
  FileText,
  Pill,
  TestTube,
  Receipt,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  {
    label: "New Patient",
    icon: <UserPlus size={20} />,
    href: "/patients/new",
    primary: true,
  },
  {
    label: "Book Appointment",
    icon: <CalendarPlus size={20} />,
    href: "/appointments/new",
  },
  {
    label: "Add Prescription",
    icon: <FileText size={20} />,
    href: "/records/new",
  },
  {
    label: "Dispense Medicine",
    icon: <Pill size={20} />,
    href: "/pharmacy",
  },
  {
    label: "Lab Request",
    icon: <TestTube size={20} />,
    href: "/laboratory/new",
  },
  {
    label: "Generate Bill",
    icon: <Receipt size={20} />,
    href: "/billing/new",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white  bg-gray-200 rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-500">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            to={action.href}
            className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all
              ${
                action.primary
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 dark:bg-gray-400 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500"
              }
            `}
          >
            {action.icon}
            <span>{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
