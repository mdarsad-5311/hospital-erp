
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '../ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const patientData = [
    { day: 'Mon', opd: 45, ipd: 12, emergency: 8 },
    { day: 'Tue', opd: 52, ipd: 15, emergency: 5 },
    { day: 'Wed', opd: 48, ipd: 18, emergency: 10 },
    { day: 'Thu', opd: 61, ipd: 14, emergency: 7 },
    { day: 'Fri', opd: 55, ipd: 20, emergency: 12 },
    { day: 'Sat', opd: 38, ipd: 10, emergency: 15 },
    { day: 'Sun', opd: 25, ipd: 8, emergency: 18 },
];

const chartConfig = {
    opd: {
        label: 'OPD',
        color: 'hsl(var(--primary))',
    },
    ipd: {
        label: 'IPD',
        color: 'hsl(var(--info))',
    },
    emergency: {
        label: 'Emergency',
        color: 'hsl(var(--warning))',
    },
};

export function PatientChart() {
    const totalOPD = patientData.reduce((acc, item) => acc + item.opd, 0);
    const totalIPD = patientData.reduce((acc, item) => acc + item.ipd, 0);
    const totalEmergency = patientData.reduce((acc, item) => acc + item.emergency, 0);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Patient Statistics</CardTitle>
                    <p className="text-sm text-muted-foreground">Weekly patient visits by department</p>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="text-sm">OPD ({totalOPD})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-info" />
                            <span className="text-sm">IPD ({totalIPD})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-warning" />
                            <span className="text-sm">Emergency ({totalEmergency})</span>
                        </div>
                    </div>
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={patientData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="opd" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="ipd" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="emergency" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
