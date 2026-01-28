import React from "react";
import { cn } from "../../lib/utils";


function Badge({
  className = "",
  variant = "default",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default:
      "border-transparent bg-blue-600 text-white hover:bg-blue-600/80",
    secondary:
      "border-transparent bg-gray-200 text-gray-800 hover:bg-gray-200/80",
    destructive:
      "border-transparent bg-red-600 text-white hover:bg-red-600/80",
    outline:
      "border-gray-300 text-gray-800 bg-white",
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
}

export default Badge;
