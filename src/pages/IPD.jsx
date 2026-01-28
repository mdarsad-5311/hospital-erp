import { useState } from "react";
import IPDReportsDialog from "../components/ipd/IPDReportsDialog"
import NewAdmissionDialog from "../components/ipd/NewAdmissionDialog"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Bed,
  Users,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Plus,
  Building2,
  Search,
} from "lucide-react";

/* ================= MOCK DATA ================= */

const icuBeds = [
  { id: 1, bed: "ICU-01", status: "occupied", patient: "Rajesh Kumar", critical: true },
  { id: 2, bed: "ICU-02", status: "occupied", patient: "Meera Sharma" },
  { id: 3, bed: "ICU-03", status: "available" },
  { id: 4, bed: "ICU-04", status: "maintenance" },
  { id: 5, bed: "ICU-05", status: "reserved" },
  { id: 6, bed: "ICU-06", status: "available" },
];

const wardsData = [
  {
    name: "General Ward A",
    beds: [
      { id: 7, bed: "GW-A01", status: "occupied", patient: "Amit Patel" },
      { id: 8, bed: "GW-A02", status: "occupied", patient: "Sunita Devi" },
      { id: 9, bed: "GW-A03", status: "available" },
      { id: 10, bed: "GW-A04", status: "available" },
      { id: 11, bed: "GW-A05", status: "occupied", patient: "Ravi Shankar" },
      { id: 12, bed: "GW-A06", status: "available" },
    ],
  },
  {
    name: "Private Wing",
    beds: [
      { id: 13, bed: "PVT-101", status: "occupied", patient: "Vikram Malhotra" },
      { id: 14, bed: "PVT-102", status: "available" },
      { id: 15, bed: "PVT-103", status: "occupied", patient: "Kavita Reddy" },
      { id: 16, bed: "PVT-104", status: "reserved" },
    ],
  },
  {
    name: "CCU",
    beds: [
      { id: 17, bed: "CCU-01", status: "occupied", patient: "Suresh Babu", critical: true },
      { id: 18, bed: "CCU-02", status: "available" },
    ],
  },
];

const admittedPatients = [
  { id: 1, name: "Rajesh Kumar", age: 58, gender: "Male", bed: "ICU-01", ward: "ICU" },
  { id: 2, name: "Meera Sharma", age: 45, gender: "Female", bed: "ICU-02", ward: "ICU" },
  { id: 3, name: "Amit Patel", age: 32, gender: "Male", bed: "GW-A01", ward: "General Ward A" },
];
/* ================= MAIN COMPONENT ================= */

