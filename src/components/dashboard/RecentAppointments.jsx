import React from "react";
import { Clock } from "lucide-react";

const appointments = [
  {
    id: "1",
    patientName: "John Smith",
    doctorName: "Dr. Michael Chen",
    department: "Cardiology",
    time: "09:00 AM",
    date: "Today",
    status: "in-progress",
  },
  {
    id: "2",
    patientName: "Emma Wilson",
    doctorName: "Dr. Sarah Johnson",
    department: "Neurology",
    time: "10:30 AM",
    date: "Today",
    status: "scheduled",
  },
  {
    id: "3",
    patientName: "James Brown",
    doctorName: "Dr. Lisa Anderson",
    department: "Orthopedics",
    time: "11:00 AM",
    date: "Today",
    status: "scheduled",
  },
  {
    id: "4",
    patientName: "Sophia Davis",
    doctorName: "Dr. Robert Taylor",
    department: "Pediatrics",
    time: "02:00 PM",
    date: "Today",
    status: "scheduled",
  },
];

const statusStyles = {
  "in-progress": "bg-blue-100 text-blue-600 border border-blue-200",
  scheduled: "bg-yellow-100 text-yellow-600 border border-yellow-200",
  completed: "bg-green-100 text-green-600 border border-green-200",
  cancelled: "bg-red-100 text-red-600 border border-red-200",
};

export default function RecentAppointments() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-500">
          Today’s Appointments
        </h2>
        <span className="text-sm px-3 py-1 rounded-full border text-gray-600 dark:text-gray-500">
          {appointments.length} scheduled
        </span>
      </div>

      {/* List */}
      <div className="space-y-4">
        {appointments.map((appointment) => {
          const initials = appointment.patientName
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <div
              key={appointment.id}
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-200 transition"
            >
              {/* Avatar */}
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                {initials}
              </div>

              {/* Patient Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 dark:text-gray-500 truncate">
                  {appointment.patientName}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {appointment.doctorName} • {appointment.department}
                </p>
              </div>

              {/* Time + Status */}
              <div className="text-right space-y-1">
                <div className="flex items-center gap-1 text-sm text-gray-500 justify-end">
                  <Clock size={14} />
                  {appointment.time}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full capitalize ${statusStyles[appointment.status]}`}
                >
                  {appointment.status.replace("-", " ")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
