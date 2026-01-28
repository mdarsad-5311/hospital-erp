import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";
import { Label } from "./Label";

/* Form Root */
const Form = FormProvider;

/* Contexts */
const FormFieldContext = React.createContext({});
const FormItemContext = React.createContext({});

/* FormField */
const FormField = ({ name, control, rules, defaultValue, children }) => {
    return (
        <FormFieldContext.Provider value={{ name }}>
            <Controller name={name} control={control} rules={rules} defaultValue={defaultValue}>
                {children}
            </Controller>
        </FormFieldContext.Provider>
    );
};

/* useFormField Hook */
const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState, formState } = useFormContext();

    if (!fieldContext) throw new Error("useFormField must be used within FormField");

    const fieldState = getFieldState(fieldContext.name, formState);
    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};

/* FormItem */
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
    const id = React.useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
    );
});
FormItem.displayName = "FormItem";

/* FormLabel */
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();
    return (
        <Label ref={ref} htmlFor={formItemId} className={cn(error && "text-red-600", className)} {...props} />
    );
});
FormLabel.displayName = "FormLabel";

/* FormControl */
const FormControl = React.forwardRef(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-invalid={!!error}
            aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
            {...props}
        />
    );
});
FormControl.displayName = "FormControl";

/* FormDescription */
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return (
        <p ref={ref} id={formDescriptionId} className={cn("text-sm text-gray-500", className)} {...props} />
    );
});
FormDescription.displayName = "FormDescription";

/* FormMessage */
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error.message) : children;
    if (!body) return null;

    return (
        <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-red-600", className)} {...props}>
            {body}
        </p>
    );
});
FormMessage.displayName = "FormMessage";

export {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    useFormField,
};
