import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = ({ ratio = 16 / 9, className = "", children }) => {
    return (
        <AspectRatioPrimitive.Root
            ratio={ratio}
            className={`relative w-full overflow-hidden ${className}`}
        >
            {children}
        </AspectRatioPrimitive.Root>
    );
};

export default AspectRatio;
