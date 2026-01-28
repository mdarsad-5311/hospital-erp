import { Toaster as Sonner, toast } from "sonner";

const Toaster = (props) => {
  return (
    <Sonner
      theme="light"   // ya "dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-white text-black border shadow-lg",
          description: "text-gray-500",
          actionButton:
            "bg-blue-600 text-white",
          cancelButton:
            "bg-gray-200 text-black",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
