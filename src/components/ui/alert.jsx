import * as React from "react";
import { cn } from "../lib/utils"; // path adjust kar lena

// Alert
const Alert = React.forwardRef(function Alert(
    { className, variant = "default", ...props },
    ref
) {
    return (
        <div
            ref={ref}
            role="alert"
            className={cn(
                "relative w-full rounded-lg border p-4",
                "[&>svg~*]:pl-7 [&>svg+div]:-translate-y-[3px]",
                "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
                variant === "default" && "bg-white text-gray-900",
                variant === "destructive" &&
                "border-red-500/50 text-red-600 [&>svg]:text-red-600",
                className
            )}
            {...props}
        />
    );
});

// Alert Title
const AlertTitle = React.forwardRef(function AlertTitle(
    { className, ...props },
    ref
) {
    return (
        <h5
            ref={ref}
            className={cn(
                "mb-1 font-medium leading-none tracking-tight",
                className
            )}
            {...props}
        />
    );
});

// Alert Description
const AlertDescription = React.forwardRef(function AlertDescription(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={cn("text-sm [&_p]:leading-relaxed", className)}
            {...props}
        />
    );
});

export { Alert, AlertTitle, AlertDescription };
