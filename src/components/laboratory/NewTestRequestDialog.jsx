import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from"../ui/dialog";

import  Button  from '../ui/button';
import  Input  from '../ui/input';
import  {Label} from '../ui/label';
import  {Textarea}  from '../ui/textarea';
import  {Checkbox}  from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from "../../hooks/use-toast";
import {
  TestTube,
  User,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Check,
  Search,
  AlertCircle,
} from 'lucide-react';

const testCategories = [
  {
    category: 'Hematology',
    tests: [
      'Complete Blood Count (CBC)',
      'Hemoglobin',
      'ESR',
      'Blood Group & Rh',
      'Platelet Count',
      'Coagulation Profile',
    ],
  },
  {
    category: 'Biochemistry',
    tests: [
      'Blood Sugar (Fasting)',
      'Blood Sugar (PP)',
      'HbA1c',
      'Lipid Profile',
      'Liver Function Test',
      'Kidney Function Test',
      'Electrolytes',
      'Uric Acid',
    ],
  },
  {
    category: 'Microbiology',
    tests: [
      'Urine Culture',
      'Blood Culture',
      'Stool Culture',
      'Throat Swab',
      'Wound Culture',
      'Sensitivity Test',
    ],
  },
];

const mockPatients = [
  { id: 'P-001', name: 'John Smith', age: 45, gender: 'Male' },
  { id: 'P-002', name: 'Sarah Johnson', age: 32, gender: 'Female' },
  { id: 'P-003', name: 'Michael Brown', age: 58, gender: 'Male' },
];

const mockDoctors = [
  { id: 'D-001', name: 'Dr. James Anderson', department: 'General Medicine' },
  { id: 'D-002', name: 'Dr. Lisa Chen', department: 'Cardiology' },
];

export function NewTestRequestDialog({ open, onOpenChange, onSubmit }) {
  const [step, setStep] = useState(1);
  const [patientSearch, setPatientSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [priority, setPriority] = useState('routine');
  const [selectedTests, setSelectedTests] = useState([]);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [fasting, setFasting] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const filteredPatients = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const selectedDoctorData = mockDoctors.find(
    (d) => d.id === selectedDoctor
  );

  const handleTestToggle = (test) => {
    setSelectedTests((prev) =>
      prev.includes(test)
        ? prev.filter((t) => t !== test)
        : [...prev, test]
    );
  };

  const handleSubmit = () => {
    if (!selectedPatient || !selectedDoctor || selectedTests.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const data = {
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      doctorName: selectedDoctorData?.name || '',
      department: selectedDoctorData?.department || '',
      priority,
      tests: selectedTests,
      clinicalNotes,
      fasting,
      specialInstructions,
    };

    onSubmit(data);
    onOpenChange(false);
  };

  const canProceedStep1 = selectedPatient && selectedDoctor;
  const canProceedStep2 = selectedTests.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <TestTube className="h-5 w-5 text-primary" />
            New Laboratory Test Request
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[60vh] py-4">
          {/* UI CONTENT REMAINS SAME – ONLY ANIMATION REMOVED */}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() =>
              step > 1 ? setStep(step - 1) : onOpenChange(false)
            }
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>

          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2">
              <Check className="h-4 w-4" />
              Submit Request
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
