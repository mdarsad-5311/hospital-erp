import { useState } from "react"
import {
    TestTube,
    Plus,
    Search,
    FileText,
    Droplet,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    TrendingUp,
    Package,
    Filter,
    RefreshCw,
    Eye,
    Edit,
    Printer,
    BarChart3,
    FlaskConical,
    Thermometer,
    AlertTriangle,
    NotebookPen
} from "lucide-react";

import Button from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Input from "../components/ui/input"
import Badge from "../components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../components/ui/table';
import { NewTestRequestDialog } from
    "/src/components/laboratory/NewTestRequestDialog";

// import { SampleCollectionDialog, SampleCollectionData } from '/src/components/laboratory/SampleCollectionDialog';
// import { ResultEntryDialog, ResultEntryData } from '@/components/laboratory/ResultEntryDialog';
// import { LabReportsDialog } from '@/components/laboratory/LabReportsDialog';

// Mock Data
const mockTestRequests = [
    {
        id: "TR-001",
        patientId: "P-001",
        patientName: "John Smith",
        doctorName: "Dr. James Anderson",
        department: "General Medicine",
        priority: "routine",
        tests: ["Complete Blood Count (CBC)", "Lipid Profile"],
        status: "pending",
        createdAt: "2024-01-15 09:30 AM",
        fasting: true,
    },
    {
        id: "TR-002",
        patientId: "P-002",
        patientName: "Sarah Johnson",
        doctorName: "Dr. Lisa Chen",
        department: "Cardiology",
        priority: "urgent",
        tests: ["Troponin I", "BNP", "ECG"],
        status: "sample-collected",
        createdAt: "2024-01-15 10:15 AM",
        fasting: false,
    },
    {
        id: "TR-003",
        patientId: "P-003",
        patientName: "Michael Brown",
        doctorName: "Dr. Ahmed Hassan",
        department: "Orthopedics",
        priority: "stat",
        tests: ["CBC", "ESR", "CRP"],
        status: "processing",
        createdAt: "2024-01-15 11:00 AM",
        fasting: false,
    },
    {
        id: "TR-004",
        patientId: "P-004",
        patientName: "Emily Davis",
        doctorName: "Dr. Maria Garcia",
        department: "Pediatrics",
        priority: "routine",
        tests: ["Thyroid Profile (T3, T4, TSH)"],
        status: "completed",
        createdAt: "2024-01-15 08:00 AM",
        fasting: true,
    },
];

const mockSamples = [
    {
        id: "S-001",
        sampleId: "SMP-20240115-ABC123",
        testRequestId: "TR-002",
        patientName: "Sarah Johnson",
        patientId: "P-002",
        sampleType: "Blood (Venous)",
        collectedBy: "John Doe - Lab Technician",
        collectionTime: "2024-01-15 10:30 AM",
        condition: "Good",
        status: "processing",
        tests: ["Troponin I", "BNP"],
    },
    {
        id: "S-002",
        sampleId: "SMP-20240115-DEF456",
        testRequestId: "TR-003",
        patientName: "Michael Brown",
        patientId: "P-003",
        sampleType: "Blood (Venous)",
        collectedBy: "Jane Smith - Phlebotomist",
        collectionTime: "2024-01-15 11:15 AM",
        condition: "Good",
        status: "collected",
        tests: ["CBC", "ESR", "CRP"],
    },
];

const mockResults = [
    {
        id: "R-001",
        sampleId: "SMP-20240115-GHI789",
        patientName: "Emily Davis",
        patientId: "P-004",
        testName: "TSH",
        result: "2.5",
        unit: "mIU/L",
        normalRange: "0.4-4.0",
        status: "normal",
        verifiedBy: "Dr. Sarah Johnson",
        completedAt: "2024-01-15 12:30 PM",
    },
    {
        id: "R-002",
        sampleId: "SMP-20240115-GHI789",
        patientName: "Emily Davis",
        patientId: "P-004",
        testName: "T4",
        result: "8.5",
        unit: "mcg/dL",
        normalRange: "5.0-12.0",
        status: "normal",
        verifiedBy: "Dr. Sarah Johnson",
        completedAt: "2024-01-15 12:30 PM",
    },
    {
        id: "R-003",
        sampleId: "SMP-20240115-JKL012",
        patientName: "Robert Wilson",
        patientId: "P-005",
        testName: "HbA1c",
        result: "7.8",
        unit: "%",
        normalRange: "< 5.7",
        status: "abnormal",
        verifiedBy: "Dr. Michael Lee",
        completedAt: "2024-01-15 11:00 AM",
    },
    {
        id: "R-004",
        sampleId: "SMP-20240115-MNO345",
        patientName: "Alice Green",
        patientId: "P-006",
        testName: "Potassium",
        result: "6.2",
        unit: "mEq/L",
        normalRange: "3.5-5.0",
        status: "critical",
        verifiedBy: "Dr. Emily Brown",
        completedAt: "2024-01-15 10:45 AM",
    },
];


