import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Calendar,
  CreditCard,
  Settings,
  User,
  Users,
  Search,
  Activity,
  BedDouble,
  Pill,
  TestTube,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-[9999]"
      onClick={(e) => e.stopPropagation()} 
    >
      <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Command.Input
          placeholder="Type a command or search..."
          className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-100"
        />
      </div>
      <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden py-2 px-2">
        <Command.Empty className="py-6 text-center text-sm text-zinc-500">
          No results found.
        </Command.Empty>

        <Command.Group heading="Pages" className="text-xs font-medium text-zinc-500 px-2 py-1.5">
          <Command.Item
            onSelect={() => runCommand(() => navigate("/dashboard"))}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
          >
            <Activity className="h-4 w-4" />
            <span>Dashboard</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => navigate("/patients"))}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
          >
            <Users className="h-4 w-4" />
            <span>Patients</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => navigate("/appointments"))}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
          >
            <Calendar className="h-4 w-4" />
            <span>Appointments</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => navigate("/opd"))}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
          >
            <User className="h-4 w-4" />
            <span>OPD</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => navigate("/ipd"))}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
          >
            <BedDouble className="h-4 w-4" />
            <span>IPD</span>
          </Command.Item>
           <Command.Item
            onSelect={() => runCommand(() => navigate("/billing"))}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
          >
            <CreditCard className="h-4 w-4" />
            <span>Billing</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => navigate("/pharmacy"))}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
          >
            <Pill className="h-4 w-4" />
            <span>Pharmacy</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => navigate("/laboratory"))}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
          >
            <TestTube className="h-4 w-4" />
            <span>Laboratory</span>
          </Command.Item>
           <Command.Item
            onSelect={() => runCommand(() => navigate("/settings"))}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Command.Item>
        </Command.Group>
        
        <Command.Separator className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />

        <Command.Group heading="Actions" className="text-xs font-medium text-zinc-500 px-2 py-1.5">
            <Command.Item
                onSelect={() => runCommand(() => navigate("/patients/new"))}
                 className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
            >
                <Users className="h-4 w-4" />
                <span>Add Patient</span>
            </Command.Item>
             <Command.Item
                onSelect={() => runCommand(() => navigate("/appointments/new"))}
                 className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
            >
                <Calendar className="h-4 w-4" />
                <span>Add Appointment</span>
            </Command.Item>
             <Command.Item
                onSelect={() => runCommand(() => navigate("/billing/new"))}
                 className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50 cursor-pointer"
            >
                <CreditCard className="h-4 w-4" />
                <span>New Invoice</span>
            </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
