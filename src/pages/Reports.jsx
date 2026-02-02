import { useState } from 'react';

import {
    FileText,
    Download,
    Calendar,
    Filter,
    TrendingUp,
    TrendingDown,
    BarChart3,
    PieChart,
    LineChart,
    Users,
    Bed,
    Activity,
    DollarSign,
    Receipt,
    Pill,
    TestTube,
    Building2,
    Stethoscope,
    Clock,
    CheckCircle,
    AlertCircle,
    FileSpreadsheet,
    Printer,
    Mail,
    Share2,
    RefreshCw,
    Eye,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Loader2,
    CalendarDays,
    Heart,
    UserCheck,
    IndianRupee
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import Button from '../components/ui/button';
import Badge from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';

// Mock Reports Data
const reportCategories = [
    {
        id: "financial",
        name: "Financial Reports",
        icon: <DollarSign className="h-5 w-5" />,
        color: "bg-green-500",
        reports: [
            {
                id: "revenue-summary",
                name: "Revenue Summary",
                description: "Overall revenue analysis with trends",
                icon: <TrendingUp className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
            {
                id: "daily-collection",
                name: "Daily Collection Report",
                description: "Day-wise collection breakdown",
                icon: <IndianRupee className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
            {
                id: "department-revenue",
                name: "Department-wise Revenue",
                description: "Revenue breakdown by department",
                icon: <Building2 className="h-5 w-5" />,
                frequency: "weekly",
                format: ["PDF", "Excel", "CSV"],
            },
            {
                id: "outstanding-dues",
                name: "Outstanding Dues Report",
                description: "Pending payments and dues",
                icon: <AlertCircle className="h-5 w-5" />,
                frequency: "weekly",
                format: ["PDF", "Excel"],
            },
            {
                id: "insurance-claims",
                name: "Insurance Claims Report",
                description: "Insurance claim status and settlements",
                icon: <FileText className="h-5 w-5" />,
                frequency: "monthly",
                format: ["PDF", "Excel"],
            },
            {
                id: "discount-report",
                name: "Discount & Concession Report",
                description: "Applied discounts analysis",
                icon: <Receipt className="h-5 w-5" />,
                frequency: "monthly",
                format: ["PDF", "Excel"],
            },
        ],
    },
    {
        id: "patient",
        name: "Patient Reports",
        icon: <Users className="h-5 w-5" />,
        color: "bg-blue-500",
        reports: [
            {
                id: "patient-registration",
                name: "Patient Registration Report",
                description: "New patient registrations",
                icon: <UserCheck className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
            {
                id: "opd-summary",
                name: "OPD Summary Report",
                description: "Outpatient department statistics",
                icon: <Stethoscope className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
            {
                id: "ipd-summary",
                name: "IPD Summary Report",
                description: "Inpatient admissions and discharges",
                icon: <Bed className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
            {
                id: "patient-demographics",
                name: "Patient Demographics",
                description: "Age, gender, location distribution",
                icon: <PieChart className="h-5 w-5" />,
                frequency: "monthly",
                format: ["PDF", "Excel", "CSV"],
            },
            {
                id: "disease-statistics",
                name: "Disease Statistics",
                description: "Common diagnoses and conditions",
                icon: <Activity className="h-5 w-5" />,
                frequency: "monthly",
                format: ["PDF", "Excel"],
            },
            {
                id: "patient-satisfaction",
                name: "Patient Satisfaction Report",
                description: "Feedback and satisfaction scores",
                icon: <Heart className="h-5 w-5" />,
                frequency: "monthly",
                format: ["PDF"],
            },
        ],
    },
    {
        id: "operational",
        name: "Operational Reports",
        icon: <Activity className="h-5 w-5" />,
        color: "bg-amber-500",
        reports: [
            {
                id: "bed-occupancy",
                name: "Bed Occupancy Report",
                description: "Current bed utilization status",
                icon: <Bed className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
            {
                id: "appointment-summary",
                name: "Appointment Summary",
                description: "Scheduled vs completed appointments",
                icon: <CalendarDays className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
            {
                id: "wait-time-analysis",
                name: "Wait Time Analysis",
                description: "Average patient wait times",
                icon: <Clock className="h-5 w-5" />,
                frequency: "weekly",
                format: ["PDF", "Excel"],
            },
            {
                id: "department-workload",
                name: "Department Workload",
                description: "Staff and patient load by department",
                icon: <BarChart3 className="h-5 w-5" />,
                frequency: "weekly",
                format: ["PDF", "Excel"],
            },
            {
                id: "emergency-stats",
                name: "Emergency Statistics",
                description: "Emergency cases and response times",
                icon: <AlertCircle className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
        ],
    },
    {
        id: "clinical",
        name: "Clinical Reports",
        icon: <Stethoscope className="h-5 w-5" />,
        color: "bg-purple-500",
        reports: [
            {
                id: "lab-summary",
                name: "Laboratory Summary",
                description: "Test volumes and turnaround times",
                icon: <TestTube className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
            {
                id: "radiology-report",
                name: "Radiology Report",
                description: "Imaging studies performed",
                icon: <Activity className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
            {
                id: "prescription-analysis",
                name: "Prescription Analysis",
                description: "Medication prescribing patterns",
                icon: <Pill className="h-5 w-5" />,
                frequency: "weekly",
                format: ["PDF", "Excel"],
            },
            {
                id: "surgery-report",
                name: "Surgery Report",
                description: "Surgical procedures summary",
                icon: <Activity className="h-5 w-5" />,
                frequency: "weekly",
                format: ["PDF", "Excel"],
            },
            {
                id: "mortality-morbidity",
                name: "Mortality & Morbidity",
                description: "Clinical outcomes analysis",
                icon: <FileText className="h-5 w-5" />,
                frequency: "monthly",
                format: ["PDF"],
            },
        ],
    },
    {
        id: "pharmacy",
        name: "Pharmacy Reports",
        icon: <Pill className="h-5 w-5" />,
        color: "bg-cyan-500",
        reports: [
            {
                id: "stock-summary",
                name: "Stock Summary Report",
                description: "Current inventory levels",
                icon: <BarChart3 className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
            {
                id: "expiry-report",
                name: "Expiry Alert Report",
                description: "Medicines nearing expiry",
                icon: <AlertCircle className="h-5 w-5" />,
                frequency: "weekly",
                format: ["PDF", "Excel"],
            },
            {
                id: "consumption-report",
                name: "Consumption Report",
                description: "Medicine consumption patterns",
                icon: <LineChart className="h-5 w-5" />,
                frequency: "weekly",
                format: ["PDF", "Excel"],
            },
            {
                id: "purchase-report",
                name: "Purchase Report",
                description: "Procurement and supplier data",
                icon: <Receipt className="h-5 w-5" />,
                frequency: "monthly",
                format: ["PDF", "Excel", "CSV"],
            },
            {
                id: "dispensing-report",
                name: "Dispensing Report",
                description: "Medicine dispensing records",
                icon: <Pill className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
        ],
    },
    {
        id: "hr",
        name: "HR & Staff Reports",
        icon: <UserCheck className="h-5 w-5" />,
        color: "bg-pink-500",
        reports: [
            {
                id: "staff-attendance",
                name: "Staff Attendance Report",
                description: "Daily attendance summary",
                icon: <CheckCircle className="h-5 w-5" />,
                frequency: "daily",
                format: ["PDF", "Excel"],
            },
            {
                id: "duty-roster",
                name: "Duty Roster Report",
                description: "Shift schedules and assignments",
                icon: <CalendarDays className="h-5 w-5" />,
                frequency: "weekly",
                format: ["PDF", "Excel"],
            },
            {
                id: "leave-report",
                name: "Leave Report",
                description: "Staff leave records",
                icon: <Calendar className="h-5 w-5" />,
                frequency: "monthly",
                format: ["PDF", "Excel"],
            },
            {
                id: "performance-report",
                name: "Performance Report",
                description: "Staff performance metrics",
                icon: <TrendingUp className="h-5 w-5" />,
                frequency: "monthly",
                format: ["PDF"],
            },
        ],
    },
];

// Dashboard Stats
const dashboardStats = {
    totalReports: 156,
    generatedToday: 24,
    scheduledReports: 12,
    pendingReports: 3,
    revenueThisMonth: 24500000,
    revenueGrowth: 12.5,
    patientsThisMonth: 4523,
    patientGrowth: 8.3,
    bedOccupancy: 78,
    avgWaitTime: 18,
};

// Recent Reports
const recentReports = [
    { id: 1, name: 'Daily Revenue Summary', generatedAt: '2024-01-15 09:00', generatedBy: 'System', format: 'PDF', size: '245 KB' },
    { id: 2, name: 'OPD Summary Report', generatedAt: '2024-01-15 08:30', generatedBy: 'Dr. Rajesh Kumar', format: 'Excel', size: '1.2 MB' },
    { id: 3, name: 'Bed Occupancy Report', generatedAt: '2024-01-15 08:00', generatedBy: 'System', format: 'PDF', size: '156 KB' },
    { id: 4, name: 'Laboratory Summary', generatedAt: '2024-01-14 18:00', generatedBy: 'System', format: 'PDF', size: '328 KB' },
    { id: 5, name: 'Stock Summary Report', generatedAt: '2024-01-14 17:30', generatedBy: 'Dr. Lakshmi Rao', format: 'Excel', size: '892 KB' },
];

// Scheduled Reports
const scheduledReports = [
    { id: 1, name: 'Daily Revenue Summary', schedule: 'Daily at 9:00 AM', nextRun: '2024-01-16 09:00', recipients: 3, status: 'active' },
    { id: 2, name: 'Weekly Department Report', schedule: 'Every Monday at 8:00 AM', nextRun: '2024-01-22 08:00', recipients: 5, status: 'active' },
    { id: 3, name: 'Monthly Financial Report', schedule: '1st of every month', nextRun: '2024-02-01 09:00', recipients: 4, status: 'active' },
    { id: 4, name: 'Bed Occupancy Report', schedule: 'Daily at 7:00 AM', nextRun: '2024-01-16 07:00', recipients: 2, status: 'paused' },
];

function StatCard({ title, value, icon, trend, trendValue, color }) {
    return (
        <div>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{title}</p>
                            <p className="text-2xl font-bold">{value}</p>
                            {trend && trendValue && (
                                <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                    <span>{trendValue}</span>
                                </div>
                            )}
                        </div>
                        <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center text-white`}>
                            {icon}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function Reports() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [dateRange, setDateRange] = useState('today');
    const [exportFormat, setExportFormat] = useState('pdf');
    const handleGenerateReport = (report) => {
        setSelectedReport(report);
        setGenerateDialogOpen(true);
    };


    const handleConfirmGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setGenerateDialogOpen(false);
            toast.success(`${selectedReport.name} generated successfully`);
        }, 2000);
    };

    const getFrequencyBadge = (frequency) => {
        switch (frequency) {
            case "daily":
                return (
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        Daily
                    </Badge>
                );

            case "weekly":
                return (
                    <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                        Weekly
                    </Badge>
                );

            case "monthly":
                return (
                    <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                        Monthly
                    </Badge>
                );

            default:
                return <Badge variant="secondary">On-demand</Badge>;
        }
    };


    const filteredCategories = selectedCategory === 'all'
        ? reportCategories
        : reportCategories.filter(c => c.id === selectedCategory);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Generate, schedule, and manage hospital reports</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                    <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Report
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="reports">All Reports</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Monthly Revenue"
                            value={`₹${(dashboardStats.revenueThisMonth / 100000).toFixed(1)}L`}
                            icon={<IndianRupee className="h-6 w-6" />}
                            trend="up"
                            trendValue={`+${dashboardStats.revenueGrowth}%`}
                            color="bg-green-500"
                        />
                        <StatCard
                            title="Patients This Month"
                            value={dashboardStats.patientsThisMonth.toLocaleString()}
                            icon={<Users className="h-6 w-6" />}
                            trend="up"
                            trendValue={`+${dashboardStats.patientGrowth}%`}
                            color="bg-blue-500"
                        />
                        <StatCard
                            title="Bed Occupancy"
                            value={`${dashboardStats.bedOccupancy}%`}
                            icon={<Bed className="h-6 w-6" />}
                            color="bg-amber-500"
                        />
                        <StatCard
                            title="Avg Wait Time"
                            value={`${dashboardStats.avgWaitTime} min`}
                            icon={<Clock className="h-6 w-6" />}
                            color="bg-purple-500"
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <LineChart className="h-5 w-5" />
                                    Revenue Trend
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                                    <div className="text-center">
                                        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                                        <p className="text-muted-foreground">Revenue chart visualization</p>
                                        <p className="text-xs text-muted-foreground mt-1">Last 30 days trend</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChart className="h-5 w-5" />
                                    Department Distribution
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { name: 'Cardiology', value: 28, color: 'bg-red-500' },
                                    { name: 'Neurology', value: 22, color: 'bg-purple-500' },
                                    { name: 'Orthopedics', value: 18, color: 'bg-green-500' },
                                    { name: 'Pediatrics', value: 17, color: 'bg-pink-500' },
                                    { name: 'Others', value: 15, color: 'bg-gray-500' },
                                ].map((dept) => (
                                    <div key={dept.name} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-3 w-3 rounded-full ${dept.color}`} />
                                                <span>{dept.name}</span>
                                            </div>
                                            <span className="font-medium">{dept.value}%</span>
                                        </div>
                                        <Progress value={dept.value} className="h-1.5" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Reports & Recent Activity */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Reports</CardTitle>
                                <CardDescription>Frequently generated reports</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    { name: 'Daily Revenue Summary', icon: <IndianRupee className="h-4 w-4" />, color: 'bg-green-500' },
                                    { name: 'OPD Summary', icon: <Stethoscope className="h-4 w-4" />, color: 'bg-blue-500' },
                                    { name: 'Bed Occupancy', icon: <Bed className="h-4 w-4" />, color: 'bg-amber-500' },
                                    { name: 'Lab Summary', icon: <TestTube className="h-4 w-4" />, color: 'bg-purple-500' },
                                ].map((report, index) => (
                                    <div

                                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                                        onClick={() => handleGenerateReport({ name: report.name })}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`h-8 w-8 rounded-lg ${report.color}/10 flex items-center justify-center ${report.color.replace('bg-', 'text-')}`}>
                                                {report.icon}
                                            </div>
                                            <span className="font-medium">{report.name}</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Reports</CardTitle>
                                <CardDescription>Last generated reports</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[280px]">
                                    <div className="space-y-3">
                                        {recentReports.map((report, index) => (
                                            <div
                                                className="flex items-center justify-between p-3 rounded-lg border"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                                                        {report.format === 'PDF' ? (
                                                            <FileText className="h-4 w-4 text-red-500" />
                                                        ) : (
                                                            <FileSpreadsheet className="h-4 w-4 text-green-500" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm">{report.name}</p>
                                                        <p className="text-xs text-muted-foreground">{report.generatedAt}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-xs">{report.size}</Badge>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* All Reports Tab */}
                <TabsContent value="reports" className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {reportCategories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-6">
                        {filteredCategories.map((category, catIndex) => (
                            <div>
                                <Card>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-lg ${category.color}/10 flex items-center justify-center ${category.color.replace('bg-', 'text-')}`}>
                                                {category.icon}
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">{category.name}</CardTitle>
                                                <CardDescription>{category.reports.length} reports available</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                            {category.reports.map((report, index) => (
                                                <div

                                                    className="p-4 rounded-lg border hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group"
                                                    onClick={() => handleGenerateReport(report)}
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className={`h-9 w-9 rounded-lg ${category.color}/10 flex items-center justify-center ${category.color.replace('bg-', 'text-')}`}>
                                                            {report.icon}
                                                        </div>
                                                        {getFrequencyBadge(report.frequency)}
                                                    </div>
                                                    <h4 className="font-semibold group-hover:text-primary transition-colors">{report.name}</h4>
                                                    <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                                                    <div className="flex items-center gap-2 mt-3">
                                                        {report.format.map((f) => (
                                                            <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* Scheduled Tab */}
                <TabsContent value="scheduled" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Scheduled Reports</CardTitle>
                                    <CardDescription>Automated report generation schedules</CardDescription>
                                </div>
                                <Button>
                                    <Calendar className="h-4 w-4 mr-2" />
                                    New Schedule
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {scheduledReports.map((report, index) => (
                                    <div

                                        className="flex items-center justify-between p-4 rounded-lg border"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${report.status === 'active' ? 'bg-green-500/10' : 'bg-muted'}`}>
                                                <Calendar className={`h-5 w-5 ${report.status === 'active' ? 'text-green-600' : 'text-muted-foreground'}`} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{report.name}</h4>
                                                <p className="text-sm text-muted-foreground">{report.schedule}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm font-medium">Next: {report.nextRun}</p>
                                                <p className="text-xs text-muted-foreground">{report.recipients} recipients</p>
                                            </div>
                                            <Badge className={report.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}>
                                                {report.status === 'active' ? 'Active' : 'Paused'}
                                            </Badge>
                                            <Button variant="ghost" size="icon">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Report History</CardTitle>
                                    <CardDescription>Previously generated reports</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Select defaultValue="7days">
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="today">Today</SelectItem>
                                            <SelectItem value="7days">Last 7 days</SelectItem>
                                            <SelectItem value="30days">Last 30 days</SelectItem>
                                            <SelectItem value="90days">Last 90 days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentReports.concat(recentReports).map((report, index) => (
                                    <div

                                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                                {report.format === 'PDF' ? (
                                                    <FileText className="h-5 w-5 text-red-500" />
                                                ) : (
                                                    <FileSpreadsheet className="h-5 w-5 text-green-500" />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-medium">{report.name}</h4>
                                                <p className="text-sm text-muted-foreground">Generated by {report.generatedBy}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm">{report.generatedAt}</p>
                                                <p className="text-xs text-muted-foreground">{report.size}</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Share2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Generate Report Dialog */}
            <Dialog open={generateDialogOpen} onOpenChange={setGenerateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Generate Report</DialogTitle>
                        <DialogDescription>
                            Configure and generate {selectedReport?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Date Range</Label>
                            <Select value={dateRange} onValueChange={setDateRange}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="yesterday">Yesterday</SelectItem>
                                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                                    <SelectItem value="thisMonth">This Month</SelectItem>
                                    <SelectItem value="lastMonth">Last Month</SelectItem>
                                    <SelectItem value="custom">Custom Range</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Export Format</Label>
                            <Select value={exportFormat} onValueChange={setExportFormat}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pdf">PDF Document</SelectItem>
                                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                                    <SelectItem value="csv">CSV File</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                            <Label>Delivery Options</Label>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="download" defaultChecked />
                                <label htmlFor="download" className="text-sm">Download immediately</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="email" />
                                <label htmlFor="email" className="text-sm">Send via email</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="print" />
                                <label htmlFor="print" className="text-sm">Print report</label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setGenerateDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleConfirmGenerate} disabled={isGenerating}>
                            {isGenerating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Download className="h-4 w-4 mr-2" />
                                    Generate Report
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
