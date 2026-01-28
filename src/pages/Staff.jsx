import { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Calendar,
  Clock,
  FileText,
  Download,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Award,
  TrendingUp,
  UserCheck,
  UserX,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  Trash2,
  CalendarDays,
  ClipboardList,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Badge from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";


import { Textarea } from "../components/ui/textarea";
import { Progress } from "../components/ui/progress";
import { toast } from "sonner";
// import ExportStaffDialog from "../components/staff/ExportStaffDialog";

// Mock Data
const mockStaff = [
  {
    id: "1",
    employeeId: "EMP001",
    firstName: "Dr. Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@hospital.com",
    phone: "+91 98765 43210",
    role: "doctor",
    department: "Cardiology",
    designation: "Senior Cardiologist",
    joiningDate: "2020-03-15",
    status: "active",
    address: "123 Medical Lane, Mumbai",
    emergencyContact: "+91 98765 43211",
    salary: 250000,
    shift: "morning",
    qualification: "MBBS, MD (Cardiology)",
    experience: "12 years",
  },
  {
    id: "2",
    employeeId: "EMP002",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@hospital.com",
    phone: "+91 98765 43212",
    role: "nurse",
    department: "ICU",
    designation: "Head Nurse",
    joiningDate: "2019-06-20",
    status: "active",
    address: "456 Care Street, Mumbai",
    emergencyContact: "+91 98765 43213",
    salary: 75000,
    shift: "rotating",
    qualification: "B.Sc Nursing, ICU Certification",
    experience: "8 years",
  },
  {
    id: "3",
    employeeId: "EMP003",
    firstName: "Amit",
    lastName: "Patel",
    email: "amit.patel@hospital.com",
    phone: "+91 98765 43214",
    role: "lab_technician",
    department: "Laboratory",
    designation: "Senior Lab Technician",
    joiningDate: "2021-01-10",
    status: "on-leave",
    address: "789 Lab Road, Mumbai",
    emergencyContact: "+91 98765 43215",
    salary: 55000,
    shift: "morning",
    qualification: "DMLT, B.Sc MLT",
    experience: "5 years",
  },
  {
    id: "4",
    employeeId: "EMP004",
    firstName: "Dr. Sunita",
    lastName: "Verma",
    email: "sunita.verma@hospital.com",
    phone: "+91 98765 43216",
    role: "doctor",
    department: "Pediatrics",
    designation: "Pediatrician",
    joiningDate: "2018-09-05",
    status: "active",
    address: "321 Child Care Ave, Mumbai",
    emergencyContact: "+91 98765 43217",
    salary: 200000,
    shift: "morning",
    qualification: "MBBS, MD (Pediatrics)",
    experience: "10 years",
  },
  {
    id: "5",
    employeeId: "EMP005",
    firstName: "Rahul",
    lastName: "Singh",
    email: "rahul.singh@hospital.com",
    phone: "+91 98765 43218",
    role: "pharmacist",
    department: "Pharmacy",
    designation: "Chief Pharmacist",
    joiningDate: "2017-04-12",
    status: "active",
    address: "654 Pharma Lane, Mumbai",
    emergencyContact: "+91 98765 43219",
    salary: 80000,
    shift: "rotating",
    qualification: "B.Pharm, M.Pharm",
    experience: "9 years",
  },
  {
    id: "6",
    employeeId: "EMP006",
    firstName: "Neha",
    lastName: "Gupta",
    email: "neha.gupta@hospital.com",
    phone: "+91 98765 43220",
    role: "receptionist",
    department: "Front Desk",
    designation: "Senior Receptionist",
    joiningDate: "2022-02-28",
    status: "active",
    address: "987 Reception Road, Mumbai",
    emergencyContact: "+91 98765 43221",
    salary: 35000,
    shift: "morning",
    qualification: "B.Com, Hospital Management Diploma",
    experience: "3 years",
  },
];

const mockAttendance = [
  { id: "1", staffId: "1", staffName: "Dr. Rajesh Kumar", date: "2024-01-15", checkIn: "08:45", checkOut: "17:30", status: "present", workHours: 8.75 },
  { id: "2", staffId: "2", staffName: "Priya Sharma", date: "2024-01-15", checkIn: "07:00", checkOut: "19:00", status: "present", workHours: 12 },
  { id: "3", staffId: "3", staffName: "Amit Patel", date: "2024-01-15", checkIn: "-", checkOut: "-", status: "on-leave", workHours: 0 },
  { id: "4", staffId: "4", staffName: "Dr. Sunita Verma", date: "2024-01-15", checkIn: "09:15", checkOut: "17:00", status: "late", workHours: 7.75 },
  { id: "5", staffId: "5", staffName: "Rahul Singh", date: "2024-01-15", checkIn: "08:00", checkOut: "14:00", status: "half-day", workHours: 6 },
  { id: "6", staffId: "6", staffName: "Neha Gupta", date: "2024-01-15", checkIn: "08:55", checkOut: "18:00", status: "present", workHours: 9.08 },
];

const mockLeaveRequests = [
  { id: "1", staffId: "3", staffName: "Amit Patel", department: "Laboratory", leaveType: "sick", startDate: "2024-01-15", endDate: "2024-01-17", days: 3, reason: "Fever and cold", status: "approved", appliedOn: "2024-01-14" },
  { id: "2", staffId: "2", staffName: "Priya Sharma", department: "ICU", leaveType: "casual", startDate: "2024-01-20", endDate: "2024-01-21", days: 2, reason: "Personal work", status: "pending", appliedOn: "2024-01-15" },
  { id: "3", staffId: "5", staffName: "Rahul Singh", department: "Pharmacy", leaveType: "annual", startDate: "2024-02-01", endDate: "2024-02-10", days: 10, reason: "Family vacation", status: "pending", appliedOn: "2024-01-10" },
  { id: "4", staffId: "6", staffName: "Neha Gupta", department: "Front Desk", leaveType: "emergency", startDate: "2024-01-12", endDate: "2024-01-12", days: 1, reason: "Family emergency", status: "approved", appliedOn: "2024-01-12" },
];

const mockShifts = [
  { id: "1", staffId: "1", staffName: "Dr. Rajesh Kumar", department: "Cardiology", date: "2024-01-16", shiftType: "morning", startTime: "08:00", endTime: "16:00", status: "scheduled" },
  { id: "2", staffId: "2", staffName: "Priya Sharma", department: "ICU", date: "2024-01-16", shiftType: "night", startTime: "20:00", endTime: "08:00", status: "scheduled" },
  { id: "3", staffId: "4", staffName: "Dr. Sunita Verma", department: "Pediatrics", date: "2024-01-16", shiftType: "morning", startTime: "09:00", endTime: "17:00", status: "scheduled" },
  { id: "4", staffId: "5", staffName: "Rahul Singh", department: "Pharmacy", date: "2024-01-16", shiftType: "evening", startTime: "14:00", endTime: "22:00", status: "scheduled" },
  { id: "5", staffId: "6", staffName: "Neha Gupta", department: "Front Desk", date: "2024-01-16", shiftType: "morning", startTime: "08:00", endTime: "16:00", status: "scheduled" },
  { id: "6", staffId: "2", staffName: "Priya Sharma", department: "ICU", date: "2024-01-15", shiftType: "morning", startTime: "08:00", endTime: "16:00", status: "completed" },
];

const Staff = () => {
  const [activeTab, setActiveTab] = useState("directory");
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [staff] = useState(mockStaff);
  const [attendance] = useState(mockAttendance);
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const [shifts] = useState(mockShifts);


  // Dialogs
  const [showAddStaffDialog, setShowAddStaffDialog] = useState(false);
  const [showStaffDetailsDialog, setShowStaffDetailsDialog] = useState(false);
  const [showLeaveRequestDialog, setShowLeaveRequestDialog] = useState(false);
  const [showShiftDialog, setShowShiftDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // New staff form
  const [newStaff, setNewStaff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    designation: "",
    joiningDate: "",
    address: "",
    emergencyContact: "",
    salary: "",
    shift: "morning",
    qualification: "",
    experience: "",
  });

  // New leave request form
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    staffId: "",
    leaveType: "casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // New shift form
  const [newShift, setNewShift] = useState({
    staffId: "",
    date: "",
    shiftType: "morning",
    startTime: "",
    endTime: "",
  });

  const departments = [...new Set(staff.map(s => s.department))];
  const roles = [...new Set(staff.map(s => s.role))];

  const filteredStaff = staff.filter(member => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const stats = {
    totalStaff: staff.length,
    activeStaff: staff.filter(s => s.status === "active").length,
    onLeave: staff.filter(s => s.status === "on-leave").length,
    pendingLeaves: leaveRequests.filter(l => l.status === "pending").length,
  };

  const handleAddStaff = () => {
    toast.success("Staff member added successfully!");
    setShowAddStaffDialog(false);
    setNewStaff({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      designation: "",
      joiningDate: "",
      address: "",
      emergencyContact: "",
      salary: "",
      shift: "morning",
      qualification: "",
      experience: "",
    });
  };

  const handleLeaveAction = () => {
    setLeaveRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: action } : req)
    );
    toast.success(`Leave request ${action}!`);
  };

  const handleAddLeaveRequest = () => {
    toast.success("Leave request submitted successfully!");
    setShowLeaveRequestDialog(false);
  };

  const handleAddShift = () => {
    toast.success("Shift scheduled successfully!");
    setShowShiftDialog(false);
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "on-leave": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      inactive: "bg-destructive/10 text-destructive border-destructive/20",
      present: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      absent: "bg-destructive/10 text-destructive border-destructive/20",
      late: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "half-day": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
      scheduled: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      missed: "bg-destructive/10 text-destructive border-destructive/20",
    };

    return styles[status] || "bg-muted text-muted-foreground";
  };

  const getRoleBadge = (role) => {
    const styles = {
      doctor: "bg-primary/10 text-primary border-primary/20",
      nurse: "bg-pink-500/10 text-pink-500 border-pink-500/20",
      lab_technician: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      pharmacist: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      receptionist: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      accountant: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      admin: "bg-destructive/10 text-destructive border-destructive/20",
    };

    return styles[role] || "bg-muted text-muted-foreground";
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage employees, attendance, shifts, and leave requests
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setShowExportDialog(true)}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2" onClick={() => setShowAddStaffDialog(true)}>
            <UserPlus className="h-4 w-4" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Staff</p>
                  <p className="text-2xl font-bold">{stats.totalStaff}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Staff</p>
                  <p className="text-2xl font-bold">{stats.activeStaff}</p>
                </div>
                <div className="rounded-full bg-emerald-500/10 p-3">
                  <UserCheck className="h-6 w-6 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div

        >
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">On Leave</p>
                  <p className="text-2xl font-bold">{stats.onLeave}</p>
                </div>
                <div className="rounded-full bg-amber-500/10 p-3">
                  <UserX className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div

        >
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Leaves</p>
                  <p className="text-2xl font-bold">{stats.pendingLeaves}</p>
                </div>
                <div className="rounded-full bg-blue-500/10 p-3">
                  <AlertCircle className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="directory" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Directory</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="gap-2">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Attendance</span>
          </TabsTrigger>
          <TabsTrigger value="leaves" className="gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Leaves</span>
          </TabsTrigger>
          <TabsTrigger value="shifts" className="gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Shifts</span>
          </TabsTrigger>
        </TabsList>

        {/* Directory Tab */}
        <TabsContent value="directory" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search staff..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map(role => (
                        <SelectItem key={role} value={role} className="capitalize">
                          {role.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredStaff.map((member, index) => (
                  <div

                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
                      setSelectedStaff(member);
                      setShowStaffDetailsDialog(true);
                    }}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-14 w-14">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {member.firstName[0]}{member.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{member.firstName} {member.lastName}</h3>
                              <p className="text-sm text-muted-foreground">{member.designation}</p>
                              <p className="text-xs text-muted-foreground">{member.employeeId}</p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedStaff(member);
                                setShowStaffDetailsDialog(true);
                              }}>
                                <Eye className="h-4 w-4 mr-2" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Badge variant="outline" className={getRoleBadge(member.role)}>
                            {member.role.replace("_", " ")}
                          </Badge>
                          <Badge variant="outline" className={getStatusBadge(member.status)}>
                            {member.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            <span>{member.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="capitalize">{member.shift} Shift</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Today's Attendance</CardTitle>
                <div className="flex gap-2">
                  <Input type="date" className="w-[180px]" defaultValue="2024-01-15" />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card className="bg-emerald-500/10 border-emerald-500/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                    <div>
                      <p className="text-2xl font-bold text-emerald-500">{attendance.filter(a => a.status === "present").length}</p>
                      <p className="text-sm text-muted-foreground">Present</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-destructive/10 border-destructive/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <XCircle className="h-8 w-8 text-destructive" />
                    <div>
                      <p className="text-2xl font-bold text-destructive">{attendance.filter(a => a.status === "absent").length}</p>
                      <p className="text-sm text-muted-foreground">Absent</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-amber-500/10 border-amber-500/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <AlertCircle className="h-8 w-8 text-amber-500" />
                    <div>
                      <p className="text-2xl font-bold text-amber-500">{attendance.filter(a => a.status === "late").length}</p>
                      <p className="text-sm text-muted-foreground">Late</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-blue-500/10 border-blue-500/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <CalendarDays className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold text-blue-500">{attendance.filter(a => a.status === "on-leave").length}</p>
                      <p className="text-sm text-muted-foreground">On Leave</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Work Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.staffName}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={(record.workHours / 8) * 100} className="w-20 h-2" />
                          <span className="text-sm">{record.workHours}h</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadge(record.status)}>
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaves Tab */}
        <TabsContent value="leaves" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Leave Requests</CardTitle>
                <Button className="gap-2" onClick={() => setShowLeaveRequestDialog(true)}>
                  <CalendarDays className="h-4 w-4" />
                  Request Leave
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.staffName}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{request.leaveType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{request.startDate} - {request.endDate}</p>
                          <p className="text-muted-foreground">{request.days} days</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadge(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.status === "pending" && (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-emerald-500 hover:text-emerald-600"
                              onClick={() => handleLeaveAction(request.id, "approved")}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-destructive hover:text-destructive"
                              onClick={() => handleLeaveAction(request.id, "rejected")}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shifts Tab */}
        <TabsContent value="shifts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Shift Schedule</CardTitle>
                <div className="flex gap-2">
                  <Input type="date" className="w-[180px]" defaultValue="2024-01-16" />
                  <Button className="gap-2" onClick={() => setShowShiftDialog(true)}>
                    <Calendar className="h-4 w-4" />
                    Add Shift
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card className="bg-amber-500/10 border-amber-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-amber-500/20 p-2">
                        <Clock className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Morning Shift</p>
                        <p className="text-sm text-muted-foreground">08:00 - 16:00</p>
                      </div>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{shifts.filter(s => s.shiftType === "morning" && s.date === "2024-01-16").length} Staff</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-500/10 border-blue-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-500/20 p-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Evening Shift</p>
                        <p className="text-sm text-muted-foreground">14:00 - 22:00</p>
                      </div>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{shifts.filter(s => s.shiftType === "evening" && s.date === "2024-01-16").length} Staff</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-500/10 border-purple-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-purple-500/20 p-2">
                        <Clock className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Night Shift</p>
                        <p className="text-sm text-muted-foreground">20:00 - 08:00</p>
                      </div>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{shifts.filter(s => s.shiftType === "night" && s.date === "2024-01-16").length} Staff</p>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shifts.map((shift) => (
                    <TableRow key={shift.id}>
                      <TableCell className="font-medium">{shift.staffName}</TableCell>
                      <TableCell>{shift.department}</TableCell>
                      <TableCell>{shift.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{shift.shiftType}</Badge>
                      </TableCell>
                      <TableCell>{shift.startTime} - {shift.endTime}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadge(shift.status)}>
                          {shift.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Staff Dialog */}
      <Dialog open={showAddStaffDialog} onOpenChange={setShowAddStaffDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Staff Member</DialogTitle>
            <DialogDescription>Enter the details of the new employee</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={newStaff.firstName}
                  onChange={(e) => setNewStaff({ ...newStaff, firstName: e.target.value })}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={newStaff.lastName}
                  onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newStaff.role} onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                    <SelectItem value="lab_technician">Lab Technician</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={newStaff.department} onValueChange={(value) => setNewStaff({ ...newStaff, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="ICU">ICU</SelectItem>
                    <SelectItem value="Laboratory">Laboratory</SelectItem>
                    <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="Front Desk">Front Desk</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={newStaff.designation}
                  onChange={(e) => setNewStaff({ ...newStaff, designation: e.target.value })}
                  placeholder="Enter designation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={newStaff.joiningDate}
                  onChange={(e) => setNewStaff({ ...newStaff, joiningDate: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shift">Shift</Label>
                <Select value={newStaff.shift} onValueChange={(value) => setNewStaff({ ...newStaff, shift: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="night">Night</SelectItem>
                    <SelectItem value="rotating">Rotating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  value={newStaff.salary}
                  onChange={(e) => setNewStaff({ ...newStaff, salary: e.target.value })}
                  placeholder="Enter salary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                value={newStaff.qualification}
                onChange={(e) => setNewStaff({ ...newStaff, qualification: e.target.value })}
                placeholder="Enter qualifications"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={newStaff.experience}
                  onChange={(e) => setNewStaff({ ...newStaff, experience: e.target.value })}
                  placeholder="e.g., 5 years"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={newStaff.emergencyContact}
                  onChange={(e) => setNewStaff({ ...newStaff, emergencyContact: e.target.value })}
                  placeholder="Enter emergency contact"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={newStaff.address}
                onChange={(e) => setNewStaff({ ...newStaff, address: e.target.value })}
                placeholder="Enter full address"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStaffDialog(false)}>Cancel</Button>
            <Button onClick={handleAddStaff}>Add Staff</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Staff Details Dialog */}
      <Dialog open={showStaffDetailsDialog} onOpenChange={setShowStaffDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Staff Details</DialogTitle>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedStaff.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                    {selectedStaff.firstName[0]}{selectedStaff.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedStaff.firstName} {selectedStaff.lastName}</h3>
                  <p className="text-muted-foreground">{selectedStaff.designation}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className={getRoleBadge(selectedStaff.role)}>
                      {selectedStaff.role.replace("_", " ")}
                    </Badge>
                    <Badge variant="outline" className={getStatusBadge(selectedStaff.status)}>
                      {selectedStaff.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Employee ID</p>
                    <p className="font-medium">{selectedStaff.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{selectedStaff.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joining Date</p>
                    <p className="font-medium">{selectedStaff.joiningDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Shift</p>
                    <p className="font-medium capitalize">{selectedStaff.shift}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" /> {selectedStaff.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" /> {selectedStaff.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Qualification</p>
                    <p className="font-medium flex items-center gap-2">
                      <Award className="h-4 w-4" /> {selectedStaff.qualification}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" /> {selectedStaff.experience}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {selectedStaff.address}
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" variant="outline">
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
                <Button className="flex-1" variant="outline">
                  <FileText className="h-4 w-4 mr-2" /> View Documents
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Leave Request Dialog */}
      <Dialog open={showLeaveRequestDialog} onOpenChange={setShowLeaveRequestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Leave</DialogTitle>
            <DialogDescription>Submit a new leave request</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Employee</Label>
              <Select value={newLeaveRequest.staffId} onValueChange={(value) => setNewLeaveRequest({ ...newLeaveRequest, staffId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {staff.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.firstName} {s.lastName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Leave Type</Label>
              <Select
                value={newLeaveRequest.leaveType}
                onValueChange={(value) =>
                  setNewLeaveRequest({
                    ...newLeaveRequest,
                    leaveType: value, // ✅ just use value directly
                  })
                }
              >

                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="maternity">Maternity Leave</SelectItem>
                  <SelectItem value="emergency">Emergency Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={newLeaveRequest.startDate}
                  onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={newLeaveRequest.endDate}
                  onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, endDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Reason</Label>
              <Textarea
                value={newLeaveRequest.reason}
                onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, reason: e.target.value })}
                placeholder="Enter reason for leave"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLeaveRequestDialog(false)}>Cancel</Button>
            <Button onClick={handleAddLeaveRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Shift Dialog */}
      <Dialog open={showShiftDialog} onOpenChange={setShowShiftDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Shift</DialogTitle>
            <DialogDescription>Assign a shift to an employee</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Employee</Label>
              <Select value={newShift.staffId} onValueChange={(value) => setNewShift({ ...newShift, staffId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {staff.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.firstName} {s.lastName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={newShift.date}
                onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Shift Type</Label>
              <Select
                value={newShift.shiftType}
                onValueChange={(value) =>
                  setNewShift({
                    ...newShift,
                    shiftType: value,
                  })
                }
              >

                <SelectTrigger>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (08:00 - 16:00)</SelectItem>
                  <SelectItem value="evening">Evening (14:00 - 22:00)</SelectItem>
                  <SelectItem value="night">Night (20:00 - 08:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={newShift.startTime}
                  onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={newShift.endTime}
                  onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShiftDialog(false)}>Cancel</Button>
            <Button onClick={handleAddShift}>Schedule Shift</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Staff Dialog
      <ExportStaffDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
      /> */}
    </div>
  );
};

export default Staff;
