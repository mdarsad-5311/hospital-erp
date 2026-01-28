import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";

/* Root */
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/* Sub Trigger */
const DropdownMenuSubTrigger = React.forwardRef(
    ({ className, inset, children, ...props }, ref) => (
        <DropdownMenuPrimitive.SubTrigger
            ref={ref}
            className={cn(
                "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
                inset && "pl-8",
                className
            )}
            {...props}
        >
            {children}
            <ChevronRight className="ml-auto h-4 w-4" />
        </DropdownMenuPrimitive.SubTrigger>
    )
);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

/* Sub Content */
const DropdownMenuSubContent = React.forwardRef(
    ({ className, ...props }, ref) => (
        <DropdownMenuPrimitive.SubContent
            ref={ref}
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-lg",
                className
            )}
            {...props}
        />
    )
);
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

/* Content */
const DropdownMenuContent = React.forwardRef(
    ({ className, sideOffset = 4, ...props }, ref) => (
        <DropdownMenuPortal>
            <DropdownMenuPrimitive.Content
                ref={ref}
                sideOffset={sideOffset}
                className={cn(
                    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md",
                    className
                )}
                {...props}
            />
        </DropdownMenuPortal>
    )
);
DropdownMenuContent.displayName = "DropdownMenuContent";

/* Item */
const DropdownMenuItem = React.forwardRef(
    ({ className, inset, ...props }, ref) => (
        <DropdownMenuPrimitive.Item
            ref={ref}
            className={cn(
                "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50",
                inset && "pl-8",
                className
            )}
            {...props}
        />
    )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

/* Checkbox Item */
const DropdownMenuCheckboxItem = React.forwardRef(
    ({ className, children, checked, ...props }, ref) => (
        <DropdownMenuPrimitive.CheckboxItem
            ref={ref}
            checked={checked}
            className={cn(
                "relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm focus:bg-accent",
                className
            )}
            {...props}
        >
            <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
                <DropdownMenuPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    )
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

/* Radio Item */
const DropdownMenuRadioItem = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <DropdownMenuPrimitive.RadioItem
            ref={ref}
            className={cn(
                "relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm focus:bg-accent",
                className
            )}
            {...props}
        >
            <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
                <DropdownMenuPrimitive.ItemIndicator>
                    <Circle className="h-2 w-2 fill-current" />
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.RadioItem>
    )
);
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

/* Label */
const DropdownMenuLabel = React.forwardRef(
    ({ className, inset, ...props }, ref) => (
        <DropdownMenuPrimitive.Label
            ref={ref}
            className={cn(
                "px-2 py-1.5 text-sm font-semibold",
                inset && "pl-8",
                className
            )}
            {...props}
        />
    )
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

/* Separator */
const DropdownMenuSeparator = React.forwardRef(
    ({ className, ...props }, ref) => (
        <DropdownMenuPrimitive.Separator
            ref={ref}
            className={cn("my-1 h-px bg-gray-200", className)}
            {...props}
        />
    )
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

/* Shortcut */
const DropdownMenuShortcut = ({ className, ...props }) => (
    <span
        className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
        {...props}
    />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
};
