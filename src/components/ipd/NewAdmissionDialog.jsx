import { useState } from "react";
import {
    User,
    Stethoscope,
    Bed,
    FileText,
    Check,
    ChevronLeft,
    ChevronRight,
    Search,
} from "lucide-react";

const steps = [
    { id: 1, title: "Patient Info", icon: User },
    { id: 2, title: "Medical Details", icon: Stethoscope },
    { id: 3, title: "Bed Assignment", icon: Bed },
    { id: 4, title: "Review", icon: FileText },
];

const mockPatients = [
    { id: "PAT-001", name: "Rajesh Kumar", age: 58, gender: "Male" },
    { id: "PAT-002", name: "Meera Sharma", age: 45, gender: "Female" },
];

const doctors = ["Dr. Sneha Reddy", "Dr. Anil Kumar", "Dr. Priya Singh"];

export default function NewAdmission({ open, onClose, availableBeds = [] }) {
    const [step, setStep] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [newPatient, setNewPatient] = useState(false);

    const [form, setForm] = useState({
        name: "",
        age: "",
        gender: "",
        diagnosis: "",
        doctor: "",
        bed: "",
    });

    if (!open) return null;

    const filteredPatients = mockPatients.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6">

                {/* HEADER */}
                <h2 className="text-xl font-semibold">New Patient Admission</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Complete the admission process for a new inpatient
                </p>

                {/* STEPS */}
                <div className="flex justify-between mb-8">
                    {steps.map((s, i) => (
                        <div key={s.id} className="flex items-center">
                            <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center
                ${step >= s.id ? "bg-emerald-600 text-white" : "bg-gray-200"}`}
                            >
                                {step > s.id ? <Check size={18} /> : <s.icon size={18} />}
                            </div>
                            <span className="ml-2 text-sm font-medium">{s.title}</span>
                            {i < 3 && <div className="w-12 h-px bg-gray-300 mx-3" />}
                        </div>
                    ))}
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        {!newPatient ? (
                            <>
                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        className="w-full pl-10 border rounded-lg px-3 py-2"
                                        placeholder="Search patient..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {filteredPatients.map((p) => (
                                        <div
                                            key={p.id}
                                            onClick={() => setSelectedPatient(p)}
                                            className={`p-3 border rounded-lg cursor-pointer
                      ${selectedPatient?.id === p.id && "border-emerald-600 bg-emerald-50"}`}
                                        >
                                            <p className="font-medium">{p.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {p.age} yrs • {p.gender}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="mt-4 text-emerald-600"
                                    onClick={() => setNewPatient(true)}
                                >
                                    + Register New Patient
                                </button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    placeholder="Full Name"
                                    className="border p-2 rounded"
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                                <input
                                    placeholder="Age"
                                    className="border p-2 rounded"
                                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                                />
                                <select
                                    className="border p-2 rounded"
                                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                                >
                                    <option>Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        )}
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            placeholder="Diagnosis"
                            className="border p-2 rounded col-span-2"
                            onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                        />
                        <select
                            className="border p-2 rounded"
                            onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                        >
                            <option>Select Doctor</option>
                            {doctors.map((d) => (
                                <option key={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <div className="grid grid-cols-2 gap-4">
                        {availableBeds.map((b) => (
                            <div
                                key={b.id}
                                onClick={() => setForm({ ...form, bed: b.bedNumber })}
                                className={`p-4 border rounded cursor-pointer
                ${form.bed === b.bedNumber && "border-emerald-600 bg-emerald-50"}`}
                            >
                                <p className="font-medium">{b.bedNumber}</p>
                                <p className="text-sm text-gray-500">{b.ward}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <p><b>Name:</b> {selectedPatient?.name || form.name}</p>
                        <p><b>Diagnosis:</b> {form.diagnosis}</p>
                        <p><b>Doctor:</b> {form.doctor}</p>
                        <p><b>Bed:</b> {form.bed}</p>
                    </div>
                )}

                {/* FOOTER */}
                <div className="flex justify-between mt-6">
                    <button
                        className="border px-4 py-2 rounded"
                        onClick={() => (step === 1 ? onClose() : setStep(step - 1))}
                    >
                        <ChevronLeft size={16} className="inline" /> Back
                    </button>

                    <button
                        className="bg-gradient-to-br from-green-600 to-indigo-800 shadow text-white px-4 py-2 rounded"
                        onClick={() => (step === 4 ? onClose() : setStep(step + 1))}
                    >
                        Next <ChevronRight size={16} className="inline" />
                    </button>
                </div>
            </div>
        </div>
    );
}
