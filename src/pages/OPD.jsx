import { useState } from "react";
import {
  Users,
  Clock,
  Stethoscope,
  CheckCircle,
  Search,
  Plus,
  Phone,
  FileText,
  MoreVertical,
  Play,
  Timer,
  LayoutGrid,
  List
} from "lucide-react";
import PatientKanban from "../components/opd/PatientKanban";

/* ---------------- TYPES (OPTIONAL) ---------------- */
// You can remove types if not using TypeScript

/* ---------------- MOCK DATA ---------------- */

const patients = [
  {
    id: "1",
    token: 101,
    name: "Rahul Sharma",
    patientId: "PAT-2024-001",
    age: 35,
    gender: "Male",
    phone: "+91 98765 43210",
    department: "General Medicine",
    doctor: "Dr. Anil Kumar",
    visitType: "New",
    status: "in-consultation",
    priority: "normal",
    waitTime: 0,
    symptoms: "Fever, headache",
  },
  {
    id: "2",
    token: 102,
    name: "Priya Patel",
    patientId: "PAT-2024-015",
    age: 28,
    gender: "Female",
    phone: "+91 87654 32109",
    department: "Cardiology",
    doctor: "Dr. Sneha Reddy",
    visitType: "Follow-up",
    status: "waiting",
    priority: "urgent",
    waitTime: 25,
    symptoms: "Chest pain",
  },
  {
    id: "3",
    token: 103,
    name: " Patel",
    patientId: "PAT-2024-015",
    age: 28,
    gender: "Female",
    phone: "+91 87654 32109",
    department: "Cardiology",
    doctor: "Dr. Sneha Reddy",
    visitType: "Follow-up",
    status: "completed",
    priority: "normal",
    waitTime: 25,
    symptoms: "Chest pain",
  },
];

const statusColor = (status) => {
  if (status === "waiting") return "bg-amber-100 text-amber-700";
  if (status === "in-consultation") return "bg-blue-100 text-blue-700";
  if (status === "completed") return "bg-green-100 text-green-700";
  return "bg-gray-100 text-gray-700";
};

const priorityColor = (priority) => {
  if (priority === "emergency") return "bg-red-100 text-red-700";
  if (priority === "urgent") return "bg-orange-100 text-orange-700";
  return "bg-slate-100 text-slate-700";
};

export default function OPD() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState('list');

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      p.token.toString().includes(search)
  );

  return (
    <div className="p-6 space-y-6 h-full flex flex-col">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold">OPD Management</h1>
          <p className="text-gray-500">
            Manage outpatient department queue
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white rounded-lg border p-1 flex">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              title="List View"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={`p-1.5 rounded ${viewMode === 'board' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              title="Board View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
          <button className="bg-white px-5 py-0 rounded-lg flex items-center gap-2 border">
            <FileText size={16} /> Export
          </button>
          <button className="bg-gradient-to-br from-green-600 to-indigo-800 text-white shadow px-5 py-0 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Plus size={16} /> New Registration
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 shrink-0">
        <Stat title="Total Patients" value="12" icon={<Users className="w-7 h-6" />} />
        <Stat title="Waiting" value="5" icon={<Clock className="w-7 h-6" />} />
        <Stat title="In Consultation" value="3" icon={<Stethoscope className="w-7 h-6" />} />
        <Stat title="Completed" value="4" icon={<CheckCircle className="w-7 h-6" />} />
      </div>

      {viewMode === 'list' ? (
        <>
          {/* SEARCH */}
          <div className="bg-white p-4 rounded-lg shadow shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                className="pl-10 bg-gray-200 w-full p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Search by name, patient ID or token"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* PATIENT LIST */}
          <div className="space-y-4 overflow-y-auto">
            {filtered.map((p) => (
              <div
                key={p.id}
                className=" rounded-lg overflow-hidden bg-white shadow-sm border border-transparent hover:border-blue-100 transition-colors"
              >
                <div className="flex">
                  {/* TOKEN */}
                  <div className="w-20 bg-amber-600 flex flex-col items-center justify-center text-white">
                    <span className="text-xs opacity-80">Token</span>
                    <span className="text-xl font-bold">{p.token}</span>
                  </div>

                  {/* INFO */}
                  <div className="flex-1 p-4 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{p.name}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${priorityColor(
                            p.priority
                          )}`}
                        >
                          {p.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {p.patientId} • {p.age} yrs • {p.gender}
                      </p>
                      <p className="text-xs flex items-center gap-1 mt-1 text-gray-500">
                        <Phone size={12} /> {p.phone}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-sm text-right hidden sm:block">
                        <p className="text-gray-400 text-xs">Department</p>
                        <p className="font-medium">{p.department}</p>
                      </div>

                      <span
                        className={`text-xs px-2 py-1 rounded ${statusColor(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>

                      {p.status === "waiting" && (
                        <span className="flex items-center gap-1 text-amber-600 text-sm">
                          <Timer size={14} /> {p.waitTime} min
                        </span>
                      )}

                      <div className="flex gap-2">
                        <button className="bg-gradient-to-br from-green-600 to-indigo-800 text-white shadow px-3 py-1.5 rounded flex items-center gap-1 text-sm hover:bg-blue-700">
                          <Play size={14} /> Start
                        </button>

                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SYMPTOMS */}
                {p.symptoms && (
                  <div className=" px-4 py-2 text-sm text-gray-600 bg-gray-50 border-t">
                    <span className="font-medium">Symptoms:</span> {p.symptoms}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex-1 min-h-0">
          <PatientKanban />
        </div>
      )}
    </div>
  );
}

/* ---------------- STAT CARD ---------------- */
function Stat({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="bg-blue-100 text-blue-600 p-3 rounded">
        {icon}
      </div>
    </div>
  );
}
