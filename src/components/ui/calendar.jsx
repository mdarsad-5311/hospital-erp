import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "../lib/utils"; // path adjust kar lena

function Calendar({
    className = "",
    classNames = {},
    showOutsideDays = true,
    ...props
}) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3 bg-white rounded-xl shadow", className)}
            classNames={{
                months:
                    "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "flex items-center gap-1",
                nav_button:
                    "h-7 w-7 rounded-md border border-gray-300 bg-white p-0 opacity-50 hover:opacity-100 flex items-center justify-center",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                    "w-9 text-center text-gray-500 rounded-md font-normal text-xs",
                row: "flex w-full mt-2",
                cell:
                    "relative h-9 w-9 text-center text-sm p-0 focus-within:z-20",
                day:
                    "h-9 w-9 rounded-md flex items-center justify-center hover:bg-gray-100",
                day_selected:
                    "bg-blue-600 text-white hover:bg-blue-600",
                day_today:
                    "border border-blue-600 text-blue-600",
                day_outside:
                    "text-gray-400 opacity-50",
                day_disabled:
                    "text-gray-300 opacity-50",
                day_range_middle:
                    "bg-blue-100 text-blue-700",
                day_hidden:
                    "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
            }}
            {...props}
        />
    );
}

export default Calendar;
