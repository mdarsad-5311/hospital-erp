import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  variant = "primary",
}) {
  const variantStyles = {
    primary: "bg-blue-100 text-blue-600",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
    info: "bg-sky-100 text-sky-600",
  };

  const changeStyles = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-500",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 transition hover:shadow-lg">
      <div className="flex items-start justify-between">
        {/* Left Content */}
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-1 text-gray-800 dark:text-gray-500">
            {value}
          </p>

          {change && (
            <div className="flex items-center gap-1 mt-2">
              {changeType === "positive" && (
                <TrendingUp size={14} className="text-green-600" />
              )}
              {changeType === "negative" && (
                <TrendingDown size={14} className="text-red-600" />
              )}
              {changeType === "neutral" && (
                <Minus size={14} className="text-gray-500" />
              )}
              <span className={`text-xs font-medium ${changeStyles[changeType]}`}>
                {change}
              </span>
            </div>
          )}
        </div>

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${variantStyles[variant]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
