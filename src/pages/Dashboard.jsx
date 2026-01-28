import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import RecentAppointments from '../components/dashboard/RecentAppointments';
import QuickActions from '../components/dashboard/QuickActions';
import DepartmentOverview from '../components/dashboard/DepartmentOverview';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { PatientChart } from '../components/dashboard/PatientChart';
import { UpcomingTasks } from '../components/dashboard/UpcomingTasks';
import { NotificationsPanel } from '../components/dashboard/NotificationsPanel';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Button from '../components/ui/button';
import Badge from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
    Users,
    Calendar,
    BedDouble,
    Activity,
    Stethoscope,
    TestTube,
    Pill,
    Receipt,
    RefreshCcw,
    Download,
    Filter,
    LayoutGrid,
    List
} from 'lucide-react';
import { toast } from 'sonner';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Refreshing dashboard...',
                success: 'Dashboard updated!',
                error: 'Failed to refresh',
            }
        );
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    const handleExport = () => {
        toast.success('Dashboard report exported successfully!');
    };

    const handleStatClick = (route, title) => {
        navigate(route);
        toast.info(`Navigating to ${title}`);
    };

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl font-bold">
                        {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Here's what's happening at the hospital today
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    >
                        {viewMode === 'grid' ? <List size={16} /> : <LayoutGrid size={16} />}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                    >
                        <RefreshCcw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                        <Download size={16} />
                        <span className="hidden sm:inline ml-2">Export</span>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div onClick={() => handleStatClick('/patients', 'Patients')} className="cursor-pointer">
                    <StatCard
                        title="Total Patients"
                        value="2,847"
                        change="+12.5% from last month"
                        changeType="positive"
                        icon={<Users size={24} />}
                        variant="primary"
                        delay={0}
                    />
                </div>
                <div onClick={() => handleStatClick('/appointments', 'Appointments')} className="cursor-pointer">
                    <StatCard
                        title="Today's Appointments"
                        value="156"
                        change="+8% from yesterday"
                        changeType="positive"
                        icon={<Calendar size={24} />}
                        variant="info"
                        delay={0.1}
                    />
                </div>
                <div onClick={() => handleStatClick('/ipd', 'IPD')} className="cursor-pointer">
                    <StatCard
                        title="Available Beds"
                        value="45"
                        change="78% occupancy"
                        changeType="neutral"
                        icon={<BedDouble size={24} />}
                        variant="success"
                        delay={0.2}
                    />
                </div>
                <div onClick={() => handleStatClick('/ipd', 'IPD')} className="cursor-pointer">
                    <StatCard
                        title="Critical Cases"
                        value="8"
                        change="-2 from yesterday"
                        changeType="positive"
                        icon={<Activity size={24} />}
                        variant="warning"
                        delay={0.3}
                    />
                </div>
            </div>

            {/* Secondary Stats for Admin */}
            {user?.role === 'admin' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div onClick={() => handleStatClick('/staff', 'Staff')} className="cursor-pointer">
                        <StatCard
                            title="Active Doctors"
                            value="48"
                            icon={<Stethoscope size={24} />}
                            variant="primary"
                            delay={0.4}
                        />
                    </div>
                    <div onClick={() => handleStatClick('/laboratory', 'Laboratory')} className="cursor-pointer">
                        <StatCard
                            title="Lab Tests Today"
                            value="89"
                            icon={<TestTube size={24} />}
                            variant="info"
                            delay={0.5}
                        />
                    </div>
                    <div onClick={() => handleStatClick('/pharmacy', 'Pharmacy')} className="cursor-pointer">
                        <StatCard
                            title="Prescriptions"
                            value="234"
                            icon={<Pill size={24} />}
                            variant="success"
                            delay={0.6}
                        />
                    </div>
                    <div onClick={() => handleStatClick('/billing', 'Billing')} className="cursor-pointer">
                        <StatCard
                            title="Today's Revenue"
                            value="$24,500"
                            change="+18% from yesterday"
                            changeType="positive"
                            icon={<Receipt size={24} />}
                            variant="warning"
                            delay={0.7}
                        />
                    </div>
                </div>
            )}

            {/* Charts Section */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <RecentAppointments />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <RevenueChart />
                                <PatientChart />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <QuickActions />
                            <DepartmentOverview />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RevenueChart />
                        <PatientChart />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <DepartmentOverview />
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Patient Satisfaction</span>
                                        <Badge className="bg-success/10 text-success">94%</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Average Wait Time</span>
                                        <Badge className="bg-warning/10 text-warning">18 min</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Bed Occupancy Rate</span>
                                        <Badge className="bg-info/10 text-info">78%</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Staff Efficiency</span>
                                        <Badge className="bg-primary/10 text-primary">92%</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Lab Turnaround</span>
                                        <Badge className="bg-success/10 text-success">2.4 hrs</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <ActivityFeed />
                            <UpcomingTasks />
                        </div>
                        <div>
                            <NotificationsPanel />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
