import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../lib/utils"; // path adjust kar lena

// Breadcrumb
const Breadcrumb = React.forwardRef(function Breadcrumb(props, ref) {
    return <nav ref={ref} aria-label="breadcrumb" {...props} />;
});

// Breadcrumb List
const BreadcrumbList = React.forwardRef(function BreadcrumbList(
    { className = "", ...props },
    ref
) {
    return (
        <ol
            ref={ref}
            className={cn(
                "flex flex-wrap items-center gap-1.5 break-words text-sm text-gray-500 sm:gap-2.5",
                className
            )}
            {...props}
        />
    );
});

// Breadcrumb Item
const BreadcrumbItem = React.forwardRef(function BreadcrumbItem(
    { className = "", ...props },
    ref
) {
    return (
        <li
            ref={ref}
            className={cn("inline-flex items-center gap-1.5", className)}
            {...props}
        />
    );
});

// Breadcrumb Link
const BreadcrumbLink = React.forwardRef(function BreadcrumbLink(
    { asChild = false, className = "", ...props },
    ref
) {
    const Comp = asChild ? Slot : "a";

    return (
        <Comp
            ref={ref}
            className={cn("transition-colors hover:text-gray-900", className)}
            {...props}
        />
    );
});

// Breadcrumb Page (Current)
const BreadcrumbPage = React.forwardRef(function BreadcrumbPage(
    { className = "", ...props },
    ref
) {
    return (
        <span
            ref={ref}
            aria-current="page"
            className={cn("font-normal text-gray-900", className)}
            {...props}
        />
    );
});

// Separator
const BreadcrumbSeparator = ({ children, className = "", ...props }) => {
    return (
        <li
            role="presentation"
            aria-hidden="true"
            className={cn("[&>svg]:h-3.5 [&>svg]:w-3.5 text-gray-400", className)}
            {...props}
        >
            {children || <ChevronRight />}
        </li>
    );
};

// Ellipsis
const BreadcrumbEllipsis = ({ className = "", ...props }) => {
    return (
        <span
            role="presentation"
            aria-hidden="true"
            className={cn(
                "flex h-9 w-9 items-center justify-center text-gray-500",
                className
            )}
            {...props}
        >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More</span>
        </span>
    );
};

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
