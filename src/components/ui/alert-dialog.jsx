import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../lib/utils"; // path adjust kar lena
import { buttonVariants } from "./button"; // path adjust kar lena

// Root
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

// Overlay
const AlertDialogOverlay = React.forwardRef(function AlertDialogOverlay(
    { className, ...props },
    ref
) {
    return (
        <AlertDialogPrimitive.Overlay
            ref={ref}
            className={cn(
                "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                className
            )}
            {...props}
        />
    );
});

// Content
const AlertDialogContent = React.forwardRef(function AlertDialogContent(
    { className, ...props },
    ref
) {
    return (
        <AlertDialogPortal>
            <AlertDialogOverlay />
            <AlertDialogPrimitive.Content
                ref={ref}
                className={cn(
                    "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-white p-6 shadow-lg duration-200",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                    "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
                    "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
                    "sm:rounded-lg",
                    className
                )}
                {...props}
            />
        </AlertDialogPortal>
    );
});

// Header
const AlertDialogHeader = ({ className, ...props }) => (
    <div
        className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
        {...props}
    />
);

// Footer
const AlertDialogFooter = ({ className, ...props }) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
);

// Title
const AlertDialogTitle = React.forwardRef(function AlertDialogTitle(
    { className, ...props },
    ref
) {
    return (
        <AlertDialogPrimitive.Title
            ref={ref}
            className={cn("text-lg font-semibold", className)}
            {...props}
        />
    );
});

// Description
const AlertDialogDescription = React.forwardRef(function AlertDialogDescription(
    { className, ...props },
    ref
) {
    return (
        <AlertDialogPrimitive.Description
            ref={ref}
            className={cn("text-sm text-gray-500", className)}
            {...props}
        />
    );
});

// Action Button
const AlertDialogAction = React.forwardRef(function AlertDialogAction(
    { className, ...props },
    ref
) {
    return (
        <AlertDialogPrimitive.Action
            ref={ref}
            className={cn(buttonVariants(), className)}
            {...props}
        />
    );
});

// Cancel Button
const AlertDialogCancel = React.forwardRef(function AlertDialogCancel(
    { className, ...props },
    ref
) {
    return (
        <AlertDialogPrimitive.Cancel
            ref={ref}
            className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-2 sm:mt-0",
                className
            )}
            {...props}
        />
    );
});

export {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
};
