import React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";

/* Root */
export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

/* Sub Trigger */
export const ContextMenuSubTrigger = React.forwardRef(
    ({ className, inset, children, ...props }, ref) => (
        <ContextMenuPrimitive.SubTrigger
            ref={ref}
            className={cn(
                "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100",
                inset && "pl-8",
                className
            )}
            {...props}
        >
            {children}
            <ChevronRight className="ml-auto h-4 w-4" />
        </ContextMenuPrimitive.SubTrigger>
    )
);

/* Sub Content */
export const ContextMenuSubContent = React.forwardRef(
    ({ className, ...props }, ref) => (
        <ContextMenuPrimitive.SubContent
            ref={ref}
            className={cn(
                "z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-md",
                className
            )}
            {...props}
        />
    )
);

/* Content */
export const ContextMenuContent = React.forwardRef(
    ({ className, ...props }, ref) => (
        <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content
                ref={ref}
                className={cn(
                    "z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-md",
                    className
                )}
                {...props}
            />
        </ContextMenuPrimitive.Portal>
    )
);

/* Item */
export const ContextMenuItem = React.forwardRef(
    ({ className, inset, ...props }, ref) => (
        <ContextMenuPrimitive.Item
            ref={ref}
            className={cn(
                "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100",
                inset && "pl-8",
                className
            )}
            {...props}
        />
    )
);

/* Checkbox Item */
export const ContextMenuCheckboxItem = React.forwardRef(
    ({ className, children, checked, ...props }, ref) => (
        <ContextMenuPrimitive.CheckboxItem
            ref={ref}
            checked={checked}
            className={cn(
                "relative flex cursor-pointer items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-gray-100",
                className
            )}
            {...props}
        >
            <span className="absolute left-2">
                <ContextMenuPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                </ContextMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </ContextMenuPrimitive.CheckboxItem>
    )
);

/* Radio Item */
export const ContextMenuRadioItem = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <ContextMenuPrimitive.RadioItem
            ref={ref}
            className={cn(
                "relative flex cursor-pointer items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-gray-100",
                className
            )}
            {...props}
        >
            <span className="absolute left-2">
                <ContextMenuPrimitive.ItemIndicator>
                    <Circle className="h-2 w-2 fill-current" />
                </ContextMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </ContextMenuPrimitive.RadioItem>
    )
);

/* Label */
export const ContextMenuLabel = React.forwardRef(
    ({ className, inset, ...props }, ref) => (
        <ContextMenuPrimitive.Label
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

/* Separator */
export const ContextMenuSeparator = React.forwardRef(
    ({ className, ...props }, ref) => (
        <ContextMenuPrimitive.Separator
            ref={ref}
            className={cn("my-1 h-px bg-gray-200", className)}
            {...props}
        />
    )
);

/* Shortcut */
export const ContextMenuShortcut = ({ className, ...props }) => (
    <span
        className={cn("ml-auto text-xs tracking-widest text-gray-400", className)}
        {...props}
    />
);
