import { useState } from "react";
import Button from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger }
    from '../components/ui/dropdown-menu';

import { AddRecordDialog } from "../components/records/AddRecordDialog";
import { ExportRecordsDialog } from '../components/records/ExportRecordsDialog';
import { NewPatientDialog } from '../components/records/NewPatientDialog';
import {
    FileText,
    Search,
    Filter,
    Plus,
    User,
    Calendar,
    Stethoscope,
    Pill,
    FlaskConical,
    Heart,
    Activity,
    FileImage,
    Download,
    Eye,
    Clock,
    AlertCircle,
    TrendingUp,
    Thermometer,
    Droplets,
    Wind,
    UserPlus,
    Printer,
    Share2,
    MoreVertical,
    Edit,
    Trash2
} from 'lucide-react';

/* ================== DATA ================== */

const patients = [
    {
        id: 1,
        name: "John Smith",
        pid: "PT-2024-001",
        age: 45,
        gender: "male",
        blood: "O+",
        lastVisit: "2024-01-15",
        conditions: ["Hypertension", "Diabetes Mellitus"],
        allergies: ["Penicillin", "Sulfa drugs"]
    },
    {
        id: 2,
        name: "Sarah Johnson",
        pid: "PT-2024-002",
        age: 32,
        gender: "female",
        blood: "A+",
        lastVisit: "2024-01-14",
        conditions: ["Chronic Migraine"],
        allergies: []
    },
    {
        id: 3,
        name: "Michael Brown",
        pid: "PT-2024-003",
        age: 58,
        gender: "male",
        blood: "B-",
        lastVisit: "2024-01-13",
        conditions: ["CAD", "High Cholesterol"],
        allergies: []
    }
];

const diagnoses = [
    {
        id: 1,
        title: "Hypertension - Stage 2",
        severity: "moderate",
        status: "ongoing",
        description:
            "Blood pressure consistently elevated. Medication adjusted.",
        doctor: "Dr. Michael Chen",
        department: "Cardiology",
        date: "2024-01-15"
    },
    {
        id: 2,
        title: "Type 2 Diabetes Mellitus",
        severity: "moderate",
        status: "ongoing",
        description:
            "HbA1c levels improving with current medication regimen.",
        doctor: "Dr. Sarah Wilson",
        department: "Endocrinology",
        date: "2024-01-10"
    },
    {
        id: 3,
        title: "Upper Respiratory Infection",
        severity: "mild",
        status: "resolved",
        description:
            "Completed antibiotic course. Symptoms resolved.",
        doctor: "Dr. James Lee",
        department: "General Medicine",
        date: "2023-12-20"
    }
];

/* ================== COMPONENT ================== */