export default function IPD() {
  const [activeTab, setActiveTab] = useState("beds");
  const [search, setSearch] = useState("");
  const [selectedWard, setSelectedWard] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [reportsDialogOpen, setReportsDialogOpen] = useState(false);
  const [admissionDialogOpen, setAdmissionDialogOpen] = useState(false);

  const stats = {
    totalBeds: 18,
    occupied: 8,
    available: 7,
    critical: 2,
  };

  const occupancy = Math.round((stats.occupied / stats.totalBeds) * 100);

  // FILTER FUNCTION
  const filterBeds = (beds, wardName) =>
    beds.filter((bed) => {
      const matchSearch =
        bed.bed.toLowerCase().includes(search.toLowerCase()) ||
        (bed.patient && bed.patient.toLowerCase().includes(search.toLowerCase()));

      const matchWard = selectedWard === "All" || wardName === selectedWard;
      const matchStatus = selectedStatus === "All" || bed.status === selectedStatus;

      return matchSearch && matchWard && matchStatus;
    });

  const filterPatients = (patients) =>
    patients.filter(
      (p) =>
        (p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.bed.toLowerCase().includes(search.toLowerCase())) &&
        (selectedWard === "All" || p.ward === selectedWard)
    );

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {
        reportsDialogOpen && (
          <IPDReportsDialog
            open={reportsDialogOpen}
            onClose={() => setReportsDialogOpen(false)}
          />
        )
      }
      {
        admissionDialogOpen && (
          <NewAdmissionDialog
            open={admissionDialogOpen}
            onClose={() => setAdmissionDialogOpen(false)}
          />
        )
      }
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">IPD & Bed Management</h1>
          <p className="text-gray-500">Manage inpatient admissions & beds</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setReportsDialogOpen(true)}
            className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium
                   hover:bg-gray-100 transition"
          >
            <BarChart3 className="h-4 w-4" />
            Reports
          </button>
          <button
            onClick={() => setAdmissionDialogOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            <Plus size={16} />
            New Admission
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Beds</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalBeds}
                </p>
              </div>

              <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Bed className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-500/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Occupied
                </p>

                <p className="text-3xl font-bold text-blue-700">
                  {stats.occupied}
                </p>

                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {occupancy}% occupancy
                </p>
              </div>

              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-500/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Available
                </p>

                <p className="text-3xl font-bold text-foreground">
                  {stats.available}
                </p>

                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  Ready for admission
                </p>
              </div>

              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-500/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Critical Patients
                </p>

                <p className="text-3xl font-bold text-foreground">
                  {stats.critical}
                </p>

                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  Requires attention
                </p>
              </div>

              <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* TABS */}
      <div className="border-b flex gap-6">
        <TabButton label="Bed Map" active={activeTab === "beds"} onClick={() => setActiveTab("beds")} />
        <TabButton label="Ward Overview" active={activeTab === "wards"} onClick={() => setActiveTab("wards")} />
        <TabButton label="Admitted Patients" active={activeTab === "patients"} onClick={() => setActiveTab("patients")} />
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-col gap-4 items-center">
        <div className="flex w-full gap-4 border-b pb-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search beds or patients..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg"
            />
          </div>
          <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} className="bg-gray-100 rounded-lg px-3 py-2 w-40">
            <option value="All">All Wards</option>
            <option value="ICU">ICU</option>
            <option value="General Ward A">General Ward A</option>
            <option value="Private Wing">Private Wing</option>
            <option value="CCU">CCU</option>
          </select>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="bg-gray-100 rounded-lg px-3 py-2 w-40">
            <option value="All">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
        {/* LEGEND */}
        <div className="flex gap-6 text-sm self-start">
          <Legend color="bg-emerald-500" label="Available" />
          <Legend color="bg-blue-500" label="Occupied" />
          <Legend color="bg-amber-500" label="Maintenance" />
          <Legend color="bg-purple-500" label="Reserved" />
        </div>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "beds" && (
        <div className="space-y-6">
          <WardSection title="ICU" beds={filterBeds(icuBeds.map(b => ({ ...b, bed: b.bed })), "ICU")} />
          {wardsData.map((ward) => (
            <WardSection key={ward.name} title={ward.name} beds={filterBeds(ward.beds, ward.name)} />
          ))}
        </div>
      )}

      {activeTab === "wards" && (
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h2 className="font-semibold text-lg mb-3">Ward Overview</h2>
          <p className="text-gray-500 text-sm">Summary of all wards will be displayed here.</p>
        </div>
      )}

      {activeTab === "patients" && (
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h2 className="font-semibold text-lg mb-3">Admitted Patients</h2>
          <table className="w-full text-sm">
            <thead className="text-left border-b">
              <tr>
                <th className="pb-2">Name</th>
                <th className="pb-2">Age</th>
                <th className="pb-2">Gender</th>
                <th className="pb-2">Bed</th>
                <th className="pb-2">Ward</th>
              </tr>
            </thead>
            <tbody>
              {filterPatients(admittedPatients).map(p => (
                <tr key={p.id} className="border-b">
                  <td className="py-1">{p.name}</td>
                  <td className="py-1">{p.age}</td>
                  <td className="py-1">{p.gender}</td>
                  <td className="py-1">{p.bed}</td>
                  <td className="py-1">{p.ward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


/* ================= COMPONENTS ================= */

function WardSection({ title, beds }) {
  if (beds.length === 0) return null;
  const available = beds.filter(b => b.status === "available").length;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">🏥 {title}</h2>
        <span className="text-sm text-gray-500">{available} / {beds.length} available</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {beds.map((bed) => (
          <BedCard key={bed.id} bed={bed} />
        ))}
      </div>
    </div>
  );
}

function BedCard({ bed }) {
  const style = {
    available: "border-emerald-300 bg-emerald-50",
    occupied: "border-blue-300 bg-blue-50",
    maintenance: "border-amber-300 bg-amber-50",
    reserved: "border-purple-300 bg-purple-50",
  };

  return (
    <div className={`relative border rounded-xl p-4 text-center ${style[bed.status]}`}>
      <span className={`absolute top-2 right-2 w-3 h-3 rounded-full ${bed.status === "available" ? "bg-emerald-500" :
        bed.status === "occupied" ? "bg-blue-500" :
          bed.status === "maintenance" ? "bg-amber-500" : "bg-purple-500"
        }`} />
      {bed.critical && <AlertTriangle className="absolute top-2 left-2 text-red-500" size={14} />}
      <Bed className="mx-auto mb-2" />
      <p className="font-semibold text-sm">{bed.bed}</p>
      {bed.patient && <p className="text-xs text-gray-500 truncate">{bed.patient}</p>}
    </div>
  );
}

function StatCard({ title, value, icon, subtitle }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm flex justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">{icon}</div>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`pb-3 border-b-2 text-sm font-medium ${active ? "border-emerald-600 text-emerald-600" : "border-transparent text-gray-500"}`}>
      {label}
    </button>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-4 h-4 rounded ${color}`} />
      {label}
    </div>
  );
}
