import { useState, useEffect } from 'react';
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
    FileText,
    User,
    Check,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    Minus
} from "lucide-react";



const testDefaults = {
    Hemoglobin: { unit: "g/dL", normalRange: "12.0-17.5" },
    ESR: { unit: "mm/hr", normalRange: "0-20" },
    "Blood Sugar (Fasting)": { unit: "mg/dL", normalRange: "70-100" },
    HbA1c: { unit: "%", normalRange: "< 5.7" },
    Creatinine: { unit: "mg/dL", normalRange: "0.7-1.3" },
    TSH: { unit: "mIU/L", normalRange: "0.4-4.0" },
};

const verifiers = [
    "Dr. Sarah Johnson - Pathologist",
    "Dr. Michael Lee - Clinical Biochemist",
    "Dr. Emily Brown - Microbiologist",
    "Dr. James Wilson - Hematologist",
];
export function ResultEntryDialog({
    open,
    onOpenChange,
    sample,
    onSubmit,
}) {
    const [results, setResults] = useState([]);
    const [verifiedBy, setVerifiedBy] = useState("");
    const [interpretation, setInterpretation] = useState("");
    const [recommendations, setRecommendations] = useState("");

    // Reset form when sample changes or dialog opens
    useEffect(() => {
        if (open && sample?.tests) {
            setResults(
                sample.tests.map((test) => ({
                    testName: test,
                    result: "",
                    unit: testDefaults[test]?.unit || "",
                    normalRange: testDefaults[test]?.normalRange || "",
                    status: "normal",
                    flag: "normal",
                }))
            );
            setVerifiedBy("");
            setInterpretation("");
            setRecommendations("");
        }
    }, [open, sample]);

    const updateResult = (index, field, value) => {
        setResults((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleSubmit = () => {
        const hasEmptyResults = results.some((r) => !r.result);

        if (hasEmptyResults || !verifiedBy) {
            toast({
                title: "Missing Information",
                description: "Please fill in all results and select a verifier.",
                variant: "destructive",
            });
            return;
        }

        const data = {
            sampleId: sample?.sampleId || "",
            results,
            verifiedBy,
            interpretation,
            recommendations,
        };

        onSubmit(data);
        onOpenChange(false);

        toast({
            title: "Results Saved",
            description: `Results for ${sample?.patientName} have been recorded`,
        });
    };

    const getStatusIcon = (flag) => {
        switch (flag) {
            case "high":
                return <TrendingUp className="h-4 w-4 text-destructive" />;
            case "low":
                return <TrendingDown className="h-4 w-4 text-orange-500" />;
            default:
                return <Minus className="h-4 w-4 text-green-500" />;
        }
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <FileText className="h-5 w-5 text-primary" />
                        Enter Lab Results
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}






