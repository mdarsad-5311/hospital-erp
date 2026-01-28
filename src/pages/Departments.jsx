import { useState } from 'react';
import {
    Building2,
    Plus,
    Search,
    Filter,
    Users,
    UserCheck,
    Bed,
    Activity,
    TrendingUp,
    TrendingDown,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Download,
    UserPlus,
    Stethoscope,
    HeartPulse,
    Brain,
    Bone,
    Baby,
    Siren,
    Microscope,
    Pill,
    FlaskConical,
    X,
    Phone,
    Mail,
    Clock,
    Calendar,
    ChevronRight,
    BarChart3,
    PieChart,
    Settings,
    CheckCircle,
    AlertCircle,
    Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import Badge from '../components/ui/badge';
import {Progress} from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import  {Label} from '../components/ui/label';
import {Textarea} from '../components/ui/textarea';
import {Switch} from '../components/ui/switch';
import {ScrollArea} from '../components/ui/scroll-area';
import {Separator} from '../components/ui/separator';
import { toast } from 'sonner';

// Mock data
const mockDepartments = [
    {
        id: 'DEP-001',
        name: 'Cardiology',
        code: 'CARD',
        head: {
            id: 'STF-001',
            name: 'Dr. Rajesh Kumar',
            role: 'Head of Department',
            email: 'rajesh.kumar@hospital.com',
            phone: '+91 98765 43210',
            joinDate: '2015-03-15',
            status: 'active',
            shift: 'morning'
        },
        icon: <HeartPulse className="h-5 w-5" />,
        color: 'bg-red-500',
        description: 'Specialized in diagnosis and treatment of heart diseases and cardiovascular conditions.',
        location: 'Building A, Floor 3',
        phone: '+91 80 1234 5601',
        email: 'cardiology@hospital.com',
        establishedDate: '2010-01-15',
        status: 'active',
        capacity: {
            beds: 60,
            occupiedBeds: 45,
            opd: 100,
            currentOpd: 78
        },
        staff: {
            doctors: 12,
            nurses: 24,
            technicians: 8,
            support: 6
        },
        stats: {
            patientsToday: 45,
            patientsThisMonth: 892,
            avgWaitTime: 18,
            satisfactionRate: 94.5,
            revenue: 2450000
        },
        services: ['ECG', 'Echocardiography', 'Angiography', 'Pacemaker Implantation', 'Heart Surgery'],
        equipment: ['ECG Machines', 'Echo Machines', 'Cath Lab', 'Holter Monitors'],
        staffList: [
            { id: 'STF-001', name: 'Dr. Rajesh Kumar', role: 'Head of Department', email: 'rajesh.kumar@hospital.com', phone: '+91 98765 43210', joinDate: '2015-03-15', status: 'active', shift: 'morning' },
            { id: 'STF-002', name: 'Dr. Priya Sharma', role: 'Senior Cardiologist', email: 'priya.sharma@hospital.com', phone: '+91 98765 43211', joinDate: '2017-06-20', status: 'active', shift: 'morning' },
            { id: 'STF-003', name: 'Dr. Amit Verma', role: 'Cardiologist', email: 'amit.verma@hospital.com', phone: '+91 98765 43212', joinDate: '2019-09-10', status: 'active', shift: 'afternoon' },
            { id: 'STF-004', name: 'Nurse Sunita Devi', role: 'Head Nurse', email: 'sunita.devi@hospital.com', phone: '+91 98765 43213', joinDate: '2016-02-28', status: 'active', shift: 'rotating' },
        ]
    },
    {
        id: 'DEP-002',
        name: 'Neurology',
        code: 'NEUR',
        head: {
            id: 'STF-010',
            name: 'Dr. Meera Nair',
            role: 'Head of Department',
            email: 'meera.nair@hospital.com',
            phone: '+91 98765 43220',
            joinDate: '2014-07-10',
            status: 'active',
            shift: 'morning'
        },
        icon: <Brain className="h-5 w-5" />,
        color: 'bg-purple-500',
        description: 'Expert care for brain, spine, and nervous system disorders.',
        location: 'Building A, Floor 4',
        phone: '+91 80 1234 5602',
        email: 'neurology@hospital.com',
        establishedDate: '2011-06-20',
        status: 'active',
        capacity: {
            beds: 40,
            occupiedBeds: 32,
            opd: 80,
            currentOpd: 56
        },
        staff: {
            doctors: 8,
            nurses: 18,
            technicians: 6,
            support: 4
        },
        stats: {
            patientsToday: 32,
            patientsThisMonth: 654,
            avgWaitTime: 22,
            satisfactionRate: 92.8,
            revenue: 1890000
        },
        services: ['EEG', 'EMG', 'Stroke Care', 'Epilepsy Treatment', 'Brain Surgery'],
        equipment: ['EEG Machines', 'MRI Scanner', 'CT Scanner', 'EMG Equipment'],
        staffList: [
            { id: 'STF-010', name: 'Dr. Meera Nair', role: 'Head of Department', email: 'meera.nair@hospital.com', phone: '+91 98765 43220', joinDate: '2014-07-10', status: 'active', shift: 'morning' },
            { id: 'STF-011', name: 'Dr. Sanjay Gupta', role: 'Senior Neurologist', email: 'sanjay.gupta@hospital.com', phone: '+91 98765 43221', joinDate: '2016-11-15', status: 'active', shift: 'morning' },
        ]
    },
    {
        id: 'DEP-003',
        name: 'Orthopedics',
        code: 'ORTH',
        head: {
            id: 'STF-020',
            name: 'Dr. Vikram Singh',
            role: 'Head of Department',
            email: 'vikram.singh@hospital.com',
            phone: '+91 98765 43230',
            joinDate: '2013-04-05',
            status: 'active',
            shift: 'morning'
        },
        icon: <Bone className="h-5 w-5" />,
        color: 'bg-green-500',
        description: 'Comprehensive bone, joint, and muscle care including sports medicine.',
        location: 'Building B, Floor 2',
        phone: '+91 80 1234 5603',
        email: 'orthopedics@hospital.com',
        establishedDate: '2010-01-15',
        status: 'active',
        capacity: {
            beds: 35,
            occupiedBeds: 28,
            opd: 70,
            currentOpd: 52
        },
        staff: {
            doctors: 7,
            nurses: 14,
            technicians: 5,
            support: 4
        },
        stats: {
            patientsToday: 38,
            patientsThisMonth: 745,
            avgWaitTime: 15,
            satisfactionRate: 96.2,
            revenue: 2120000
        },
        services: ['Joint Replacement', 'Spine Surgery', 'Sports Medicine', 'Fracture Care', 'Arthroscopy'],
        equipment: ['X-ray Machines', 'Arthroscopy Equipment', 'Bone Densitometer'],
        staffList: [
            { id: 'STF-020', name: 'Dr. Vikram Singh', role: 'Head of Department', email: 'vikram.singh@hospital.com', phone: '+91 98765 43230', joinDate: '2013-04-05', status: 'active', shift: 'morning' },
        ]
    },
    {
        id: 'DEP-004',
        name: 'Pediatrics',
        code: 'PEDI',
        head: {
            id: 'STF-030',
            name: 'Dr. Anita Desai',
            role: 'Head of Department',
            email: 'anita.desai@hospital.com',
            phone: '+91 98765 43240',
            joinDate: '2012-08-12',
            status: 'active',
            shift: 'morning'
        },
        icon: <Baby className="h-5 w-5" />,
        color: 'bg-pink-500',
        description: 'Specialized healthcare for infants, children, and adolescents.',
        location: 'Building C, Floor 1',
        phone: '+91 80 1234 5604',
        email: 'pediatrics@hospital.com',
        establishedDate: '2010-01-15',
        status: 'active',
        capacity: {
            beds: 50,
            occupiedBeds: 38,
            opd: 120,
            currentOpd: 95
        },
        staff: {
            doctors: 10,
            nurses: 22,
            technicians: 4,
            support: 5
        },
        stats: {
            patientsToday: 52,
            patientsThisMonth: 1023,
            avgWaitTime: 12,
            satisfactionRate: 97.1,
            revenue: 1650000
        },
        services: ['Well-child Visits', 'Vaccinations', 'NICU', 'Pediatric Surgery', 'Developmental Assessment'],
        equipment: ['Infant Warmers', 'Pediatric Ventilators', 'NICU Equipment'],
        staffList: [
            { id: 'STF-030', name: 'Dr. Anita Desai', role: 'Head of Department', email: 'anita.desai@hospital.com', phone: '+91 98765 43240', joinDate: '2012-08-12', status: 'active', shift: 'morning' },
        ]
    },
    {
        id: 'DEP-005',
        name: 'Emergency',
        code: 'EMER',
        head: {
            id: 'STF-040',
            name: 'Dr. Karthik Menon',
            role: 'Head of Department',
            email: 'karthik.menon@hospital.com',
            phone: '+91 98765 43250',
            joinDate: '2015-01-20',
            status: 'active',
            shift: 'rotating'
        },
        icon: <Siren className="h-5 w-5" />,
        color: 'bg-orange-500',
        description: '24/7 emergency care with state-of-the-art trauma facilities.',
        location: 'Building A, Ground Floor',
        phone: '+91 80 1234 5605',
        email: 'emergency@hospital.com',
        establishedDate: '2010-01-15',
        status: 'active',
        capacity: {
            beds: 20,
            occupiedBeds: 15,
            opd: 200,
            currentOpd: 142
        },
        staff: {
            doctors: 15,
            nurses: 30,
            technicians: 10,
            support: 8
        },
        stats: {
            patientsToday: 68,
            patientsThisMonth: 1876,
            avgWaitTime: 5,
            satisfactionRate: 91.3,
            revenue: 3200000
        },
        services: ['Trauma Care', 'Critical Care', 'Ambulance Services', 'Resuscitation', 'Emergency Surgery'],
        equipment: ['Defibrillators', 'Ventilators', 'Trauma Beds', 'Mobile X-ray'],
        staffList: [
            { id: 'STF-040', name: 'Dr. Karthik Menon', role: 'Head of Department', email: 'karthik.menon@hospital.com', phone: '+91 98765 43250', joinDate: '2015-01-20', status: 'active', shift: 'rotating' },
        ]
    },
    {
        id: 'DEP-006',
        name: 'Laboratory',
        code: 'LAB',
        head: {
            id: 'STF-050',
            name: 'Dr. Suresh Patil',
            role: 'Head of Department',
            email: 'suresh.patil@hospital.com',
            phone: '+91 98765 43260',
            joinDate: '2016-05-10',
            status: 'active',
            shift: 'morning'
        },
        icon: <FlaskConical className="h-5 w-5" />,
        color: 'bg-cyan-500',
        description: 'Advanced diagnostic laboratory with comprehensive testing facilities.',
        location: 'Building D, Floor 1',
        phone: '+91 80 1234 5606',
        email: 'laboratory@hospital.com',
        establishedDate: '2010-01-15',
        status: 'active',
        capacity: {
            beds: 0,
            occupiedBeds: 0,
            opd: 500,
            currentOpd: 342
        },
        staff: {
            doctors: 4,
            nurses: 2,
            technicians: 20,
            support: 6
        },
        stats: {
            patientsToday: 156,
            patientsThisMonth: 4523,
            avgWaitTime: 30,
            satisfactionRate: 93.8,
            revenue: 1450000
        },
        services: ['Blood Tests', 'Microbiology', 'Histopathology', 'Biochemistry', 'Immunology'],
        equipment: ['Automated Analyzers', 'Centrifuges', 'Microscopes', 'PCR Machines'],
        staffList: [
            { id: 'STF-050', name: 'Dr. Suresh Patil', role: 'Head of Department', email: 'suresh.patil@hospital.com', phone: '+91 98765 43260', joinDate: '2016-05-10', status: 'active', shift: 'morning' },
        ]
    },
    {
        id: 'DEP-007',
        name: 'Pharmacy',
        code: 'PHAR',
        head: {
            id: 'STF-060',
            name: 'Dr. Lakshmi Rao',
            role: 'Chief Pharmacist',
            email: 'lakshmi.rao@hospital.com',
            phone: '+91 98765 43270',
            joinDate: '2014-09-25',
            status: 'active',
            shift: 'morning'
        },
        icon: <Pill className="h-5 w-5" />,
        color: 'bg-blue-500',
        description: '24/7 pharmacy services with comprehensive medication management.',
        location: 'Building A, Ground Floor',
        phone: '+91 80 1234 5607',
        email: 'pharmacy@hospital.com',
        establishedDate: '2010-01-15',
        status: 'active',
        capacity: {
            beds: 0,
            occupiedBeds: 0,
            opd: 800,
            currentOpd: 534
        },
        staff: {
            doctors: 0,
            nurses: 0,
            technicians: 15,
            support: 5
        },
        stats: {
            patientsToday: 234,
            patientsThisMonth: 6789,
            avgWaitTime: 8,
            satisfactionRate: 95.4,
            revenue: 4500000
        },
        services: ['Prescription Dispensing', 'OTC Medicines', 'Drug Information', 'Inventory Management', 'Clinical Pharmacy'],
        equipment: ['Dispensing Machines', 'Storage Units', 'Refrigerators', 'Label Printers'],
        staffList: [
            { id: 'STF-060', name: 'Dr. Lakshmi Rao', role: 'Chief Pharmacist', email: 'lakshmi.rao@hospital.com', phone: '+91 98765 43270', joinDate: '2014-09-25', status: 'active', shift: 'morning' },
        ]
    },
    {
        id: 'DEP-008',
        name: 'Radiology',
        code: 'RADI',
        head: {
            id: 'STF-070',
            name: 'Dr. Arun Krishnan',
            role: 'Head of Department',
            email: 'arun.krishnan@hospital.com',
            phone: '+91 98765 43280',
            joinDate: '2013-11-15',
            status: 'active',
            shift: 'morning'
        },
        icon: <Microscope className="h-5 w-5" />,
        color: 'bg-amber-500',
        description: 'Advanced imaging services including MRI, CT, X-ray, and Ultrasound.',
        location: 'Building D, Ground Floor',
        phone: '+91 80 1234 5608',
        email: 'radiology@hospital.com',
        establishedDate: '2011-03-10',
        status: 'active',
        capacity: {
            beds: 0,
            occupiedBeds: 0,
            opd: 150,
            currentOpd: 98
        },
        staff: {
            doctors: 6,
            nurses: 4,
            technicians: 12,
            support: 4
        },
        stats: {
            patientsToday: 78,
            patientsThisMonth: 2145,
            avgWaitTime: 25,
            satisfactionRate: 94.2,
            revenue: 2890000
        },
        services: ['X-ray', 'CT Scan', 'MRI', 'Ultrasound', 'Mammography', 'Fluoroscopy'],
        equipment: ['MRI Scanner', 'CT Scanner', 'X-ray Machines', 'Ultrasound Machines', 'Mammography Unit'],
        staffList: [
            { id: 'STF-070', name: 'Dr. Arun Krishnan', role: 'Head of Department', email: 'arun.krishnan@hospital.com', phone: '+91 98765 43280', joinDate: '2013-11-15', status: 'active', shift: 'morning' },
        ]
    },
];
// Stats Card Component
function DeptStatCard({
    title,
    value,
    icon,
    trend,
    trendValue,
    color,
}) {
    return (
        <div>
            <Card className="overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{title}</p>
                            <p className="text-2xl font-bold">{value}</p>
                            {trend && trendValue && (
                                <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                                    }`}>
                                    {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
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

export default function Departments() {
    const [departments] = useState(mockDepartments);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState ('all');
    const [selectedDepartment, setSelectedDepartment] = useState (null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [addStaffDialogOpen, setAddStaffDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Calculate totals
    const totalDepartments = departments.length;
    const activeDepartments = departments.filter(d => d.status === 'active').length;
    const totalStaff = departments.reduce((sum, d) => sum + d.staff.doctors + d.staff.nurses + d.staff.technicians + d.staff.support, 0);
    const totalBeds = departments.reduce((sum, d) => sum + d.capacity.beds, 0);
    const occupiedBeds = departments.reduce((sum, d) => sum + d.capacity.occupiedBeds, 0);
    const totalPatientsToday = departments.reduce((sum, d) => sum + d.stats.patientsToday, 0);
    const totalRevenue = departments.reduce((sum, d) => sum + d.stats.revenue, 0);

    // Filter departments
    const filteredDepartments = departments.filter(dept => {
        const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dept.head.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || dept.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleViewDepartment = (dept) => {
        setSelectedDepartment(dept);
        setViewDialogOpen(true);
    };

    const handleExport = () => {
        toast.success("Department data exported successfully");
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return (
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        Active
                    </Badge>
                );
            case "inactive":
                return <Badge variant="secondary">Inactive</Badge>;
            case "under-maintenance":
                return (
                    <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                        Maintenance
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getStaffStatusBadge = (status) => {
        switch (status) {
            case "active":
                return (
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        Active
                    </Badge>
                );
            case "on-leave":
                return (
                    <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                        On Leave
                    </Badge>
                );
            case "inactive":
                return <Badge variant="secondary">Inactive</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
                    <p className="text-muted-foreground">Manage hospital departments, staff, and resources</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button onClick={() => setAddDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Department
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DeptStatCard
                    title="Total Departments"
                    value={totalDepartments}
                    icon={<Building2 className="h-6 w-6" />}
                    trend="up"
                    trendValue={`${activeDepartments} active`}
                    color="bg-primary"
                />
                <DeptStatCard
                    title="Total Staff"
                    value={totalStaff.toLocaleString()}
                    icon={<Users className="h-6 w-6" />}
                    trend="up"
                    trendValue="+12 this month"
                    color="bg-blue-500"
                />
                <DeptStatCard
                    title="Bed Occupancy"
                    value={`${Math.round((occupiedBeds / totalBeds) * 100)}%`}
                    icon={<Bed className="h-6 w-6" />}
                    trend="neutral"
                    trendValue={`${occupiedBeds}/${totalBeds} beds`}
                    color="bg-green-500"
                />
                <DeptStatCard
                    title="Patients Today"
                    value={totalPatientsToday.toLocaleString()}
                    icon={<Activity className="h-6 w-6" />}
                    trend="up"
                    trendValue="+8.5% from yesterday"
                    color="bg-amber-500"
                />
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="list">Department List</TabsTrigger>
                    <TabsTrigger value="staff">Staff Directory</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredDepartments.map((dept, index) => (
                            <div>
                                <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                                    onClick={() => handleViewDepartment(dept)}>
                                    <div className={`h-2 ${dept.color}`} />
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-10 w-10 rounded-lg ${dept.color}/10 flex items-center justify-center ${dept.color.replace('bg-', 'text-')}`}>
                                                    {dept.icon}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{dept.name}</CardTitle>
                                                    <CardDescription className="text-xs">{dept.code} • {dept.location}</CardDescription>
                                                </div>
                                            </div>
                                            {getStatusBadge(dept.status)}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="text-xs">{dept.head.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{dept.head.name}</p>
                                                <p className="text-xs text-muted-foreground">Department Head</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="space-y-1">
                                                <p className="text-muted-foreground text-xs">Staff</p>
                                                <p className="font-semibold">{dept.staff.doctors + dept.staff.nurses + dept.staff.technicians + dept.staff.support}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-muted-foreground text-xs">Patients Today</p>
                                                <p className="font-semibold">{dept.stats.patientsToday}</p>
                                            </div>
                                        </div>

                                        {dept.capacity.beds > 0 && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-muted-foreground">Bed Occupancy</span>
                                                    <span className="font-medium">{Math.round((dept.capacity.occupiedBeds / dept.capacity.beds) * 100)}%</span>
                                                </div>
                                                <Progress value={(dept.capacity.occupiedBeds / dept.capacity.beds) * 100} className="h-1.5" />
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-2 border-t">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                <span>Avg. Wait: {dept.stats.avgWaitTime} min</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-green-600">
                                                <CheckCircle className="h-3 w-3" />
                                                <span>{dept.stats.satisfactionRate}% satisfied</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* Department List Tab */}
                <TabsContent value="list" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <CardTitle>All Departments</CardTitle>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search departments..."
                                            className="pl-9 w-[250px]"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="under-maintenance">Maintenance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Head</TableHead>
                                        <TableHead>Staff</TableHead>
                                        <TableHead>Beds</TableHead>
                                        <TableHead>Patients/Month</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredDepartments.map((dept) => (
                                        <TableRow key={dept.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewDepartment(dept)}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-9 w-9 rounded-lg ${dept.color}/10 flex items-center justify-center ${dept.color.replace('bg-', 'text-')}`}>
                                                        {dept.icon}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{dept.name}</p>
                                                        <p className="text-xs text-muted-foreground">{dept.location}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-7 w-7">
                                                        <AvatarFallback className="text-xs">{dept.head.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm">{dept.head.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    <span>{dept.staff.doctors + dept.staff.nurses + dept.staff.technicians + dept.staff.support}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {dept.capacity.beds > 0 ? (
                                                    <span>{dept.capacity.occupiedBeds}/{dept.capacity.beds}</span>
                                                ) : (
                                                    <span className="text-muted-foreground">N/A</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{dept.stats.patientsThisMonth.toLocaleString()}</TableCell>
                                            <TableCell>₹{(dept.stats.revenue / 100000).toFixed(1)}L</TableCell>
                                            <TableCell>{getStatusBadge(dept.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewDepartment(dept); }}>
                                                            <Eye className="h-4 w-4 mr-2" /> View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                                            <Edit className="h-4 w-4 mr-2" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setSelectedDepartment(dept); setAddStaffDialogOpen(true); }}>
                                                            <UserPlus className="h-4 w-4 mr-2" /> Add Staff
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-destructive" onClick={(e) => e.stopPropagation()}>
                                                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Staff Directory Tab */}
                <TabsContent value="staff" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <CardTitle>Staff Directory</CardTitle>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Search staff..." className="pl-9 w-[250px]" />
                                    </div>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Departments</SelectItem>
                                            {departments.map(dept => (
                                                <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Staff Member</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Shift</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {departments.flatMap(dept => dept.staffList.map(staff => ({ ...staff, department: dept.name, deptColor: dept.color }))).map((staff) => (
                                        <TableRow key={staff.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{staff.name}</p>
                                                        <p className="text-xs text-muted-foreground">{staff.id}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{staff.role}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{staff.department}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1 text-xs">
                                                        <Mail className="h-3 w-3" />
                                                        <span className="truncate max-w-[150px]">{staff.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Phone className="h-3 w-3" />
                                                        <span>{staff.phone}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="capitalize">{staff.shift}</Badge>
                                            </TableCell>
                                            <TableCell>{getStaffStatusBadge(staff.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View Profile</DropdownMenuItem>
                                                        <DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Remove</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Revenue by Department
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {departments.slice(0, 5).map((dept, index) => (
                                    <div key={dept.id} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-3 w-3 rounded-full ${dept.color}`} />
                                                <span>{dept.name}</span>
                                            </div>
                                            <span className="font-medium">₹{(dept.stats.revenue / 100000).toFixed(1)}L</span>
                                        </div>
                                        <Progress value={(dept.stats.revenue / totalRevenue) * 100} className="h-2" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChart className="h-5 w-5" />
                                    Staff Distribution
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
                                            <div className="flex items-center gap-2">
                                                <Stethoscope className="h-4 w-4 text-blue-500" />
                                                <span className="text-sm">Doctors</span>
                                            </div>
                                            <span className="font-bold">{departments.reduce((sum, d) => sum + d.staff.doctors, 0)}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-pink-500/10">
                                            <div className="flex items-center gap-2">
                                                <UserCheck className="h-4 w-4 text-pink-500" />
                                                <span className="text-sm">Nurses</span>
                                            </div>
                                            <span className="font-bold">{departments.reduce((sum, d) => sum + d.staff.nurses, 0)}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                                            <div className="flex items-center gap-2">
                                                <FlaskConical className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">Technicians</span>
                                            </div>
                                            <span className="font-bold">{departments.reduce((sum, d) => sum + d.staff.technicians, 0)}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-amber-500" />
                                                <span className="text-sm">Support</span>
                                            </div>
                                            <span className="font-bold">{departments.reduce((sum, d) => sum + d.staff.support, 0)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Patient Satisfaction</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {departments.slice(0, 5).map((dept) => (
                                    <div key={dept.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-8 w-8 rounded-lg ${dept.color}/10 flex items-center justify-center ${dept.color.replace('bg-', 'text-')}`}>
                                                {dept.icon}
                                            </div>
                                            <span className="text-sm font-medium">{dept.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Progress value={dept.stats.satisfactionRate} className="w-24 h-2" />
                                            <span className={`text-sm font-medium ${dept.stats.satisfactionRate >= 95 ? 'text-green-600' : dept.stats.satisfactionRate >= 90 ? 'text-amber-600' : 'text-red-600'}`}>
                                                {dept.stats.satisfactionRate}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Average Wait Times</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {departments.slice(0, 5).map((dept) => (
                                    <div key={dept.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-8 w-8 rounded-lg ${dept.color}/10 flex items-center justify-center ${dept.color.replace('bg-', 'text-')}`}>
                                                {dept.icon}
                                            </div>
                                            <span className="text-sm font-medium">{dept.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className={`text-sm font-medium ${dept.stats.avgWaitTime <= 10 ? 'text-green-600' : dept.stats.avgWaitTime <= 20 ? 'text-amber-600' : 'text-red-600'}`}>
                                                {dept.stats.avgWaitTime} min
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* View Department Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    {selectedDepartment && (
                        <>
                            <DialogHeader>
                                <div className="flex items-center gap-3">
                                    <div className={`h-12 w-12 rounded-xl ${selectedDepartment.color}/10 flex items-center justify-center ${selectedDepartment.color.replace('bg-', 'text-')}`}>
                                        {selectedDepartment.icon}
                                    </div>
                                    <div>
                                        <DialogTitle className="text-xl">{selectedDepartment.name}</DialogTitle>
                                        <DialogDescription>{selectedDepartment.code} • {selectedDepartment.location}</DialogDescription>
                                    </div>
                                </div>
                            </DialogHeader>
                            <ScrollArea className="flex-1 pr-4">
                                <div className="space-y-6 py-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-4 rounded-lg bg-muted/50">
                                            <p className="text-sm text-muted-foreground">Patients Today</p>
                                            <p className="text-2xl font-bold">{selectedDepartment.stats.patientsToday}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-muted/50">
                                            <p className="text-sm text-muted-foreground">This Month</p>
                                            <p className="text-2xl font-bold">{selectedDepartment.stats.patientsThisMonth.toLocaleString()}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-muted/50">
                                            <p className="text-sm text-muted-foreground">Revenue</p>
                                            <p className="text-2xl font-bold">₹{(selectedDepartment.stats.revenue / 100000).toFixed(1)}L</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-muted/50">
                                            <p className="text-sm text-muted-foreground">Satisfaction</p>
                                            <p className="text-2xl font-bold text-green-600">{selectedDepartment.stats.satisfactionRate}%</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-semibold">Description</h4>
                                        <p className="text-muted-foreground">{selectedDepartment.description}</p>
                                    </div>

                                    <Separator />

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <h4 className="font-semibold">Department Head</h4>
                                            <div className="flex items-center gap-4 p-4 rounded-lg border">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarFallback>{selectedDepartment.head.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{selectedDepartment.head.name}</p>
                                                    <p className="text-sm text-muted-foreground">{selectedDepartment.head.role}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Mail className="h-3 w-3 text-muted-foreground" />
                                                        <span className="text-xs">{selectedDepartment.head.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-semibold">Contact Information</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    <span>{selectedDepartment.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                                    <span>{selectedDepartment.email}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                                    <span>{selectedDepartment.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <h4 className="font-semibold">Staff Composition</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 rounded-lg bg-blue-500/10 text-center">
                                                    <p className="text-2xl font-bold text-blue-600">{selectedDepartment.staff.doctors}</p>
                                                    <p className="text-xs text-muted-foreground">Doctors</p>
                                                </div>
                                                <div className="p-3 rounded-lg bg-pink-500/10 text-center">
                                                    <p className="text-2xl font-bold text-pink-600">{selectedDepartment.staff.nurses}</p>
                                                    <p className="text-xs text-muted-foreground">Nurses</p>
                                                </div>
                                                <div className="p-3 rounded-lg bg-green-500/10 text-center">
                                                    <p className="text-2xl font-bold text-green-600">{selectedDepartment.staff.technicians}</p>
                                                    <p className="text-xs text-muted-foreground">Technicians</p>
                                                </div>
                                                <div className="p-3 rounded-lg bg-amber-500/10 text-center">
                                                    <p className="text-2xl font-bold text-amber-600">{selectedDepartment.staff.support}</p>
                                                    <p className="text-xs text-muted-foreground">Support</p>
                                                </div>
                                            </div>
                                        </div>

                                        {selectedDepartment.capacity.beds > 0 && (
                                            <div className="space-y-4">
                                                <h4 className="font-semibold">Capacity</h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <div className="flex justify-between text-sm mb-1">
                                                            <span>Bed Occupancy</span>
                                                            <span className="font-medium">{selectedDepartment.capacity.occupiedBeds}/{selectedDepartment.capacity.beds}</span>
                                                        </div>
                                                        <Progress value={(selectedDepartment.capacity.occupiedBeds / selectedDepartment.capacity.beds) * 100} className="h-2" />
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between text-sm mb-1">
                                                            <span>OPD Capacity</span>
                                                            <span className="font-medium">{selectedDepartment.capacity.currentOpd}/{selectedDepartment.capacity.opd}</span>
                                                        </div>
                                                        <Progress value={(selectedDepartment.capacity.currentOpd / selectedDepartment.capacity.opd) * 100} className="h-2" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <Separator />

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h4 className="font-semibold">Services</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedDepartment.services.map((service) => (
                                                    <Badge key={service} variant="secondary">{service}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-semibold">Equipment</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedDepartment.equipment.map((equip) => (
                                                    <Badge key={equip} variant="outline">{equip}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
                                <Button>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Department
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Add Department Dialog */}
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add New Department</DialogTitle>
                        <DialogDescription>Create a new department in the hospital</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Department Name</Label>
                                <Input placeholder="e.g., Dermatology" />
                            </div>
                            <div className="space-y-2">
                                <Label>Department Code</Label>
                                <Input placeholder="e.g., DERM" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Location</Label>
                                <Input placeholder="e.g., Building A, Floor 2" />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input placeholder="+91 80 1234 5600" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" placeholder="department@hospital.com" />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea placeholder="Brief description of the department..." rows={3} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Bed Capacity</Label>
                                <Input type="number" placeholder="0" />
                            </div>
                            <div className="space-y-2">
                                <Label>OPD Capacity</Label>
                                <Input type="number" placeholder="0" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>Active Status</Label>
                            <Switch defaultChecked />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                        <Button onClick={() => { setAddDialogOpen(false); toast.success('Department created successfully'); }}>
                            Create Department
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Staff Dialog */}
            <Dialog open={addStaffDialogOpen} onOpenChange={setAddStaffDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Staff to {selectedDepartment?.name}</DialogTitle>
                        <DialogDescription>Assign a new staff member to this department</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Staff Name</Label>
                            <Input placeholder="Full name" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="doctor">Doctor</SelectItem>
                                        <SelectItem value="nurse">Nurse</SelectItem>
                                        <SelectItem value="technician">Technician</SelectItem>
                                        <SelectItem value="support">Support Staff</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Shift</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select shift" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="morning">Morning</SelectItem>
                                        <SelectItem value="afternoon">Afternoon</SelectItem>
                                        <SelectItem value="night">Night</SelectItem>
                                        <SelectItem value="rotating">Rotating</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" placeholder="staff@hospital.com" />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input placeholder="+91 98765 43210" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddStaffDialogOpen(false)}>Cancel</Button>
                        <Button onClick={() => { setAddStaffDialogOpen(false); toast.success('Staff member added successfully'); }}>
                            Add Staff
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
