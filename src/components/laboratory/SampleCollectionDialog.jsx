import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import Button from "../ui/button";
import Input from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { toast } from "../../hooks/use-toast";
import {
    Droplet,
    User,
    Clock,
    Check,
    Barcode,
} from "lucide-react";


// Sample types list
export const sampleTypes = [
    "Blood (Venous)",
    "Blood (Arterial)",
    "Blood (Capillary)",
    "Urine (Random)",
    "Urine (24-hour)",
    "Urine (Midstream)",
    "Stool",
    "Sputum",
    "Throat Swab",
    "Nasal Swab",
    "Wound Swab",
    "CSF",
    "Synovial Fluid",
    "Pleural Fluid",
];

// Sample condition list
export const sampleConditions = [
    "Good",
    "Hemolyzed",
    "Lipemic",
    "Clotted",
    "Insufficient",
    "Contaminated",
];

// Sample collectors list
export const collectors = [
    "John Doe - Lab Technician",
    "Jane Smith - Phlebotomist",
    "Mike Johnson - Lab Technician",
    "Sarah Williams - Phlebotomist",
];


export function SampleCollectionDialog({
    open,
    onOpenChange,
    testRequest,
    onSubmit,
}) {
    const [sampleType, setSampleType] = useState("");
    const [collectedBy, setCollectedBy] = useState("");
    const [quantity, setQuantity] = useState("");
    const [condition, setCondition] = useState("Good");
    const [notes, setNotes] = useState("");

    const generateSampleId = () => {
        const date = new Date();
        return `SMP-${date.getFullYear()}${String(
            date.getMonth() + 1
        ).padStart(2, "0")}${String(date.getDate()).padStart(
            2,
            "0"
        )}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    };

    const resetForm = () => {
        setSampleType("");
        setCollectedBy("");
        setQuantity("");
        setCondition("Good");
        setNotes("");
    };

    const handleSubmit = () => {
        if (!sampleType || !collectedBy || !quantity) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const data = {
            testRequestId: testRequest?.id || "",
            sampleId: generateSampleId(),
            sampleType,
            collectedBy,
            collectionTime: new Date().toISOString(),
            quantity,
            condition,
            notes,
        };

        onSubmit(data);
        resetForm();
        onOpenChange(false);

        toast({
            title: "Sample Collected",
            description: `Sample ${data.sampleId} collected successfully`,
        });
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Droplet className="h-5 w-5 text-primary" />
                        Sample Collection
                    </DialogTitle>
                </DialogHeader>
                <div>
                    {/* Patient Info */}
                    {testRequest && (
                        <div className="bg-muted/50 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold">{testRequest.patientName}</p>
                                    <p className="text-sm text-muted-foreground">{testRequest.patientId}</p>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-sm text-muted-foreground mb-1">Tests to collect:</p>
                                <div className="flex flex-wrap gap-1">
                                    {testRequest.tests.slice(0, 3).map(test => (
                                        <span key={test} className="text-xs px-2 py-1 bg-background rounded border">
                                            {test}
                                        </span>
                                    ))}
                                    {testRequest.tests.length > 3 && (
                                        <span className="text-xs px-2 py-1 bg-background rounded border">
                                            +{testRequest.tests.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sample Type */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Droplet className="h-4 w-4" />
                            Sample Type *
                        </Label>
                        <Select value={sampleType} onValueChange={setSampleType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select sample type" />
                            </SelectTrigger>
                            <SelectContent>
                                {sampleTypes.map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Collected By */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Collected By *
                        </Label>
                        <Select value={collectedBy} onValueChange={setCollectedBy}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select collector" />
                            </SelectTrigger>
                            <SelectContent>
                                {collectors.map(collector => (
                                    <SelectItem key={collector} value={collector}>{collector}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Quantity & Condition */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Quantity *</Label>
                            <Input
                                placeholder="e.g., 5 mL"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Sample Condition</Label>
                            <Select value={condition} onValueChange={setCondition}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {sampleConditions.map(c => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Collection Time */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        <Clock className="h-4 w-4" />
                        <span>Collection Time: {new Date().toLocaleString()}</span>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label>Collection Notes</Label>
                        <Textarea
                            placeholder="Any observations or notes about sample collection..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={2}
                        />
                    </div>
                    {/* Barcode Preview */}
                    <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-center gap-4 border border-dashed">
                        <Barcode className="h-8 w-8 text-muted-foreground" />
                        <div className="text-center">
                            <p className="text-sm font-medium">Sample ID will be generated</p>
                            <p className="text-xs text-muted-foreground">Barcode will be printed after collection</p>
                        </div>
                    </div>
                </div>
                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="gap-2">
                        <Check className="h-4 w-4" />
                        Collect Sample
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
