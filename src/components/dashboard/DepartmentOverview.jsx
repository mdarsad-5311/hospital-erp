import React from "react";

const departments = [
  { name: "Cardiology", patients: 45, capacity: 60, color: "bg-blue-600" },
  { name: "Neurology", patients: 32, capacity: 40, color: "bg-sky-500" },
  { name: "Orthopedics", patients: 28, capacity: 35, color: "bg-green-600" },
  { name: "Pediatrics", patients: 38, capacity: 50, color: "bg-yellow-500" },
  { name: "Emergency", patients: 15, capacity: 20, color: "bg-red-600" },
];

export default function DepartmentOverview() {
  return (
    <div className="bg-white  bg-gray-200 rounded-2xl shadow-md p-6 w-full">
      <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-500">
        Department Occupancy
      </h2>

      <div className="space-y-5">
        {departments.map((dept) => {
          const percentage = Math.round(
            (dept.patients / dept.capacity) * 100
          );

          return (
            <div key={dept.name}>
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-500">
                  {dept.name}
                </span>
                <span className="text-sm text-gray-500">
                  {dept.patients}/{dept.capacity} beds
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${dept.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
