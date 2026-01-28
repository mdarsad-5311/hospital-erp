import { useState } from "react";

export default function IPDReportsDialog({ open, onClose }) {
  const [dateRange, setDateRange] = useState("Today");
  const [ward, setWard] = useState("All Wards");
  const [format, setFormat] = useState("PDF");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-5xl rounded-2xl bg-white shadow-lg p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">IPD Reports & Analytics</h2>
          <p className="text-sm text-gray-500">
            Generate and export detailed IPD reports
          </p>
        </div>

        {/* Report Type */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            "Bed Occupancy Report",
            "Admission Report",
            "Discharge Summary",
            "Ward-wise Report",
          ].map((item, i) => (
            <div
              key={i}
              className={`border rounded-xl p-4 text-center cursor-pointer
              ${i === 0 ? "border-emerald-500 bg-emerald-50" : "hover:bg-gray-50"}`}
            >
              <p className="text-sm font-medium">{item}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="text-sm text-gray-600">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            >
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Ward</label>
            <select
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            >
              <option>All Wards</option>
              <option>ICU</option>
              <option>General Ward</option>
              <option>Private Ward</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Export Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            >
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
        </div>

        {/* Report Preview */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Report Preview</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-emerald-600">18</p>
              <p className="text-sm text-gray-500">Total Beds</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">8</p>
              <p className="text-sm text-gray-500">Occupied</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">7</p>
              <p className="text-sm text-gray-500">Available</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-500">44%</p>
              <p className="text-sm text-gray-500">Occupancy Rate</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm text-gray-600 mb-1">Overall Occupancy</p>
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div className="h-2 w-[44%] bg-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button className="border rounded-lg px-4 py-2 text-gray-600">
            🖨 Print
          </button>
          <button className="bg-emerald-600 text-white rounded-lg px-5 py-2 hover:bg-emerald-700">
            ⬇ Export Report
          </button>
        </div>
      </div>
    </div>
  );
}
