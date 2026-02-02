import { useState } from "react";
import {
    DollarSign,
    Receipt,
    CreditCard,
    TrendingUp,
    Search,
    Filter,
    Plus,
    FileText,
    MoreVertical,
    Download,
    Printer,
    Eye,
    CheckCircle,
    Clock,
    AlertCircle,
    XCircle,
    Calendar,
    User,
    Building2,
    Wallet,
    PiggyBank,
    ArrowUpRight,
    ArrowDownRight,
    BadgePercent,
    Send,
    RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Badge from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
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
// import { NewInvoiceDialog } from "@/components/billing/NewInvoiceDialog";
// import { PaymentDialog } from "@/components/billing/PaymentDialog";
// import { InvoiceDetailsDialog } from "@/components/billing/InvoiceDetailsDialog";
// import { ExportBillingDialog } from "@/components/billing/ExportBillingDialog";
import { useToast } from "../hooks/use-toast";


// Mock Data
const mockInvoices = [
    {
        id: "1",
        invoiceNumber: "INV-2024-001",
        patientId: "PAT-2024-001",
        patientName: "Rahul Sharma",
        patientType: "OPD",
        date: "2024-01-15",
        dueDate: "2024-01-22",
        items: [
            { id: "1", description: "General Consultation", category: "consultation", quantity: 1, unitPrice: 500, total: 500 },
            { id: "2", description: "Blood Test - CBC", category: "lab", quantity: 1, unitPrice: 350, total: 350 },
            { id: "3", description: "Paracetamol 500mg x 10", category: "pharmacy", quantity: 1, unitPrice: 50, total: 50 },
        ],
        subtotal: 900,
        discount: 90,
        tax: 0,
        total: 810,
        paid: 810,
        balance: 0,
        status: "paid",
        paymentMethod: "UPI"
    },
    {
        id: "2",
        invoiceNumber: "INV-2024-002",
        patientId: "PAT-2024-015",
        patientName: "Priya Patel",
        patientType: "IPD",
        date: "2024-01-14",
        dueDate: "2024-01-21",
        items: [
            { id: "1", description: "Cardiac Consultation", category: "consultation", quantity: 1, unitPrice: 1500, total: 1500 },
            { id: "2", description: "ECG", category: "procedure", quantity: 1, unitPrice: 800, total: 800 },
            { id: "3", description: "2D Echo", category: "procedure", quantity: 1, unitPrice: 2500, total: 2500 },
            { id: "4", description: "Private Room (3 nights)", category: "room", quantity: 3, unitPrice: 3000, total: 9000 },
        ],
        subtotal: 13800,
        discount: 1380,
        tax: 0,
        total: 12420,
        paid: 5000,
        balance: 7420,
        status: "partial",
        paymentMethod: "Card",
        insuranceClaim: {
            id: "CLM-001",
            provider: "Star Health Insurance",
            policyNumber: "SH-2024-78542",
            claimAmount: 7420,
            status: "submitted"
        }
    },
    {
        id: "3",
        invoiceNumber: "INV-2024-003",
        patientId: "PAT-2024-042",
        patientName: "Mohammed Ali",
        patientType: "OPD",
        date: "2024-01-10",
        dueDate: "2024-01-17",
        items: [
            { id: "1", description: "Orthopedic Consultation", category: "consultation", quantity: 1, unitPrice: 800, total: 800 },
            { id: "2", description: "X-Ray - Spine", category: "procedure", quantity: 1, unitPrice: 600, total: 600 },
        ],
        subtotal: 1400,
        discount: 0,
        tax: 0,
        total: 1400,
        paid: 0,
        balance: 1400,
        status: "overdue"
    },
    {
        id: "4",
        invoiceNumber: "INV-2024-004",
        patientId: "PAT-2024-078",
        patientName: "Anita Desai",
        patientType: "OPD",
        date: "2024-01-16",
        dueDate: "2024-01-23",
        items: [
            { id: "1", description: "Emergency Consultation", category: "consultation", quantity: 1, unitPrice: 1200, total: 1200 },
            { id: "2", description: "Ultrasound - Abdomen", category: "procedure", quantity: 1, unitPrice: 1500, total: 1500 },
        ],
        subtotal: 2700,
        discount: 270,
        tax: 0,
        total: 2430,
        paid: 0,
        balance: 2430,
        status: "pending"
    },
    {
        id: "5",
        invoiceNumber: "INV-2024-005",
        patientId: "PAT-2024-023",
        patientName: "Sanjay Gupta",
        patientType: "IPD",
        date: "2024-01-12",
        dueDate: "2024-01-19",
        items: [
            { id: "1", description: "Surgery - Appendectomy", category: "procedure", quantity: 1, unitPrice: 45000, total: 45000 },
            { id: "2", description: "General Ward (5 nights)", category: "room", quantity: 5, unitPrice: 1500, total: 7500 },
            { id: "3", description: "Medicines & Consumables", category: "pharmacy", quantity: 1, unitPrice: 5500, total: 5500 },
        ],
        subtotal: 58000,
        discount: 5800,
        tax: 0,
        total: 52200,
        paid: 52200,
        balance: 0,
        status: "paid",
        paymentMethod: "Insurance",
        insuranceClaim: {
            id: "CLM-002",
            provider: "ICICI Lombard",
            policyNumber: "IL-2024-45632",
            claimAmount: 52200,
            status: "approved",
            approvedAmount: 52200
        }
    }
];

const mockPayments = [
    {
        id: "1",
        invoiceId: "1",
        invoiceNumber: "INV-2024-001",
        patientName: "Rahul Sharma",
        amount: 810,
        method: "upi",
        date: "2024-01-15",
        time: "10:30 AM",
        receivedBy: "Reception",
        transactionId: "UPI-789456123"
    },
    {
        id: "2",
        invoiceId: "2",
        invoiceNumber: "INV-2024-002",
        patientName: "Priya Patel",
        amount: 5000,
        method: "card",
        date: "2024-01-14",
        time: "03:45 PM",
        receivedBy: "Billing Counter",
        transactionId: "TXN-456789123"
    },
    {
        id: "3",
        invoiceId: "5",
        invoiceNumber: "INV-2024-005",
        patientName: "Sanjay Gupta",
        amount: 52200,
        method: "insurance",
        date: "2024-01-18",
        time: "11:00 AM",
        receivedBy: "Insurance Desk",
        transactionId: "CLM-002-APPROVED"
    }
];
const getStatusColor = (status) => {
    switch (status) {
        case "paid":
            return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
        case "partial":
            return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
        case "pending":
            return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
        case "overdue":
            return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
        case "cancelled":
            return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case "paid":
            return <CheckCircle className="h-4 w-4" />;
        case "partial":
            return <Clock className="h-4 w-4" />;
        case "pending":
            return <Clock className="h-4 w-4" />;
        case "overdue":
            return <AlertCircle className="h-4 w-4" />;
        case "cancelled":
            return <XCircle className="h-4 w-4" />;
        default:
            return null;
    }
};

const getPaymentMethodIcon = (method) => {
    switch (method) {
        case "cash":
            return <Wallet className="h-4 w-4" />;
        case "card":
            return <CreditCard className="h-4 w-4" />;
        case "upi":
            return <DollarSign className="h-4 w-4" />;
        case "insurance":
            return <Building2 className="h-4 w-4" />;
        case "bank_transfer":
            return <Building2 className="h-4 w-4" />;
        default:
            return <DollarSign className="h-4 w-4" />;
    }
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const Billing = () => {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [patientTypeFilter, setPatientTypeFilter] = useState("all");
    const [activeTab, setActiveTab] = useState("invoices");
    const [newInvoiceOpen, setNewInvoiceOpen] = useState(false);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [invoiceDetailsOpen, setInvoiceDetailsOpen] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);
    // const [selectedInvoice, setSelectedInvoice] = useState < Invoice | null > (null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const filteredInvoices = mockInvoices.filter(invoice => {
        const matchesSearch =
            invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            invoice.patientId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
        const matchesType = patientTypeFilter === "all" || invoice.patientType === patientTypeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    const stats = {
        totalRevenue: mockInvoices.reduce((sum, inv) => sum + inv.paid, 0),
        pendingAmount: mockInvoices.reduce((sum, inv) => sum + inv.balance, 0),
        totalInvoices: mockInvoices.length,
        paidInvoices: mockInvoices.filter(inv => inv.status === "paid").length,
        overdueAmount: mockInvoices.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.balance, 0),
        todayCollection: 15430,
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsRefreshing(false);
        toast({
            title: "Data Refreshed",
            description: "Billing data has been updated successfully.",
        });
    };

    const handleViewInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        setInvoiceDetailsOpen(true);
    };

    const handleReceivePayment = (invoice) => {
        setSelectedInvoice(invoice);
        setPaymentOpen(true);
    };

    const handlePrintInvoice = (invoice) => {
        toast({
            title: "Printing Invoice",
            description: `Invoice ${invoice.invoiceNumber} sent to printer.`,
        });
    };

    const handleDownloadInvoice = (invoice) => {
        const content = `
INVOICE: ${invoice.invoiceNumber}
======================================
Patient: ${invoice.patientName}
Patient ID: ${invoice.patientId}
Date: ${invoice.date}
Due Date: ${invoice.dueDate}
Type: ${invoice.patientType}

ITEMS:
${invoice.items
                .map(
                    (item) =>
                        `- ${item.description}: ${formatCurrency(item.total)}`
                )
                .join("\n")}

--------------------------------------
Subtotal: ${formatCurrency(invoice.subtotal)}
Discount: ${formatCurrency(invoice.discount)}
Tax: ${formatCurrency(invoice.tax)}
--------------------------------------
TOTAL: ${formatCurrency(invoice.total)}
Paid: ${formatCurrency(invoice.paid)}
Balance: ${formatCurrency(invoice.balance)}
Status: ${invoice.status.toUpperCase()}
  `.trim();

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${invoice.invoiceNumber}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
            title: "Invoice Downloaded",
            description: `${invoice.invoiceNumber} has been downloaded.`,
        });
    };

    const handleSendInvoice = (invoice) => {
        toast({
            title: "Invoice Sent",
            description: `Invoice ${invoice.invoiceNumber} has been sent to ${invoice.patientName}.`,
        });
    };

    const handleCancelInvoice = (invoice) => {
        toast({
            title: "Invoice Cancelled",
            description: `Invoice ${invoice.invoiceNumber} has been cancelled.`,
            variant: "destructive",
        });
    };

    const handleUpdateInsuranceStatus = (invoice) => {
        toast({
            title: "Status Updated",
            description: `Insurance claim for ${invoice.insuranceClaim?.provider} has been refreshed.`,
        });
    };

    const handleGenerateReport = (reportType) => {
        toast({
            title: "Generating Report",
            description: `${reportType} is being generated. Download will start shortly.`,
        });

        setTimeout(() => {
            const content = `
${reportType.toUpperCase()}
Generated: ${new Date().toLocaleString()}
======================================

This is a sample ${reportType.toLowerCase()}.
In a production environment, this would contain actual billing data.

Summary:
- Total Revenue: ${formatCurrency(stats.totalRevenue)}
- Pending Amount: ${formatCurrency(stats.pendingAmount)}
- Overdue Amount: ${formatCurrency(stats.overdueAmount)}
- Total Invoices: ${stats.totalInvoices}
- Paid Invoices: ${stats.paidInvoices}
    `.trim();

            const blob = new Blob([content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${reportType
                .replace(/\s+/g, "_")
                .toLowerCase()}_${new Date().toISOString().split("T")[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast({
                title: "Report Ready",
                description: `${reportType} has been downloaded.`,
            });
        }, 1500);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Billing & Payments</h1>
                    <p className="text-muted-foreground">Manage invoices, payments, and financial records</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                    >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={() => setExportOpen(true)}>
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button className="gap-2 bg-gradient-to-br from-green-600 to-indigo-800 hover:bg-primary/90" onClick={() => setNewInvoiceOpen(true)}>
                        <Plus className="h-4 w-4" />
                        New Invoice
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-500/5 to-transparent">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                    <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalRevenue)}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                                        <span className="text-xs text-emerald-600 dark:text-emerald-400">+12.5% from last month</span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-500/5 to-transparent">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Today's Collection</p>
                                    <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.todayCollection)}</p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">8 transactions</p>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <Wallet className="h-6 w-6 text-blue-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-500/5 to-transparent">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
                                    <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.pendingAmount)}</p>
                                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">{mockInvoices.filter(i => i.status === "pending" || i.status === "partial").length} invoices pending</p>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-amber-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-500/5 to-transparent">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Overdue Amount</p>
                                    <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.overdueAmount)}</p>
                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">{mockInvoices.filter(i => i.status === "overdue").length} invoices overdue</p>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                                    <AlertCircle className="h-6 w-6 text-red-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Receipt className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Invoices</p>
                                <p className="text-xl font-bold">{stats.totalInvoices}</p>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Paid Invoices</p>
                                <p className="text-xl font-bold">{stats.paidInvoices}</p>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Insurance Claims</p>
                                <p className="text-xl font-bold">{mockInvoices.filter(i => i.insuranceClaim).length}</p>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <BadgePercent className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Discounts Given</p>
                                <p className="text-xl font-bold">{formatCurrency(mockInvoices.reduce((sum, inv) => sum + inv.discount, 0))}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="invoices" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList className="bg-muted/50 p-1">
                    <TabsTrigger value="invoices" className="gap-2">
                        <Receipt className="h-4 w-4" />
                        Invoices
                    </TabsTrigger>
                    <TabsTrigger value="payments" className="gap-2">
                        <CreditCard className="h-4 w-4" />
                        Payments
                    </TabsTrigger>
                    <TabsTrigger value="insurance" className="gap-2">
                        <Building2 className="h-4 w-4" />
                        Insurance Claims
                    </TabsTrigger>
                    <TabsTrigger value="reports" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Reports
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="invoices" className="space-y-4">
                    {/* Filters */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by patient name, invoice number, or ID..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="partial">Partial</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="overdue">Overdue</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={patientTypeFilter} onValueChange={setPatientTypeFilter}>
                                        <SelectTrigger className="w-[130px]">
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Types</SelectItem>
                                            <SelectItem value="OPD">OPD</SelectItem>
                                            <SelectItem value="IPD">IPD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Invoices Table */}
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30">
                                        <TableHead>Invoice</TableHead>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Paid</TableHead>
                                        <TableHead className="text-right">Balance</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* <AnimatePresence> */}
                                    {filteredInvoices.map((invoice, index) => (
                                        <tr

                                            className="group hover:bg-muted/30 transition-colors"
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Receipt className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">{invoice.invoiceNumber}</p>
                                                        <p className="text-xs text-muted-foreground">{invoice.patientId}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                            {invoice.patientName.split(" ").map(n => n[0]).join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{invoice.patientName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={invoice.patientType === "IPD" ? "border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400" : ""}>
                                                    {invoice.patientType}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="text-sm">{new Date(invoice.date).toLocaleDateString()}</p>
                                                    <p className="text-xs text-muted-foreground">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-medium">{formatCurrency(invoice.total)}</TableCell>
                                            <TableCell className="text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(invoice.paid)}</TableCell>
                                            <TableCell className="text-right">
                                                {invoice.balance > 0 ? (
                                                    <span className="text-amber-600 dark:text-amber-400 font-medium">{formatCurrency(invoice.balance)}</span>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={`gap-1 ${getStatusColor(invoice.status)}`}>
                                                    {getStatusIcon(invoice.status)}
                                                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
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
                                                        <DropdownMenuItem onClick={() => handleViewInvoice(invoice)}>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        {invoice.balance > 0 && (
                                                            <DropdownMenuItem onClick={() => handleReceivePayment(invoice)}>
                                                                <CreditCard className="h-4 w-4 mr-2" />
                                                                Receive Payment
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem onClick={() => handlePrintInvoice(invoice)}>
                                                            <Printer className="h-4 w-4 mr-2" />
                                                            Print Invoice
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDownloadInvoice(invoice)}>
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Download PDF
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleSendInvoice(invoice)}>
                                                            <Send className="h-4 w-4 mr-2" />
                                                            Send to Patient
                                                        </DropdownMenuItem>
                                                        {invoice.status !== "paid" && invoice.status !== "cancelled" && (
                                                            <>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-destructive" onClick={() => handleCancelInvoice(invoice)}>
                                                                    <XCircle className="h-4 w-4 mr-2" />
                                                                    Cancel Invoice
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </tr>
                                    ))}
                                    {/* </AnimatePresence> */}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Payments</CardTitle>
                            <CardDescription>All payment transactions received</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30">
                                        <TableHead>Transaction</TableHead>
                                        <TableHead>Invoice</TableHead>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead>Received By</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockPayments.map((payment, index) => (
                                        <tr

                                            className="hover:bg-muted/30 transition-colors"
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                                        {getPaymentMethodIcon(payment.method)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">{payment.transactionId || `TXN-${payment.id}`}</p>
                                                        <p className="text-xs text-muted-foreground capitalize">{payment.method.replace("_", " ")}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium text-primary">{payment.invoiceNumber}</span>
                                            </TableCell>
                                            <TableCell>{payment.patientName}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="capitalize gap-1">
                                                    {getPaymentMethodIcon(payment.method)}
                                                    {payment.method.replace("_", " ")}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="text-sm">{new Date(payment.date).toLocaleDateString()}</p>
                                                    <p className="text-xs text-muted-foreground">{payment.time}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-bold text-emerald-600 dark:text-emerald-400">
                                                {formatCurrency(payment.amount)}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{payment.receivedBy}</TableCell>
                                        </tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="insurance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Insurance Claims</CardTitle>
                            <CardDescription>Track insurance claim status and settlements</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockInvoices.filter(inv => inv.insuranceClaim).map((invoice, index) => (
                                    <div

                                        className="p-4 rounded-xl border bg-card hover:shadow-md transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                                    <Building2 className="h-6 w-6 text-blue-500" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold">{invoice.insuranceClaim?.provider}</h3>
                                                        <Badge className={
                                                            invoice.insuranceClaim?.status === "approved"
                                                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                                : invoice.insuranceClaim?.status === "rejected"
                                                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                                    : invoice.insuranceClaim?.status === "submitted"
                                                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                        }>
                                                            {invoice.insuranceClaim?.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        Policy: {invoice.insuranceClaim?.policyNumber} • {invoice.patientName}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="text-sm text-muted-foreground">Claim Amount</p>
                                                    <p className="font-bold">{formatCurrency(invoice.insuranceClaim?.claimAmount || 0)}</p>
                                                </div>
                                                {invoice.insuranceClaim?.approvedAmount && (
                                                    <div className="text-right">
                                                        <p className="text-sm text-muted-foreground">Approved</p>
                                                        <p className="font-bold text-emerald-600">{formatCurrency(invoice.insuranceClaim.approvedAmount)}</p>
                                                    </div>
                                                )}
                                                <Button variant="outline" size="sm" onClick={() => handleUpdateInsuranceStatus(invoice)}>
                                                    <RefreshCw className="h-4 w-4 mr-2" />
                                                    Update Status
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="p-6 cursor-pointer hover:shadow-md transition-all hover:border-primary/50" onClick={() => handleGenerateReport("Daily Collection Report")}>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Daily Collection Report</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Summary of all payments received today</p>
                                    <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                                        Generate Report →
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 cursor-pointer hover:shadow-md transition-all hover:border-primary/50" onClick={() => handleGenerateReport("Outstanding Dues Report")}>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-amber-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Outstanding Dues Report</h3>
                                    <p className="text-sm text-muted-foreground mt-1">List of all pending and overdue invoices</p>
                                    <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                                        Generate Report →
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 cursor-pointer hover:shadow-md transition-all hover:border-primary/50" onClick={() => handleGenerateReport("Insurance Claims Report")}>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Insurance Claims Report</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Status of all insurance claims</p>
                                    <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                                        Generate Report →
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 cursor-pointer hover:shadow-md transition-all hover:border-primary/50" onClick={() => handleGenerateReport("Revenue Analysis")}>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Revenue Analysis</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Monthly and yearly revenue breakdown</p>
                                    <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                                        Generate Report →
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 cursor-pointer hover:shadow-md transition-all hover:border-primary/50" onClick={() => handleGenerateReport("Discount Report")}>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                    <BadgePercent className="h-6 w-6 text-purple-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Discount Report</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Summary of all discounts applied</p>
                                    <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                                        Generate Report →
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 cursor-pointer hover:shadow-md transition-all hover:border-primary/50" onClick={() => handleGenerateReport("Department-wise Billing")}>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                                    <Receipt className="h-6 w-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Department-wise Billing</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Revenue breakdown by department</p>
                                    <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                                        Generate Report →
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Dialogs
            <NewInvoiceDialog open={newInvoiceOpen} onOpenChange={setNewInvoiceOpen} />
            <PaymentDialog open={paymentOpen} onOpenChange={setPaymentOpen} invoice={selectedInvoice} />
            <InvoiceDetailsDialog open={invoiceDetailsOpen} onOpenChange={setInvoiceDetailsOpen} invoice={selectedInvoice} />
            <ExportBillingDialog open={exportOpen} onOpenChange={setExportOpen} /> */}
        </div>
    );
};

export default Billing;

