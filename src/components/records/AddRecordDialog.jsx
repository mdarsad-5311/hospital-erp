import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import  Button  from "../ui/button";
import  Input  from "../ui/input";
// import  Label  from "../ui/label";
import  {Textarea}  from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../ui/tabs";
// import { Badge } from "../ui/badge";
import Badge from "../ui/badge";

import {
    Stethoscope,
    Pill,
    FlaskConical,
    Activity,
    Plus,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";


export function AddRecordDialog({
    open,
    onOpenChange,
    patientName,
    patientId,
    onRecordAdded,
}) {
    const [activeTab, setActiveTab] = useState("diagnosis");

    /* ================= Diagnosis ================= */
    const [diagnosisData, setDiagnosisData] = useState({
        condition: "",
        doctor: "",
        department: "",
        notes: "",
    });

    /* ================= Prescription ================= */
    const [prescriptionData, setPrescriptionData] = useState({
        doctor: "",
        medications: [{ name: "", dosage: "" }],
    });

    /* ================= Lab ================= */
    const [labData, setLabData] = useState({
        testName: "",
        result: "",
    });

    /* ================= Vitals ================= */
    const [vitalsData, setVitalsData] = useState({
        bloodPressure: "",
        heartRate: "",
    });

    /* ================= Helpers ================= */
    const addMedication = () => {
        setPrescriptionData((prev) => ({
            ...prev,
            medications: [...prev.medications, { name: "", dosage: "" }],
        }));
    };

    const removeMedication = (index) => {
        setPrescriptionData((prev) => ({
            ...prev,
            medications: prev.medications.filter((_, i) => i !== index),
        }));
    };

    const updateMedication = (index, field, value) => {
        const meds = [...prescriptionData.medications];
        meds[index][field] = value;
        setPrescriptionData({ ...prescriptionData, medications: meds });
    };

    /* ================= Save ================= */
    const handleSave = () => {
        let data = {};

        if (activeTab === "diagnosis") {
            if (!diagnosisData.condition || !diagnosisData.doctor) {
                return toast.error("Condition & Doctor required");
            }
            data = diagnosisData;
        }

        if (activeTab === "prescription") {
            if (
                !prescriptionData.doctor ||
                prescriptionData.medications.some((m) => !m.name)
            ) {
                return toast.error("Doctor & medicine name required");
            }
            data = prescriptionData;
        }

        if (activeTab === "lab") {
            if (!labData.testName || !labData.result) {
                return toast.error("Test name & result required");
            }
            data = labData;
        }

        if (activeTab === "vitals") {
            if (!vitalsData.bloodPressure || !vitalsData.heartRate) {
                return toast.error("BP & Heart Rate required");
            }
            data = vitalsData;
        }

        onRecordAdded?.(activeTab, {
            ...data,
            date: new Date().toISOString().split("T")[0],
        });

        toast.success("Record added successfully");
        onOpenChange(false);
        resetForms();
    };

    const resetForms = () => {
        setDiagnosisData({ condition: "", doctor: "", department: "", notes: "" });
        setPrescriptionData({ doctor: "", medications: [{ name: "", dosage: "" }] });
        setLabData({ testName: "", result: "" });
        setVitalsData({ bloodPressure: "", heartRate: "" });
        setActiveTab("diagnosis");
    };

    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5 text-primary" />
                        Add New Record
                        {patientName && <Badge variant="secondary">{patientName}</Badge>}
                    </DialogTitle>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-4">
                        <TabsTrigger value="diagnosis">
                            <Stethoscope className="h-4 w-4" /> Diagnosis
                        </TabsTrigger>
                        <TabsTrigger value="prescription">
                            <Pill className="h-4 w-4" /> Prescription
                        </TabsTrigger>
                        <TabsTrigger value="lab">
                            <FlaskConical className="h-4 w-4" /> Lab
                        </TabsTrigger>
                        <TabsTrigger value="vitals">
                            <Activity className="h-4 w-4" /> Vitals
                        </TabsTrigger>
                    </TabsList>

                    {/* Diagnosis */}
                    <TabsContent value="diagnosis" className="space-y-4 mt-4">
                        <Input
                            placeholder="Condition"
                            value={diagnosisData.condition}
                            onChange={(e) =>
                                setDiagnosisData({ ...diagnosisData, condition: e.target.value })
                            }
                        />
                        <Select
                            value={diagnosisData.doctor}
                            onValueChange={(v) =>
                                setDiagnosisData({ ...diagnosisData, doctor: v })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Doctor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                                <SelectItem value="Dr. Sarah Wilson">Dr. Sarah Wilson</SelectItem>
                            </SelectContent>
                        </Select>
                        <Textarea
                            placeholder="Notes"
                            value={diagnosisData.notes}
                            onChange={(e) =>
                                setDiagnosisData({ ...diagnosisData, notes: e.target.value })
                            }
                        />
                    </TabsContent>

                    {/* Prescription */}
                    <TabsContent value="prescription" className="space-y-4 mt-4">
                        <Select
                            value={prescriptionData.doctor}
                            onValueChange={(v) =>
                                setPrescriptionData({ ...prescriptionData, doctor: v })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Doctor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                                <SelectItem value="Dr. Sarah Wilson">Dr. Sarah Wilson</SelectItem>
                            </SelectContent>
                        </Select>

                        {prescriptionData.medications.map((med, i) => (
                            <div key={i} className="flex gap-2">
                                <Input
                                    placeholder="Medicine"
                                    value={med.name}
                                    onChange={(e) =>
                                        updateMedication(i, "name", e.target.value)
                                    }
                                />
                                <Input
                                    placeholder="Dosage"
                                    value={med.dosage}
                                    onChange={(e) =>
                                        updateMedication(i, "dosage", e.target.value)
                                    }
                                />
                                {i > 0 && (
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => removeMedication(i)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}

                        <Button variant="outline" onClick={addMedication}>
                            + Add Medicine
                        </Button>
                    </TabsContent>

                    {/* Lab */}
                    <TabsContent value="lab" className="space-y-4 mt-4">
                        <Input
                            placeholder="Test Name"
                            value={labData.testName}
                            onChange={(e) =>
                                setLabData({ ...labData, testName: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Result"
                            value={labData.result}
                            onChange={(e) =>
                                setLabData({ ...labData, result: e.target.value })
                            }
                        />
                    </TabsContent>

                    {/* Vitals */}
                    <TabsContent value="vitals" className="grid grid-cols-2 gap-4 mt-4">
                        <Input
                            placeholder="Blood Pressure"
                            value={vitalsData.bloodPressure}
                            onChange={(e) =>
                                setVitalsData({
                                    ...vitalsData,
                                    bloodPressure: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Heart Rate"
                            value={vitalsData.heartRate}
                            onChange={(e) =>
                                setVitalsData({
                                    ...vitalsData,
                                    heartRate: e.target.value,
                                })
                            }
                        />
                    </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Record</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
