import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"
import DashboardLayout from "./components/layout/DashboardLayout";
import Index from "./pages/Index"
import { CommandPalette } from "./components/ui/command-palette";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Patients from "./pages/Patients"
import Appointments from "./pages/Appointments"
import OPD from "./pages/OPD"
import IPD from "./pages/IPD"
import MedicalRecords from "./pages/MedicalRecords"

import Laboratory from "./pages/Laboratory";
import Pharmacy from "./pages/pharmacy"
import Billing from "./pages/Billing";
import Departments from "./pages/Departments";
import Staff from "./pages/Staff";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound"
const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CommandPalette />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/patients/new" element={<Patients />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/appointments/new" element={<Appointments />} />
              <Route path="/opd" element={<OPD />} />
              <Route path="/ipd" element={<IPD />} />
              <Route path="/records" element={<MedicalRecords />} />
              <Route path="/records/new" element={<Dashboard />} />
              <Route path="/pharmacy" element={<Pharmacy />} />
              <Route path="/laboratory" element={<Laboratory />} />
              <Route path="/laboratory/new" element={<Dashboard />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/billing/new" element={<Dashboard />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
