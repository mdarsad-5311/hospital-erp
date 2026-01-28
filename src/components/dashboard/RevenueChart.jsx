
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Badge  from '../ui/badge';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '../ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const revenueData = [
    { month: 'Jan', revenue: 45000, patients: 320 },
    { month: 'Feb', revenue: 52000, patients: 380 },
    { month: 'Mar', revenue: 48000, patients: 350 },
    { month: 'Apr', revenue: 61000, patients: 420 },
    { month: 'May', revenue: 55000, patients: 390 },
    { month: 'Jun', revenue: 67000, patients: 450 },
    { month: 'Jul', revenue: 72000, patients: 480 },
];

const chartConfig = {
    revenue: {
        label: 'Revenue',
        color: 'hsl(var(--primary))',
    },
    patients: {
        label: 'Patients',
        color: 'hsl(var(--info))',
    },
};

export function RevenueChart() {
    const totalRevenue = revenueData.reduce((acc, item) => acc + item.revenue, 0);
    const avgRevenue = Math.round(totalRevenue / revenueData.length);

    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Monthly revenue trend
                        </p>
                    </div>
                    <Badge className="bg-success/10 text-success border-success/20 gap-1">
                        <TrendingUp size={14} />
                        +18.2%
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-6 mb-4">
                        <div>
                            <p className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-muted-foreground">Total Revenue</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">${(avgRevenue / 1000).toFixed(1)}K</p>
                            <p className="text-xs text-muted-foreground">Avg Monthly</p>
                        </div>
                    </div>
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                    tickFormatter={(value) => `$${value / 1000}K`}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    fill="url(#revenueGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
