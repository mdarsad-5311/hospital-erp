
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import  Badge  from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import {
    UserPlus,
    Calendar,
    FileText,
    Pill,
    TestTube,
    CreditCard,
    BedDouble,
    Stethoscope
} from 'lucide-react';

const activities = [
    {
        id: '1',
        type: 'patient',
        message: 'New patient John Doe registered',
        time: '2 min ago',
        icon: UserPlus,
        color: 'text-primary',
        bgColor: 'bg-primary/10',
    },
    {
        id: '2',
        type: 'appointment',
        message: 'Appointment scheduled for Emma Wilson',
        time: '5 min ago',
        icon: Calendar,
        color: 'text-info',
        bgColor: 'bg-info/10',
    },
    {
        id: '3',
        type: 'prescription',
        message: 'Prescription issued by Dr. Chen',
        time: '12 min ago',
        icon: FileText,
        color: 'text-success',
        bgColor: 'bg-success/10',
    },
    {
        id: '4',
        type: 'pharmacy',
        message: 'Medicine dispensed to patient #1234',
        time: '18 min ago',
        icon: Pill,
        color: 'text-warning',
        bgColor: 'bg-warning/10',
    },
    {
        id: '5',
        type: 'lab',
        message: 'Lab results ready for James Brown',
        time: '25 min ago',
        icon: TestTube,
        color: 'text-info',
        bgColor: 'bg-info/10',
    },
    {
        id: '6',
        type: 'billing',
        message: 'Payment received - Invoice #INV-2024-001',
        time: '32 min ago',
        icon: CreditCard,
        color: 'text-success',
        bgColor: 'bg-success/10',
    },
    {
        id: '7',
        type: 'admission',
        message: 'Patient admitted to Ward B',
        time: '45 min ago',
        icon: BedDouble,
        color: 'text-primary',
        bgColor: 'bg-primary/10',
    },
    {
        id: '8',
        type: 'doctor',
        message: 'Dr. Sarah Johnson started consultation',
        time: '1 hour ago',
        icon: Stethoscope,
        color: 'text-info',
        bgColor: 'bg-info/10',
    },
];

export function ActivityFeed() {
    return (
        <div

        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                    <Badge variant="outline" className="font-normal">
                        Live
                    </Badge>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-4">
                            {activities.map((activity, index) => {
                                const Icon = activity.icon;
                                return (
                                    <div

                                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                    >
                                        <div className={`w-8 h-8 rounded-full ${activity.bgColor} ${activity.color} flex items-center justify-center flex-shrink-0`}>
                                            <Icon size={16} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium">{activity.message}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
