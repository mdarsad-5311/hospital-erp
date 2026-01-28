import React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import { cn } from "../../lib/utils";

/* Main OTP Input */
const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={cn("flex items-center gap-2 disabled:opacity-50", containerClassName)}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
    />
));
InputOTP.displayName = "InputOTP";

/* OTP Group Wrapper */
const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

/* OTP Single Slot */
const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex h-10 w-10 items-center justify-center border-y border-r border-gray-300 text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                isActive && "z-10 ring-2 ring-blue-500 ring-offset-2",
                className
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="animate-blink h-4 w-px bg-gray-800" />
                </div>
            )}
        </div>
    );
});
InputOTPSlot.displayName = "InputOTPSlot";

/* OTP Separator */
const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
        <Dot />
    </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
