import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(function Button(
    {
        className = "",
        variant = "default",
        size = "default",
        asChild = false,
        ...props
    },
    ref
) {
    const Comp = asChild ? Slot : "button";

    const baseStyles =
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4";

    const variants = {
        default:
            "bg-blue-600 text-white hover:bg-blue-600/90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
        destructive:
            "bg-red-600 text-white hover:bg-red-600/90 shadow-md hover:shadow-lg",
        outline:
            "border border-gray-300 bg-white hover:bg-gray-100 text-gray-800",
        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-200/80",
        ghost:
            "hover:bg-gray-100 text-gray-700",
        link:
            "text-blue-600 underline-offset-4 hover:underline",
        success:
            "bg-green-600 text-white hover:bg-green-600/90 shadow-md hover:shadow-lg",
        warning:
            "bg-yellow-500 text-white hover:bg-yellow-500/90 shadow-md hover:shadow-lg",
        gradient:
            "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90",
        sidebar:
            "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white",
    };

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8 text-base",
        xl: "h-12 rounded-xl px-10 text-base font-semibold",
        icon: "h-10 w-10",
    };

    return (
        <Comp
            ref={ref}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        />
    );
});

export default Button;
