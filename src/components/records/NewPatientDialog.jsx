import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

import  Button  from "../ui/button";
import  Input  from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import  Badge  from "../ui/badge";
import {
    UserPlus,
    Save,
    X,
    Plus,
} from "lucide-react";
import { toast } from "sonner";

export function NewPatientDialog({
    open,
    onOpenChange,
    onPatientAdded,
}) {
    const [formData, setFormData] = useState({
        patientName: "",
        age: 0,
        gender: "",
        bloodGroup: "",
        phone: "",
        email: "",
        address: "",
        emergencyContact: "",
        allergies: [],
        chronicConditions: [],
    });

    const [newAllergy, setNewAllergy] = useState("");
    const [newCondition, setNewCondition] = useState("");

    const addAllergy = () => {
        if (!newAllergy.trim()) return;
        setFormData((prev) => ({
            ...prev,
            allergies: [...prev.allergies, newAllergy.trim()],
        }));
        setNewAllergy("");
    };

    const removeAllergy = (index) => {
        setFormData((prev) => ({
            ...prev,
            allergies: prev.allergies.filter((_, i) => i !== index),
        }));
    };

    const addCondition = () => {
        if (!newCondition.trim()) return;
        setFormData((prev) => ({
            ...prev,
            chronicConditions: [...prev.chronicConditions, newCondition.trim()],
        }));
        setNewCondition("");
    };

    const removeCondition = (index) => {
        setFormData((prev) => ({
            ...prev,
            chronicConditions: prev.chronicConditions.filter((_, i) => i !== index),
        }));
    };

    const handleSave = () => {
        if (!formData.patientName || !formData.gender || !formData.bloodGroup) {
            toast.error("Name, Gender and Blood Group are required");
            return;
        }

        onPatientAdded?.(formData);
        toast.success("New patient created successfully");
        onOpenChange(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            patientName: "",
            age: 0,
            gender: "",
            bloodGroup: "",
            phone: "",
            email: "",
            address: "",
            emergencyContact: "",
            allergies: [],
            chronicConditions: [],
        });
        setNewAllergy("");
        setNewCondition("");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5 text-primary" />
                        Create New Patient Record
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* BASIC INFO */}
                    <section className="space-y-4">
                        <h3 className="font-semibold">Basic Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Label>Full Name *</Label>
                                <Input
                                    value={formData.patientName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, patientName: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <Label>Age</Label>
                                <Input
                                    type="number"
                                    value={formData.age || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            age: parseInt(e.target.value) || 0,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label>Gender *</Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(v) =>
                                        setFormData({ ...formData, gender: v })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Blood Group *</Label>
                                <Select
                                    value={formData.bloodGroup}
                                    onValueChange={(v) =>
                                        setFormData({ ...formData, bloodGroup: v })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select blood group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                            <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </section>

                    {/* CONTACT */}
                    <section className="space-y-4">
                        <h3 className="font-semibold">Contact Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                            />
                            <Input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                            <div className="col-span-2">
                                <Textarea
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({ ...formData, address: e.target.value })
                                    }
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    placeholder="Emergency Contact"
                                    value={formData.emergencyContact}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            emergencyContact: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    {/* MEDICAL */}
                    <section className="space-y-4">
                        <h3 className="font-semibold">Medical Information</h3>

                        {/* ALLERGIES */}
                        <div>
                            <Label>Allergies</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={newAllergy}
                                    onChange={(e) => setNewAllergy(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addAllergy()}
                                />
                                <Button variant="outline" size="icon" onClick={addAllergy}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.allergies.map((a, i) => (
                                    <Badge key={i} variant="destructive" className="gap-1">
                                        {a}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() => removeAllergy(i)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* CONDITIONS */}
                        <div>
                            <Label>Chronic Conditions</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={newCondition}
                                    onChange={(e) => setNewCondition(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addCondition()}
                                />
                                <Button variant="outline" size="icon" onClick={addCondition}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.chronicConditions.map((c, i) => (
                                    <Badge key={i} variant="secondary" className="gap-1">
                                        {c}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() => removeCondition(i)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Create Patient
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
