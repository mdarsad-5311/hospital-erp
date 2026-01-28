import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils";

// Avatar Root
const Avatar = React.forwardRef(function Avatar(
    { className = "", ...props },
    ref
) {
    return (
        <AvatarPrimitive.Root
            ref={ref}
            className={cn(
                "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white",
                className
            )}
            {...props}
        />
    );
});

// Avatar Image
const AvatarImage = React.forwardRef(function AvatarImage(
    { className = "", ...props },
    ref
) {
    return (
        <AvatarPrimitive.Image
            ref={ref}
            className={cn("aspect-square h-full w-full object-cover", className)}
            {...props}
        />
    );
});

// Avatar Fallback
const AvatarFallback = React.forwardRef(function AvatarFallback(
    { className = "", ...props },
    ref
) {
    return (
        <AvatarPrimitive.Fallback
            ref={ref}
            className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-700 font-medium",
                className
            )}
            {...props}
        />
    );
});

export { Avatar, AvatarImage, AvatarFallback };
