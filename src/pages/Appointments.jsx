import { useState } from "react";
import {
  Search,
  CalendarPlus,
  Clock,
  Stethoscope,
  Building2,
  CheckCircle2,
  XCircle,
  PlayCircle,
} from "lucide-react";

/* Mock Data */
const mockAppointments = [
  {
    id: "1",
    patientName: "John Smith",
    doctorName: "Dr. Michael Chen",
    department: "Cardiology",
    date: "2024-01-22",
    time: "09:00 AM",
    status: "in-progress",
    type: "consultation",
  },
  {
    id: "2",
    patientName: "Emma Wilson",
    doctorName: "Dr. Sarah Johnson",
    department: "Neurology",
    date: "2024-01-22",
    time: "10:30 AM",
    status: "scheduled",
    type: "follow-up",
  },
  {
    id: "3",
    patientName: "Michael Johnson",
    doctorName: "Dr. Lisa Anderson",
    department: "Orthopedics",
    date: "2024-01-22",
    time: "11:00 AM",
    status: "completed",
    type: "consultation",
  },
  {
    id: "4",
    patientName: "Sophia Davis",
    doctorName: "Dr. Robert Taylor",
    department: "Pediatrics",
    date: "2024-01-22",
    time: "02:00 PM",
    status: "cancelled",
    type: "emergency",
  },
];

const statusStyles = {
  "in-progress": {
    icon: PlayCircle,
    class: "bg-blue-100 text-blue-600",
  },
  scheduled: {
    icon: Clock,
    class: "bg-yellow-100 text-yellow-600",
  },
  completed: {
    icon: CheckCircle2,
    class: "bg-green-100 text-green-600",
  },
  cancelled: {
    icon: XCircle,
    class: "bg-red-100 text-red-600",
  },
};

export default function Appointments() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-gray-500">
            Schedule and manage patient appointments
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <CalendarPlus size={18} />
          Book Appointment
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-64">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search appointments..."
          className="w-full pl-9 pr-3 py-2 bg-gray-200 rounded-lg"
        />
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {mockAppointments.map((a) => {
          const StatusIcon = statusStyles[a.status].icon;
          return (
            <div
              key={a.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-white shadow hover:shadow-md transition"
            >
              {/* Avatar */}
              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                {a.patientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{a.patientName}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                    {a.type}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Stethoscope size={14} />
                    {a.doctorName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 size={14} />
                    {a.department}
                  </span>
                </div>
              </div>

              {/* Time & Status */}
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm mb-1">
                  <Clock size={14} />
                  {a.time}
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${statusStyles[a.status].class}`}
                >
                  <StatusIcon size={12} />
                  {a.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-lg font-semibold">Book Appointment</h2>

            <input
              className="w-full border p-2 rounded"
              placeholder="Patient Name"
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Doctor Name"
            />
            <input type="date" className="w-full border p-2 rounded" />
            <input
              className="w-full border p-2 rounded"
              placeholder="Time"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Appointment booked ✅");
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
