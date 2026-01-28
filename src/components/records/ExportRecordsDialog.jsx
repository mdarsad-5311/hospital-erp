import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog";
import Button from "../ui/button";
import { Label } from "../ui/label";
import  Badge from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    RadioGroup,
    RadioGroupItem,
} from "../ui/radio-group";
import {
    Download,
    FileText,
    FileSpreadsheet,
    File,
    Calendar,
    Loader2,
    CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export function ExportRecordsDialog({
    open,
    onOpenChange,
    patientName,
    patientId,
}) {
    const [exportFormat, setExportFormat] = useState("pdf");
    const [dateRange, setDateRange] = useState("all");
    const [isExporting, setIsExporting] = useState(false);
    const [exportComplete, setExportComplete] = useState(false);

    const [selectedRecords, setSelectedRecords] = useState({
        diagnoses: true,
        prescriptions: true,
        labResults: true,
        vitals: true,
        documents: false,
        summary: true,
    });

    const toggleRecord = (key) => {
        setSelectedRecords((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleExport = async () => {
        const count = Object.values(selectedRecords).filter(Boolean).length;
        if (count === 0) {
            toast.error("Please select at least one record");
            return;
        }

        setIsExporting(true);
        await new Promise((r) => setTimeout(r, 2000));
        setIsExporting(false);
        setExportComplete(true);

        const fileName = `${patientId || "patient"}_records_${new Date()
            .toISOString()
            .split("T")[0]}.${exportFormat}`;

        const content = generateExportContent();
        const blob = new Blob([content], { type: getContentType(exportFormat) });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);

        toast.success("Records exported successfully");

        setTimeout(() => {
            setExportComplete(false);
            onOpenChange(false);
        }, 1200);
    };

    const generateExportContent = () => {
        const list = [];
        if (selectedRecords.summary) list.push("Patient Summary");
        if (selectedRecords.diagnoses) list.push("Diagnoses");
        if (selectedRecords.prescriptions) list.push("Prescriptions");
        if (selectedRecords.labResults) list.push("Lab Results");
        if (selectedRecords.vitals) list.push("Vitals");
        if (selectedRecords.documents) list.push("Documents");

        return `
Medical Records Export
Patient: ${patientName || "Unknown"}
Patient ID: ${patientId || "N/A"}
Date: ${new Date().toLocaleDateString()}

Included Records:
${list.map((i) => `- ${i}`).join("\n")}
    `.trim();
    };

    const getContentType = (format) => {
        if (format === "pdf") return "application/pdf";
        if (format === "csv") return "text/csv";
        if (format === "json") return "application/json";
        return "text/plain";
    };

    const formatIcons = {
        pdf: <FileText className="h-5 w-5" />,
        csv: <FileSpreadsheet className="h-5 w-5" />,
        json: <File className="h-5 w-5" />,
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5 text-primary" />
                        Export Medical Records
                    </DialogTitle>
                    <DialogDescription>
                        {patientName && (
                            <span className="flex gap-2 mt-2">
                                Exporting for <Badge>{patientName}</Badge>
                            </span>
                        )}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* RECORD TYPES */}
                    <Label className="font-semibold">Select Records</Label>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            ["summary", "Patient Summary"],
                            ["diagnoses", "Diagnoses"],
                            ["prescriptions", "Prescriptions"],
                            ["labResults", "Lab Results"],
                            ["vitals", "Vitals"],
                            ["documents", "Documents"],
                        ].map(([key, label]) => (
                            <div
                                key={key}
                                onClick={() => toggleRecord(key)}
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selectedRecords[key]
                                    ? "bg-primary/10 border-primary/30"
                                    : "bg-muted/40 hover:bg-muted/60"
                                    }`}
                            >
                                <Checkbox checked={selectedRecords[key]} />
                                <span className="text-sm">{label}</span>
                            </div>
                        ))}
                    </div>

                    <Separator />

                    {/* DATE RANGE */}
                    <Label className="flex items-center gap-2 font-semibold">
                        <Calendar className="h-4 w-4" /> Date Range
                    </Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="30days">Last 30 Days</SelectItem>
                            <SelectItem value="90days">Last 90 Days</SelectItem>
                            <SelectItem value="6months">Last 6 Months</SelectItem>
                            <SelectItem value="1year">Last Year</SelectItem>
                        </SelectContent>
                    </Select>

                    <Separator />

                    {/* FORMAT */}
                    <Label className="font-semibold">Export Format</Label>
                    <RadioGroup
                        value={exportFormat}
                        onValueChange={setExportFormat}
                        className="grid grid-cols-3 gap-3"
                    >
                        {["pdf", "csv", "json"].map((value) => (
                            <Label
                                key={value}
                                htmlFor={value}
                                className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-colors ${exportFormat === value
                                    ? "bg-primary/10 border-primary/30"
                                    : "bg-muted/40 hover:bg-muted/60"
                                    }`}
                            >
                                <RadioGroupItem value={value} id={value} className="sr-only" />
                                {formatIcons[value]}
                                <span className="mt-2 uppercase">{value}</span>
                            </Label>
                        ))}
                    </RadioGroup>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleExport} disabled={isExporting}>
                        {isExporting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Exporting
                            </>
                        ) : exportComplete ? (
                            <>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Exported
                            </>
                        ) : (
                            <>
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </>
                        )}
                    </Button>
                    
                </div>
            </DialogContent>
        </Dialog>
    );
}