const mockInventory = [
    {
        id: "INV-001",
        name: "Blood Collection Tubes (EDTA)",
        category: "Consumables",
        quantity: 500,
        unit: "pcs",
        minStock: 100,
        expiryDate: "2025-06-15",
        status: "in-stock",
    },
    {
        id: "INV-002",
        name: "Reagent - Glucose",
        category: "Reagents",
        quantity: 50,
        unit: "mL",
        minStock: 100,
        expiryDate: "2024-03-20",
        status: "low-stock",
    },
    {
        id: "INV-003",
        name: "Syringes (5mL)",
        category: "Consumables",
        quantity: 0,
        unit: "pcs",
        minStock: 200,
        expiryDate: "2026-01-01",
        status: "out-of-stock",
    },
    {
        id: "INV-004",
        name: "Control Serum",
        category: "Quality Control",
        quantity: 10,
        unit: "vials",
        minStock: 5,
        expiryDate: "2024-01-10",
        status: "expired",
    },
    {
        id: "INV-005",
        name: "Lancets",
        category: "Consumables",
        quantity: 1000,
        unit: "pcs",
        minStock: 200,
        expiryDate: "2025-12-31",
        status: "in-stock",
    },
];





const getStatusBadge = (status) => {
    switch (status) {
        case "pending":
            return <Badge className="border-orange-500 text-orange-500">Pending</Badge>;
        case "sample-collected":
            return <Badge className="border-blue-500 text-blue-500">Sample Collected</Badge>;
        case "processing":
            return <Badge className="border-purple-500 text-purple-500">Processing</Badge>;
        case "completed":
            return <Badge className="border-green-500 text-green-500">Completed</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

const getResultStatusBadge = (status) => {
    switch (status) {
        case "normal":
            return <Badge className="border-green-500 text-green-500">Normal</Badge>;
        case "abnormal":
            return <Badge className="border-orange-500 text-orange-500">Abnormal</Badge>;
        case "critical":
            return <Badge className="border-destructive text-destructive">Critical</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};
const getPriorityBadge = (priority) => {
    switch (priority) {
        case "routine":
            return <Badge variant="secondary">Routine</Badge>;
        case "urgent":
            return <Badge className="border-orange-500 text-orange-500">Urgent</Badge>;
        case "stat":
            return <Badge className="border-destructive text-destructive">STAT</Badge>;
        default:
            return <Badge variant="secondary">{priority}</Badge>;
    }
};

const getInventoryStatusBadge = (status) => {
    switch (status) {
        case "in-stock":
            return <Badge className="border-green-500 text-green-500">In Stock</Badge>;
        case "low-stock":
            return <Badge className="border-orange-500 text-orange-500">Low Stock</Badge>;
        case "out-of-stock":
            return <Badge className="border-destructive text-destructive">Out of Stock</Badge>;
        case "expired":
            return <Badge className="border-destructive text-destructive">Expired</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};
const handleCollectSample = (request) => {
    setSelectedRequest(request);
    setSampleDialogOpen(true);
};
const handleEnterResults = (sample) => {
    setSelectedSample(sample);
    setResultDialogOpen(true);
};


// Stats
const stats = [
    { title: 'Pending Tests', value: 24, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { title: 'In Progress', value: 18, icon: RefreshCw, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Completed Today', value: 89, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Critical Results', value: 3, icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
];



export default function Laboratory() {
    const [activeTab, setActiveTab] = useState('requests');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [newTestDialogOpen, setNewTestDialogOpen] = useState(false);

    // ✅ THIS FUNCTION MUST BE HERE
    const handleNewTestRequest = (data) => {
        console.log("New Test Request:", data);
    };
    const [sampleDialogOpen, setSampleDialogOpen] = useState(false);
    const [resultDialogOpen, setResultDialogOpen] = useState(false);
    const [reportsDialogOpen, setReportsDialogOpen] = useState(false);

    const [testRequests, setTestRequests] = useState(mockTestRequests);
    const [samples, setSamples] = useState(mockSamples);
    // const [results, setResult] = useState("mockResult")
    const [inventory] = useState(mockInventory);
    const filteredRequests = testRequests.filter(req => {
        const matchesSearch =
            req.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || req.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    const [results, setResults] = useState(mockResults);





    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                        <TestTube className="h-8 w-8 text-primary" />
                        Laboratory
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage lab tests, samples, and results
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Reports
                    </Button>

                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Test Request
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card
                        key={stat.title}
                        className="border-border/50 bg-card/50 backdrop-blur-sm"
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mt-3">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                </div>

                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {/* Main Content */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <CardHeader className="pb-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 gap-4">
                            <TabsList className="bg-muted/50">
                                <TabsTrigger value="requests" className="gap-2">
                                    <FileText className="h-4 w-4" />
                                    Test Requests
                                </TabsTrigger>
                                <TabsTrigger value="samples" className="gap-2">
                                    <Droplet className="h-4 w-4" />
                                    Samples
                                </TabsTrigger>
                                <TabsTrigger value="results" className="gap-2">
                                    <FlaskConical className="h-4 w-4" />
                                    Results
                                </TabsTrigger>
                                <TabsTrigger value="inventory" className="gap-2">
                                    <Package className="h-4 w-4" />
                                    Inventory
                                </TabsTrigger>
                            </TabsList>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 w-64"
                                    />
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-40">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Filter" />

                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="sample-collected">Sample Collected</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <TabsContent value="requests" className="mt-0">
                            <div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Request ID</TableHead>
                                            <TableHead>Patient</TableHead>
                                            <TableHead>Doctor</TableHead>
                                            <TableHead>Tests</TableHead>
                                            <TableHead>Priority</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredRequests.map((request) => (
                                            <TableRow key={request.id}>
                                                <TableCell className="font-mono font-medium">{request.id}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{request.patientName}</p>
                                                        <p className="text-sm text-muted-foreground">{request.patientId}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{request.doctorName}</p>
                                                        <p className="text-sm text-muted-foreground">{request.department}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {request.tests.slice(0, 2).map(test => (
                                                            <Badge key={test} variant="outline" className="text-xs">
                                                                {test.length > 15 ? test.slice(0, 15) + '...' : test}
                                                            </Badge>
                                                        ))}
                                                        {request.tests.length > 2 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{request.tests.length - 2}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                                                <TableCell>{getStatusBadge(request.status)}</TableCell>
                                                <TableCell className="text-sm text-muted-foreground">{request.createdAt}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {request.status === 'pending' && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="gap-1"
                                                                onClick={() => handleCollectSample(request)}
                                                            >
                                                                <Droplet className="h-3 w-3" />
                                                                Collect
                                                            </Button>
                                                        )}
                                                        <Button size="sm" variant="ghost">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="sm" variant="ghost">
                                                            <Printer className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                        </TabsContent>
                        {/* Samples Tab */}
                        <TabsContent value="samples" className="mt-0">
                            <div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Sample ID</TableHead>
                                            <TableHead>Patient</TableHead>
                                            <TableHead>Sample Type</TableHead>
                                            <TableHead>Tests</TableHead>
                                            <TableHead>Collected By</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {samples.map((sample) => (
                                            <TableRow key={sample.id}>
                                                <TableCell className="font-mono font-medium">{sample.sampleId}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{sample.patientName}</p>
                                                        <p className="text-sm text-muted-foreground">{sample.patientId}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Thermometer className="h-4 w-4 text-primary" />
                                                        {sample.sampleType}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {sample.tests.slice(0, 2).map(test => (
                                                            <Badge key={test} variant="outline" className="text-xs">
                                                                {test}
                                                            </Badge>
                                                        ))}
                                                        {sample.tests.length > 2 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{sample.tests.length - 2}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm">{sample.collectedBy}</TableCell>
                                                <TableCell>{getStatusBadge(sample.status)}</TableCell>
                                                <TableCell className="text-sm text-muted-foreground">{sample.collectionTime}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {(sample.status === 'collected' || sample.status === 'processing') && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="gap-1"
                                                                onClick={() => handleEnterResults(sample)}
                                                            >
                                                                <Edit className="h-3 w-3" />
                                                                Enter Results
                                                            </Button>
                                                        )}
                                                        <Button size="sm" variant="ghost">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        {/* Results Tab */}
                        <TabsContent value="results" className="mt-0">
                            <div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Patient</TableHead>
                                            <TableHead>Test Name</TableHead>
                                            <TableHead>Result</TableHead>
                                            <TableHead>Normal Range</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Verified By</TableHead>
                                            <TableHead>Completed</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {results.map((result) => (
                                            <TableRow key={result.id} className={result.status === 'critical' ? 'bg-destructive/5' : ''}>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{result.patientName}</p>
                                                        <p className="text-sm text-muted-foreground">{result.patientId}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">{result.testName}</TableCell>
                                                <TableCell>
                                                    <span className={`font-bold ${result.status === 'critical' ? 'text-destructive' :
                                                        result.status === 'abnormal' ? 'text-orange-500' : ''
                                                        }`}>
                                                        {result.result} {result.unit}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">{result.normalRange}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {result.status === 'critical' && (
                                                            <AlertTriangle className="h-4 w-4 text-destructive" />
                                                        )}
                                                        {getResultStatusBadge(result.status)}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm">{result.verifiedBy}</TableCell>
                                                <TableCell className="text-sm text-muted-foreground">{result.completedAt}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button size="sm" variant="ghost">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="sm" variant="ghost">
                                                            <Printer className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                        {/* Inventory Tab */}
                        <TabsContent value="inventory" className="mt-0">
                            <div>
                                <div className="mb-4 flex items-center justify-end">
                                    <Button variant="outline" className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Item
                                    </Button>
                                </div>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Item Name</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Min Stock</TableHead>
                                            <TableHead>Expiry Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {inventory.map((item) => (
                                            <TableRow key={item.id} className={
                                                item.status === 'expired' || item.status === 'out-of-stock' ? 'bg-destructive/5' :
                                                    item.status === 'low-stock' ? 'bg-orange-500/5' : ''
                                            }>
                                                <TableCell className="font-medium">{item.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{item.category}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <span className={`font-bold ${item.quantity === 0 ? 'text-destructive' :
                                                        item.quantity < item.minStock ? 'text-orange-500' : ''
                                                        }`}>
                                                        {item.quantity} {item.unit}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">{item.minStock} {item.unit}</TableCell>
                                                <TableCell className={new Date(item.expiryDate) < new Date() ? 'text-destructive' : 'text-muted-foreground'}>
                                                    {item.expiryDate}
                                                </TableCell>
                                                <TableCell>{getInventoryStatusBadge(item.status)}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button size="sm" variant="ghost">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="sm" variant="ghost">
                                                            <TrendingUp className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                    </CardContent>
                </Tabs>
            </Card>
            {/* next */}
            {/* Dialogs */}

            {/* <NewTestRequestDialog
                open={newTestDialogOpen}
                onOpenChange={setNewTestDialogOpen}
                onSubmit={handleNewTestRequest}
            /> */}
         {/* <SampleCollectionDialog
                open={sampleDialogOpen}
                onOpenChange={setSampleDialogOpen}
                testRequest={
                    selectedRequest && {
                        id: selectedRequest.id,
                        patientName: selectedRequest.patientName,
                        patientId: selectedRequest.patientId,
                        tests: selectedRequest.tests,
                    }
                }
                onSubmit={handleSampleCollection}
            />  */}

            {/* <ResultEntryDialog
                open={resultDialogOpen}
                onOpenChange={setResultDialogOpen}
                sample={
                    selectedSample && {
                        id: selectedSample.id,
                        sampleId: selectedSample.sampleId,
                        patientName: selectedSample.patientName,
                        patientId: selectedSample.patientId,
                        tests: selectedSample.tests,
                    }
                }
                onSubmit={handleResultEntry}
            />

            <LabReportsDialog
                open={reportsDialogOpen}
                onOpenChange={setReportsDialogOpen}
            /> */}

        </div>
    )
}
