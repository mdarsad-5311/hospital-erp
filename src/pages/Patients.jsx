import { useState } from "react";
import {
    Search,
    UserPlus,
    MoreVertical,
    Phone,
    Mail,
    Droplets,
    Filter,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const mockPatients = [
    {
        id: "1",
        patientId: "P-2024-001",
        firstName: "John",
        lastName: "Smith",
        dateOfBirth: "1985-03-15",
        gender: "male",
        phone: "+1 234 567 8900",
        email: "john.smith@email.com",
        bloodGroup: "O+",
        type: "opd",
        status: "active",
    },
    {
        id: "2",
        patientId: "P-2024-002",
        firstName: "Emma",
        lastName: "Wilson",
        dateOfBirth: "1992-07-22",
        gender: "female",
        phone: "+1 234 567 8902",
        email: "emma.wilson@email.com",
        bloodGroup: "A+",
        type: "ipd",
        status: "active",
    },
    {
        id: "3",
        patientId: "P-2024-003",
        firstName: "Michael",
        lastName: "Johnson",
        dateOfBirth: "1978-11-08",
        gender: "male",
        phone: "+1 234 567 8904",
        bloodGroup: "B-",
        type: "opd",
        status: "discharged",
    },
    {
        id: "4",
        patientId: "P-2024-004",
        firstName: "Sophia",
        lastName: "Davis",
        dateOfBirth: "2019-05-30",
        gender: "female",
        phone: "+1 234 567 8906",
        bloodGroup: "AB+",
        type: "ipd",
        status: "critical",
    },
];

const statusColor = {
    active: "bg-green-100 text-green-600",
    discharged: "bg-gray-200 text-gray-600",
    critical: "bg-red-100 text-red-600",
};

/* ---------------- COMPONENT ---------------- */

export default function Patients() {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [showModal, setShowModal] = useState(false);

    const filteredPatients = mockPatients.filter((p) => {
        const matchSearch =
            p.firstName.toLowerCase().includes(search.toLowerCase()) ||
            p.lastName.toLowerCase().includes(search.toLowerCase()) ||
            p.patientId.toLowerCase().includes(search.toLowerCase());

        const matchTab =
            activeTab === "all" ||
            p.type === activeTab ||
            (activeTab === "critical" && p.status === "critical");

        return matchSearch && matchTab;
    });

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Patients</h1>
                    <p className="text-gray-500">
                        Manage patient registrations and records
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-br from-green-600 to-indigo-800 text-white shado text-white px-4 py-2 rounded-lg"
                >
                    <UserPlus size={18} />
                    Register Patient
                </button>
            </div>

            {/* SEARCH */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or patient ID..."
                        className="w-full pl-9 pr-3 py-2 border rounded-lg"
                    />
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                    <Filter size={16} />
                    Filters
                </button>
            </div>

            {/* TABS */}
            <div className="flex gap-2">
                {["all", "opd", "ipd", "critical"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === tab
                            ? "bg-gradient-to-br from-green-600 to-indigo-800 text-white shadow"
                            : "bg-gradient-to-br from-green-300 to-indigo-500 text-white shadow"
                            }`}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Patient</th>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Contact</th>
                            <th className="p-3 text-left">Blood</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredPatients.map((p) => (
                            <tr key={p.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                                            {p.firstName[0]}
                                            {p.lastName[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {p.firstName} {p.lastName}
                                            </p>
                                            <p className="text-xs text-gray-500 capitalize">
                                                {p.gender}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="p-3 font-mono">{p.patientId}</td>

                                <td className="p-3">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1">
                                            <Phone size={12} /> {p.phone}
                                        </div>
                                        {p.email && (
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Mail size={12} /> {p.email}
                                            </div>
                                        )}
                                    </div>
                                </td>

                                <td className="p-3">
                                    {p.bloodGroup && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded-full">
                                            <Droplets size={12} />
                                            {p.bloodGroup}
                                        </span>
                                    )}
                                </td>

                                <td className="p-3">
                                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                                        {p.type.toUpperCase()}
                                    </span>
                                </td>

                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${statusColor[p.status]}`}
                                    >
                                        {p.status}
                                    </span>
                                </td>

                                <td className="p-3 text-right">
                                    <button className="p-2 hover:bg-gray-100 rounded">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">
                            Register New Patient
                        </h2>

                        <input
                            placeholder="First Name"
                            className="w-full border p-2 rounded mb-3"
                        />
                        <input
                            placeholder="Last Name"
                            className="w-full border p-2 rounded mb-3"
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
                                    alert("Patient registered ✅");
                                    setShowModal(false);
                                }}
                                className="px-4 py-2 bg-gradient-to-br from-green-600 to-indigo-800 text-white shadow text-white rounded"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