export default function MedicalRecords() {
    const [selectedPatient, setSelectedPatient] = useState(patients[0]);
    const [search, setSearch] = useState("");
    const handlePrintRecord = () => {
        window.print();
    };
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const handleShareRecord = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Medical Record",
                    text: "Patient medical record",
                    url: window.location.href, // optional
                });
            } catch (error) {
                console.error("Share cancelled or failed", error);
            }
        } else {
            alert("Sharing is not supported on this browser");
        }
    };
    return (
        <div className="min-h-screen bg-slate-50 p-6">
            {/* ================= HEADER ================= */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Medical Records
                    </h1>
                    <p className="text-sm text-gray-500">
                        Comprehensive patient health records and history
                    </p>
                </div>

                
                <div className="flex items-center gap-2 flex-wrap">
                    <Button variant="outline" className="gap-2" onClick={handlePrintRecord}>
                        <Printer className="h-4 w-4" />
                        <span className="hidden sm:inline">Print</span>
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={() => setExportDialogOpen(true)}>
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Export</span>
                    </Button>
                    <ExportRecordsDialog
                        open={exportDialogOpen}
                        onOpenChange={setExportDialogOpen}
                        patientName={selectedPatient.name}
                        patientId={selectedPatient.id}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                New Record
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => setNewPatientDialogOpen(true)} className="gap-2">
                                <UserPlus className="h-4 w-4" />
                                New Patient
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setAddRecordDialogOpen(true)} className="gap-2">
                                <Stethoscope className="h-4 w-4" />
                                Add Diagnosis
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setAddRecordDialogOpen(true)} className="gap-2">
                                <Pill className="h-4 w-4" />
                                Add Prescription
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setAddRecordDialogOpen(true)} className="gap-2">
                                <FlaskConical className="h-4 w-4" />
                                Add Lab Result
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setAddRecordDialogOpen(true)} className="gap-2">
                                <Activity className="h-4 w-4" />
                                Add Vitals
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* ================= MAIN GRID ================= */}
            <div className="grid grid-cols-12 gap-6">
                {/* ================= LEFT : PATIENT LIST ================= */}
                <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow">
                    <div className="p-4 border-b">
                        <h3 className="font-semibold flex items-center gap-2">
                            <User size={18} /> Patient List
                        </h3>

                        <div className="flex gap-2 mt-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search patients..."
                                    className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <button className="border px-3 rounded-lg hover:bg-gray-100">
                                <Filter size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="p-4 space-y-3">
                        {patients
                            .filter((p) =>
                                p.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((patient) => (
                                <div
                                    key={patient.id}
                                    onClick={() => setSelectedPatient(patient)}
                                    className={`p-4 rounded-xl border cursor-pointer transition ${selectedPatient.id === patient.id
                                        ? "bg-emerald-50 border-emerald-300"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <div className="flex gap-3">
                                        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center font-semibold text-emerald-700">
                                            {patient.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {patient.name}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                {patient.pid} • {patient.age}y • {patient.gender}
                                            </p>

                                            <div className="flex gap-2 mt-2 items-center">
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                                    {patient.blood}
                                                </span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {patient.lastVisit}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {patient.conditions.map((c) => (
                                            <span
                                                key={c}
                                                className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"
                                            >
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* ================= RIGHT : DETAILS ================= */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* ================= SUMMARY ================= */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex flex-wrap justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {selectedPatient.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {selectedPatient.pid} • {selectedPatient.age} years •{" "}
                                    {selectedPatient.gender}
                                </p>
                            </div>


                            <div className="flex gap-2 flex-wrap">
                                <Button variant="outline" size="sm" className="gap-2" onClick={() => setExportDialogOpen(true)}>
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button>
                                <ExportRecordsDialog
                                    open={exportDialogOpen}
                                    onOpenChange={setExportDialogOpen}
                                    patientName={selectedPatient.name}
                                    patientId={selectedPatient.id}
                                />
                                <Button variant="outline" size="sm" className="gap-2" onClick={handleShareRecord}>
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </Button>
                                <Button size="sm" className="gap-2" onClick={() => setAddRecordDialogOpen(true)}>
                                    <Plus className="h-4 w-4" />
                                    Add Record
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <Stat label="Blood Group" value={selectedPatient.blood} red />
                            <Stat label="Last Visit" value={selectedPatient.lastVisit} />
                            <Stat
                                label="Active Conditions"
                                value={selectedPatient.conditions.length}
                                yellow
                            />
                            <Stat
                                label="Allergies"
                                value={selectedPatient.allergies.length}
                                red
                            />
                        </div>

                        {selectedPatient.allergies.length > 0 && (
                            <div className="mt-4 border border-red-200 bg-red-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-red-600 mb-2">
                                    <AlertCircle size={16} />
                                    <span className="font-medium">Known Allergies</span>
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    {selectedPatient.allergies.map((a) => (
                                        <span
                                            key={a}
                                            className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700"
                                        >
                                            {a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ================= DIAGNOSIS HISTORY ================= */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">
                                Diagnosis History
                            </h3>
                            <select className="border rounded-lg px-3 py-1 text-sm">
                                <option>All</option>
                                <option>Ongoing</option>
                                <option>Resolved</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            {diagnoses.map((d) => (
                                <div
                                    key={d.id}
                                    className="border rounded-xl p-4 flex justify-between gap-4"
                                >
                                    <div>
                                        <div className="flex flex-wrap gap-2 items-center mb-1">
                                            <h4 className="font-medium text-gray-900">
                                                {d.title}
                                            </h4>

                                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                                                {d.severity}
                                            </span>

                                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                                                {d.status}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600">
                                            {d.description}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-2">
                                            {d.doctor} • {d.department} • {d.date}
                                        </p>
                                    </div>

                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ================== SMALL COMPONENT ================== */

function Stat({ label, value, red, yellow }) {
    return (
        <div className="border rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">{label}</p>
            <p
                className={`text-lg font-semibold ${red
                    ? "text-red-600"
                    : yellow
                        ? "text-yellow-600"
                        : "text-gray-900"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}
