import { useState } from "react";
import {
    Pill,
    Search,
    Plus,
    Package,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    Clock,
    FileText,
    ShoppingCart,
    MoreVertical,
    Filter,
    Download,
    CheckCircle,
    XCircle,
    Eye,
    Edit,
    Trash2,
    Boxes,
    Calendar,
    User,
    Building,
    IndianRupee,
    ScanLine,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import  Button  from "../components/ui/button";
import  Input  from "../components/ui/input";
import  Badge  from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
// import DispenseDialog from "../components/pharmacy/DispenseDialog";
// import AddMedicineDialog from "../components/pharmacy/AddMedicineDialog";
// import ExportPharmacyDialog from "../components/pharmacy/ExportPharmacyDialog";
import { toast } from "../hooks/use-toast";


const mockMedicines = [
    {
        id: "1",
        name: "Paracetamol 500mg",
        genericName: "Acetaminophen",
        category: "Analgesics",
        manufacturer: "Sun Pharma",
        batchNumber: "SP2024A001",
        expiryDate: "2025-12-15",
        quantity: 5000,
        minStock: 1000,
        unitPrice: 2.5,
        unit: "Tablet",
        location: "Rack A-1",
        status: "in-stock",
    },
    {
        id: "2",
        name: "Amoxicillin 250mg",
        genericName: "Amoxicillin",
        category: "Antibiotics",
        manufacturer: "Cipla",
        batchNumber: "CP2024B002",
        expiryDate: "2025-06-20",
        quantity: 250,
        minStock: 500,
        unitPrice: 8.0,
        unit: "Capsule",
        location: "Rack B-3",
        status: "low-stock",
    },
    {
        id: "3",
        name: "Omeprazole 20mg",
        genericName: "Omeprazole",
        category: "Antacids",
        manufacturer: "Dr. Reddy's",
        batchNumber: "DR2024C003",
        expiryDate: "2025-03-10",
        quantity: 800,
        minStock: 300,
        unitPrice: 5.5,
        unit: "Capsule",
        location: "Rack C-2",
        status: "expiring-soon",
    },
    {
        id: "4",
        name: "Metformin 500mg",
        genericName: "Metformin HCl",
        category: "Antidiabetics",
        manufacturer: "Lupin",
        batchNumber: "LP2024D004",
        expiryDate: "2026-01-25",
        quantity: 3500,
        minStock: 800,
        unitPrice: 3.0,
        unit: "Tablet",
        location: "Rack D-1",
        status: "in-stock",
    },
    {
        id: "5",
        name: "Atorvastatin 10mg",
        genericName: "Atorvastatin Calcium",
        category: "Statins",
        manufacturer: "Zydus",
        batchNumber: "ZY2024E005",
        expiryDate: "2025-09-30",
        quantity: 0,
        minStock: 400,
        unitPrice: 12.0,
        unit: "Tablet",
        location: "Rack E-2",
        status: "out-of-stock",
    },
    {
        id: "6",
        name: "Cetirizine 10mg",
        genericName: "Cetirizine HCl",
        category: "Antihistamines",
        manufacturer: "Mankind",
        batchNumber: "MK2024F006",
        expiryDate: "2025-11-15",
        quantity: 2200,
        minStock: 600,
        unitPrice: 4.0,
        unit: "Tablet",
        location: "Rack A-3",
        status: "in-stock",
    },
    {
        id: "7",
        name: "Azithromycin 500mg",
        genericName: "Azithromycin",
        category: "Antibiotics",
        manufacturer: "Alkem",
        batchNumber: "AL2024G007",
        expiryDate: "2025-08-22",
        quantity: 180,
        minStock: 200,
        unitPrice: 45.0,
        unit: "Tablet",
        location: "Rack B-1",
        status: "low-stock",
    },
    {
        id: "8",
        name: "Insulin Glargine",
        genericName: "Insulin Glargine",
        category: "Antidiabetics",
        manufacturer: "Biocon",
        batchNumber: "BC2024H008",
        expiryDate: "2025-04-05",
        quantity: 45,
        minStock: 50,
        unitPrice: 850.0,
        unit: "Vial",
        location: "Cold Storage",
        status: "expiring-soon",
    },
];

const mockPrescriptions = [
    {
        id: "1",
        prescriptionId: "RX-2024-001",
        patientName: "Rajesh Kumar",
        patientId: "PT-001",
        doctorName: "Dr. Sharma",
        department: "General Medicine",
        date: "2024-12-24",
        medicines: [
            { name: "Paracetamol 500mg", dosage: "1-0-1", quantity: 20, duration: "10 days" },
            { name: "Cetirizine 10mg", dosage: "0-0-1", quantity: 10, duration: "10 days" },
        ],
        status: "pending",
        totalAmount: 90,
    },
    {
        id: "2",
        prescriptionId: "RX-2024-002",
        patientName: "Priya Singh",
        patientId: "PT-002",
        doctorName: "Dr. Patel",
        department: "Cardiology",
        date: "2024-12-24",
        medicines: [
            { name: "Atorvastatin 10mg", dosage: "0-0-1", quantity: 30, duration: "30 days" },
            { name: "Metformin 500mg", dosage: "1-0-1", quantity: 60, duration: "30 days" },
        ],
        status: "dispensed",
        totalAmount: 540,
    },
    {
        id: "3",
        prescriptionId: "RX-2024-003",
        patientName: "Amit Verma",
        patientId: "PT-003",
        doctorName: "Dr. Gupta",
        department: "Pulmonology",
        date: "2024-12-24",
        medicines: [
            { name: "Azithromycin 500mg", dosage: "1-0-0", quantity: 5, duration: "5 days" },
            { name: "Paracetamol 500mg", dosage: "1-1-1", quantity: 15, duration: "5 days" },
        ],
        status: "partial",
        totalAmount: 262.5,
    },
    {
        id: "4",
        prescriptionId: "RX-2024-004",
        patientName: "Sneha Reddy",
        patientId: "PT-004",
        doctorName: "Dr. Iyer",
        department: "Endocrinology",
        date: "2024-12-23",
        medicines: [
            { name: "Insulin Glargine", dosage: "As directed", quantity: 2, duration: "60 days" },
        ],
        status: "pending",
        totalAmount: 1700,
    },
];

const mockSuppliers = [
    {
        id: "1",
        name: "MedSupply India Pvt Ltd",
        contact: "+91 98765 43210",
        email: "orders@medsupply.in",
        address: "Plot 45, Industrial Area, Mumbai",
        totalOrders: 156,
        pendingOrders: 3,
    },
    {
        id: "2",
        name: "PharmaCare Distributors",
        contact: "+91 87654 32109",
        email: "supply@pharmacare.com",
        address: "Sector 12, Pharma City, Hyderabad",
        totalOrders: 98,
        pendingOrders: 1,
    },
    {
        id: "3",
        name: "HealthFirst Logistics",
        contact: "+91 76543 21098",
        email: "orders@healthfirst.in",
        address: "Industrial Hub, Ahmedabad",
        totalOrders: 67,
        pendingOrders: 2,
    },
];

const categories = [
    "All Categories",
    "Analgesics",
    "Antibiotics",
    "Antacids",
    "Antidiabetics",
    "Statins",
    "Antihistamines",
    "Cardiovascular",
    "Vitamins",
];

export default function Pharmacy() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [statusFilter, setStatusFilter] = useState("all");
    const [activeTab, setActiveTab] = useState("inventory");
    const [dispenseDialogOpen, setDispenseDialogOpen] = useState(false);

    const [selectedPrescription, setSelectedPrescription] = useState(undefined);

    const [medicines, setMedicines] = useState(mockMedicines);
    const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
    const [addMedicineDialogOpen, setAddMedicineDialogOpen] = useState(false);
    const [exportDialogOpen, setExportDialogOpen] = useState(false);

    const handleDispense = (items, billDetails) => {
        // Update stock quantities
        setMedicines((prev) =>
            prev.map((med) => {
                const item = items.find((i) => i.medicine.name === med.name);
                if (item) {
                    const newQty = med.quantity - item.quantity;
                    return {
                        ...med,
                        quantity: newQty,
                        status:
                            newQty === 0
                                ? "out-of-stock"
                                : newQty < med.minStock
                                    ? "low-stock"
                                    : med.status,
                    };
                }
                return med;
            })
        );

        // Update prescription status
        if (selectedPrescription) {
            setPrescriptions((prev) =>
                prev.map((p) =>
                    p.id === selectedPrescription.id
                        ? { ...p, status: "dispensed" }
                        : p
                )
            );
        }

        toast({
            title: "Dispensed Successfully",
            description: `Bill ${billDetails.billNumber} generated. Stock updated automatically.`,
        });
    };

    const openDispenseDialog = (prescription) => {
        setSelectedPrescription(prescription);
        setDispenseDialogOpen(true);
    };

    const handleAddMedicine = (medicine) => {
        setMedicines((prev) => [medicine, ...prev]);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "in-stock":
                return "bg-success/10 text-success border-success/20";
            case "low-stock":
                return "bg-warning/10 text-warning border-warning/20";
            case "out-of-stock":
                return "bg-destructive/10 text-destructive border-destructive/20";
            case "expiring-soon":
                return "bg-orange-500/10 text-orange-500 border-orange-500/20";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    const getPrescriptionStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-warning/10 text-warning border-warning/20";
            case "dispensed":
                return "bg-success/10 text-success border-success/20";
            case "partial":
                return "bg-primary/10 text-primary border-primary/20";
            case "cancelled":
                return "bg-destructive/10 text-destructive border-destructive/20";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    const filteredMedicines = medicines.filter((medicine) => {
        const matchesSearch =
            medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            medicine.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            categoryFilter === "All Categories" ||
            medicine.category === categoryFilter;

        const matchesStatus =
            statusFilter === "all" || medicine.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const stats = {
        totalMedicines: medicines.length,
        lowStock: medicines.filter((m) => m.status === "low-stock").length,
        outOfStock: medicines.filter((m) => m.status === "out-of-stock").length,
        expiringSoon: medicines.filter((m) => m.status === "expiring-soon").length,
        pendingPrescriptions: prescriptions.filter((p) => p.status === "pending").length,
        todayDispensed: prescriptions.filter((p) => p.status === "dispensed").length,
        totalValue: medicines.reduce(
            (acc, m) => acc + m.quantity * m.unitPrice,
            0
        ),
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pharmacy</h1>
                    <p className="text-muted-foreground">
                        Manage medicine inventory, prescriptions, and suppliers
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setExportDialogOpen(true)}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openDispenseDialog()}>
                        <ScanLine className="mr-2 h-4 w-4" />
                        Dispense
                    </Button>
                    <Button size="sm" onClick={() => setAddMedicineDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Medicine
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div

                >
                    <Card className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Medicines</p>
                                    <p className="text-2xl font-bold">{stats.totalMedicines}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="text-success">+12</span> this month
                                    </p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Pill className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div


                >
                    <Card className="border-l-4 border-l-warning">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                                    <p className="text-2xl font-bold">{stats.lowStock}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="text-warning">Needs attention</span>
                                    </p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                                    <TrendingDown className="h-6 w-6 text-warning" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div

                >
                    <Card className="border-l-4 border-l-destructive">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                                    <p className="text-2xl font-bold">{stats.outOfStock}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="text-destructive">Urgent reorder</span>
                                    </p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                                    <XCircle className="h-6 w-6 text-destructive" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div

                >
                    <Card className="border-l-4 border-l-success">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Stock Value</p>
                                    <p className="text-2xl font-bold">₹{stats.totalValue.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="text-success">+8%</span> from last month
                                    </p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                                    <IndianRupee className="h-6 w-6 text-success" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                    <TabsTrigger value="inventory" className="gap-2">
                        <Package className="h-4 w-4" />
                        <span className="hidden sm:inline">Inventory</span>
                    </TabsTrigger>
                    <TabsTrigger value="prescriptions" className="gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="hidden sm:inline">Prescriptions</span>
                    </TabsTrigger>
                    <TabsTrigger value="orders" className="gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        <span className="hidden sm:inline">Orders</span>
                    </TabsTrigger>
                    <TabsTrigger value="suppliers" className="gap-2">
                        <Building className="h-4 w-4" />
                        <span className="hidden sm:inline">Suppliers</span>
                    </TabsTrigger>
                </TabsList>

                {/* Inventory Tab */}
                <TabsContent value="inventory" className="space-y-4">
                    {/* Filters */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search medicines by name, generic name, or batch..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="in-stock">In Stock</SelectItem>
                                            <SelectItem value="low-stock">Low Stock</SelectItem>
                                            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                            <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Medicine Table */}
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Medicine</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Batch/Expiry</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMedicines.map((medicine, index) => (
                                        <tr

                                            className="group"
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Pill className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{medicine.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {medicine.genericName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{medicine.category}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="text-sm font-medium">{medicine.batchNumber}</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {medicine.expiryDate}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>{medicine.quantity} {medicine.unit}s</span>
                                                    </div>
                                                    <Progress
                                                        value={(medicine.quantity / (medicine.minStock * 2)) * 100}
                                                        className="h-1.5"
                                                    />
                                                    <p className="text-xs text-muted-foreground">
                                                        Min: {medicine.minStock}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">₹{medicine.unitPrice}</span>
                                                <span className="text-muted-foreground text-sm">/{medicine.unit}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(medicine.status)} variant="outline">
                                                    {medicine.status.replace("-", " ")}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" /> View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <ShoppingCart className="mr-2 h-4 w-4" /> Reorder
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Quick Stats Bar */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="bg-orange-500/5 border-orange-500/20">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="h-8 w-8 text-orange-500" />
                                    <div>
                                        <p className="text-sm font-medium">Expiring Soon</p>
                                        <p className="text-2xl font-bold text-orange-500">{stats.expiringSoon}</p>
                                        <p className="text-xs text-muted-foreground">Within 3 months</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-8 w-8 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium">Pending Prescriptions</p>
                                        <p className="text-2xl font-bold text-primary">{stats.pendingPrescriptions}</p>
                                        <p className="text-xs text-muted-foreground">Awaiting dispensing</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-success/5 border-success/20">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-8 w-8 text-success" />
                                    <div>
                                        <p className="text-sm font-medium">Today's Dispensed</p>
                                        <p className="text-2xl font-bold text-success">{stats.todayDispensed}</p>
                                        <p className="text-xs text-muted-foreground">Prescriptions completed</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Prescriptions Tab */}
                <TabsContent value="prescriptions" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Recent Prescriptions</CardTitle>
                                <Button size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Prescription
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {prescriptions.map((prescription, index) => (
                                <div
                                
                                    className="border rounded-lg p-4 hover:bg-accent/5 transition-colors"
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                        <div className="flex items-start gap-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {prescription.patientName.split(" ").map((n) => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold">{prescription.patientName}</p>
                                                    <Badge variant="outline" className="text-xs">
                                                        {prescription.patientId}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {prescription.doctorName} • {prescription.department}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {prescription.medicines.map((med, i) => (
                                                        <Badge key={i} variant="secondary" className="text-xs">
                                                            {med.name} ({med.quantity})
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge
                                                className={getPrescriptionStatusColor(prescription.status)}
                                                variant="outline"
                                            >
                                                {prescription.status}
                                            </Badge>
                                            <p className="text-lg font-bold">₹{prescription.totalAmount}</p>
                                            <p className="text-xs text-muted-foreground">{prescription.date}</p>
                                            <div className="flex gap-2">
                                                {prescription.status === "pending" && (
                                                    <Button
                                                        size="sm"
                                                        className="gap-1"
                                                        onClick={() => openDispenseDialog({
                                                            id: prescription.id,
                                                            patientName: prescription.patientName,
                                                            patientId: prescription.patientId,
                                                            doctorName: prescription.doctorName,
                                                            medicines: prescription.medicines.map(m => ({ name: m.name, quantity: m.quantity })),
                                                        })}
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                        Dispense
                                                    </Button>
                                                )}
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Purchase Orders</CardTitle>
                                <Button size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Order
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        id: "PO-2024-045",
                                        supplier: "MedSupply India",
                                        items: 12,
                                        total: 45000,
                                        status: "pending",
                                        date: "2024-12-24",
                                    },
                                    {
                                        id: "PO-2024-044",
                                        supplier: "PharmaCare Distributors",
                                        items: 8,
                                        total: 28500,
                                        status: "shipped",
                                        date: "2024-12-22",
                                    },
                                    {
                                        id: "PO-2024-043",
                                        supplier: "HealthFirst Logistics",
                                        items: 15,
                                        total: 67800,
                                        status: "delivered",
                                        date: "2024-12-20",
                                    },
                                ].map((order, index) => (
                                    <div

                                        className="flex items-center justify-between border rounded-lg p-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <ShoppingCart className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{order.id}</p>
                                                <p className="text-sm text-muted-foreground">{order.supplier}</p>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-medium">{order.items} items</p>
                                            <p className="text-sm text-muted-foreground">{order.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">₹{order.total.toLocaleString()}</p>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    order.status === "delivered"
                                                        ? "bg-success/10 text-success"
                                                        : order.status === "shipped"
                                                            ? "bg-primary/10 text-primary"
                                                            : "bg-warning/10 text-warning"
                                                }
                                            >
                                                {order.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Suppliers Tab */}
                <TabsContent value="suppliers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Registered Suppliers</CardTitle>
                                <Button size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Supplier
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {mockSuppliers.map((supplier, index) => (
                                    <div>

                                        <Card className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <Building className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>
                                                                <Eye className="mr-2 h-4 w-4" /> View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <ShoppingCart className="mr-2 h-4 w-4" /> New Order
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                                <h3 className="font-semibold mb-1">{supplier.name}</h3>
                                                <p className="text-sm text-muted-foreground mb-3">{supplier.address}</p>
                                                <Separator className="my-3" />
                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div>
                                                        <p className="text-muted-foreground">Total Orders</p>
                                                        <p className="font-semibold">{supplier.totalOrders}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Pending</p>
                                                        <p className="font-semibold text-warning">{supplier.pendingOrders}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex gap-2">
                                                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                                                        {supplier.contact}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* next */}
        </div>
    );
}
