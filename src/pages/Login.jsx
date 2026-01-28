import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Activity, Mail, Lock, Shield } from "lucide-react";

const roles = [
  { value: "admin", label: "Administrator" },
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "receptionist", label: "Receptionist" },
  { value: "pharmacist", label: "Pharmacist" },
  { value: "lab_technician", label: "Lab Technician" },
  { value: "accountant", label: "Accountant" },
];

export default function Login() {
  const [email, setEmail] = useState("admin@hospital.com");
  const [password, setPassword] = useState("password");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password, role);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-12">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center">
            <Activity size={40} />
          </div>
          <h1 className="text-4xl font-bold">MediCare ERP</h1>
          <p className="text-white/80">
            Complete hospital management solution
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              ["Active Patients", "2,847"],
              ["Daily Appointments", "156"],
              ["Staff Members", "234"],
              ["Departments", "12"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-white/10 rounded-xl p-4"
              >
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm opacity-80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:hidden">
            <div className="w-16 h-16 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center">
              <Activity size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold mt-3">MediCare ERP</h1>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
            <p className="text-gray-500 text-center mb-6">
              Sign in to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* ROLE */}
              <div>
                <label className="text-sm font-medium">Login as</label>
                <div className="relative mt-1">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {roles.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-4 text-xs text-center text-gray-500 bg-gray-100 p-3 rounded">
              Demo: Select any role and click Sign In
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
