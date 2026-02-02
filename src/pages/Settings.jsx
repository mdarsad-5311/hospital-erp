import { useState } from "react";

import {
    Settings as SettingsIcon,
    User,
    Bell,
    Palette,
    Shield,
    Building2,
    Mail,
    Phone,
    MapPin,
    Camera,
    Save,
    Moon,
    Sun,
    Monitor,
    Lock,
    Key,
    Smartphone,
    Globe,
    Clock,
    Calendar,
    FileText,
    Database,
    HardDrive,
    Wifi,
    CheckCircle2,
    AlertTriangle,
    Eye,
    EyeOff,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Switch } from "../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import Badge from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [theme, setTheme] = useState("system");

    // Profile state
    const [profile, setProfile] = useState({
        firstName: "Dr. UMAIMA",
        lastName: "ARSAD",
        email: "umaima.arsad@hospital.com",
        phone: "+1 (555) 123-4567",
        role: "Doctor",
        department: "Cardiology",
        employeeId: "EMP-001",
        address: "123 Medical Center Drive, Healthcare City",
        bio: "Senior Cardiologist with 15+ years of experience in interventional cardiology and cardiac care.",
    });

    // Notification settings
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        appointmentReminders: true,
        patientUpdates: true,
        systemAlerts: true,
        marketingEmails: false,
        weeklyReports: true,
        urgentAlerts: true,
    });

    // System settings
    const [systemSettings, setSystemSettings] = useState({
        language: "en",
        timezone: "America/New_York",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h",
        currency: "USD",
        autoLogout: "30",
    });

    const handleSaveProfile = () => {
        toast.success("Profile updated successfully");
    };

    const handleSaveNotifications = () => {
        toast.success("Notification preferences saved");
    };

    const handleSaveSecurity = () => {
        toast.success("Security settings updated");
    };

    const handleSaveSystem = () => {
        toast.success("System settings saved");
    };

    const handleChangePassword = () => {
        toast.success("Password changed successfully");
    };

    const handleEnable2FA = () => {
        toast.success("Two-factor authentication enabled");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div

                className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your account settings and preferences
                    </p>
                </div>
            </div>

            {/* Settings Content */}
            <div

            >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-muted/50 p-2">
                        <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">Profile</span>
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <Bell className="h-4 w-4" />
                            <span className="hidden sm:inline">Notifications</span>
                        </TabsTrigger>
                        <TabsTrigger value="appearance" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <Palette className="h-4 w-4" />
                            <span className="hidden sm:inline">Appearance</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <Shield className="h-4 w-4" />
                            <span className="hidden sm:inline">Security</span>
                        </TabsTrigger>
                        <TabsTrigger value="system" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <SettingsIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">System</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    Profile Information
                                </CardTitle>
                                <CardDescription>
                                    Update your personal information and profile details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Avatar Section */}
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <Avatar className="h-24 w-24 border-4 border-primary/20">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback className="text-2xl bg-primary text-primary-foreground">JS</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2 text-center sm:text-left">
                                        <h3 className="text-lg font-semibold">{profile.firstName} {profile.lastName}</h3>
                                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                            <Badge variant="secondary">{profile.role}</Badge>
                                            <Badge variant="outline">{profile.department}</Badge>
                                            <Badge variant="outline">{profile.employeeId}</Badge>
                                        </div>
                                        <Button variant="outline" size="sm" className="mt-2 w-fit mx-auto sm:mx-0">
                                            <Camera className="h-4 w-4 mr-2" />
                                            Change Photo
                                        </Button>
                                    </div>
                                </div>

                                <Separator />

                                {/* Personal Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            value={profile.firstName}
                                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            value={profile.lastName}
                                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                className="pl-10"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="phone"
                                                className="pl-10"
                                                value={profile.phone}
                                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="address">Address</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="address"
                                                className="pl-10"
                                                value={profile.address}
                                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            rows={3}
                                            value={profile.bio}
                                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-primary" />
                                    Notification Preferences
                                </CardTitle>
                                <CardDescription>
                                    Choose how you want to receive notifications
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Notification Channels */}
                                <div className="space-y-4">
                                    <h4 className="font-medium text-foreground">Notification Channels</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-full bg-primary/10">
                                                    <Mail className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Email Notifications</p>
                                                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={notifications.emailNotifications}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-full bg-primary/10">
                                                    <Smartphone className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">SMS Notifications</p>
                                                    <p className="text-sm text-muted-foreground">Receive updates via text message</p>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={notifications.smsNotifications}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-full bg-primary/10">
                                                    <Bell className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Push Notifications</p>
                                                    <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={notifications.pushNotifications}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Notification Types */}
                                <div className="space-y-4">
                                    <h4 className="font-medium text-foreground">Notification Types</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between p-4 rounded-lg border">
                                            <div>
                                                <p className="font-medium">Appointment Reminders</p>
                                                <p className="text-sm text-muted-foreground">Get reminded about upcoming appointments</p>
                                            </div>
                                            <Switch
                                                checked={notifications.appointmentReminders}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, appointmentReminders: checked })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-lg border">
                                            <div>
                                                <p className="font-medium">Patient Updates</p>
                                                <p className="text-sm text-muted-foreground">Updates about patient status changes</p>
                                            </div>
                                            <Switch
                                                checked={notifications.patientUpdates}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, patientUpdates: checked })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-lg border">
                                            <div>
                                                <p className="font-medium">System Alerts</p>
                                                <p className="text-sm text-muted-foreground">Important system notifications</p>
                                            </div>
                                            <Switch
                                                checked={notifications.systemAlerts}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-lg border">
                                            <div>
                                                <p className="font-medium">Urgent Alerts</p>
                                                <p className="text-sm text-muted-foreground">Critical and emergency notifications</p>
                                            </div>
                                            <Switch
                                                checked={notifications.urgentAlerts}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, urgentAlerts: checked })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-lg border">
                                            <div>
                                                <p className="font-medium">Weekly Reports</p>
                                                <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                                            </div>
                                            <Switch
                                                checked={notifications.weeklyReports}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-lg border">
                                            <div>
                                                <p className="font-medium">Marketing Emails</p>
                                                <p className="text-sm text-muted-foreground">Promotional and marketing content</p>
                                            </div>
                                            <Switch
                                                checked={notifications.marketingEmails}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button onClick={handleSaveNotifications} className="bg-primary hover:bg-primary/90">
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Preferences
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Appearance Tab */}
                    <TabsContent value="appearance" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Palette className="h-5 w-5 text-primary" />
                                    Appearance Settings
                                </CardTitle>
                                <CardDescription>
                                    Customize how the application looks
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Theme Selection */}
                                <div className="space-y-4">
                                    <h4 className="font-medium text-foreground">Theme</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div
                                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                                }`}
                                            onClick={() => setTheme("light")}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 rounded-full bg-amber-100">
                                                    <Sun className="h-5 w-5 text-amber-600" />
                                                </div>
                                                <span className="font-medium">Light</span>
                                                {theme === "light" && <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />}
                                            </div>
                                            <div className="h-20 rounded-md bg-white border shadow-sm flex items-center justify-center">
                                                <div className="w-3/4 space-y-2">
                                                    <div className="h-2 bg-gray-200 rounded"></div>
                                                    <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                                }`}
                                            onClick={() => setTheme("dark")}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 rounded-full bg-slate-800">
                                                    <Moon className="h-5 w-5 text-slate-200" />
                                                </div>
                                                <span className="font-medium">Dark</span>
                                                {theme === "dark" && <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />}
                                            </div>
                                            <div className="h-20 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center">
                                                <div className="w-3/4 space-y-2">
                                                    <div className="h-2 bg-slate-700 rounded"></div>
                                                    <div className="h-2 bg-slate-600 rounded w-2/3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${theme === "system" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                                }`}
                                            onClick={() => setTheme("system")}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 rounded-full bg-gradient-to-r from-amber-100 to-slate-800">
                                                    <Monitor className="h-5 w-5 text-primary" />
                                                </div>
                                                <span className="font-medium">System</span>
                                                {theme === "system" && <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />}
                                            </div>
                                            <div className="h-20 rounded-md bg-gradient-to-r from-white to-slate-900 border flex items-center justify-center">
                                                <div className="w-3/4 space-y-2">
                                                    <div className="h-2 bg-gradient-to-r from-gray-200 to-slate-700 rounded"></div>
                                                    <div className="h-2 bg-gradient-to-r from-gray-300 to-slate-600 rounded w-2/3"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Font Size */}
                                <div className="space-y-4">
                                    <h4 className="font-medium text-foreground">Display Options</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Font Size</Label>
                                            <Select defaultValue="medium">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select font size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="small">Small</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="large">Large</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Sidebar Position</Label>
                                            <Select defaultValue="left">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select position" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="left">Left</SelectItem>
                                                    <SelectItem value="right">Right</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Compact Mode</Label>
                                            <div className="flex items-center justify-between p-3 rounded-lg border">
                                                <span className="text-sm text-muted-foreground">Reduce spacing and padding</span>
                                                <Switch />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Animations</Label>
                                            <div className="flex items-center justify-between p-3 rounded-lg border">
                                                <span className="text-sm text-muted-foreground">Enable motion effects</span>
                                                <Switch defaultChecked />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button className="bg-primary hover:bg-primary/90">
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Appearance
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lock className="h-5 w-5 text-primary" />
                                    Password & Authentication
                                </CardTitle>
                                <CardDescription>
                                    Manage your password and security settings
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Change Password */}
                                <div className="space-y-4">
                                    <h4 className="font-medium text-foreground">Change Password</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentPassword">Current Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="currentPassword"
                                                    type={showCurrentPassword ? "text" : "password"}
                                                    placeholder="Enter current password"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                >
                                                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div></div>
                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="newPassword"
                                                    type={showNewPassword ? "text" : "password"}
                                                    placeholder="Enter new password"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                >
                                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleChangePassword} variant="outline">
                                        <Key className="h-4 w-4 mr-2" />
                                        Update Password
                                    </Button>
                                </div>

                                <Separator />

                                {/* Two-Factor Authentication */}
                                <div className="space-y-4">
                                    <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                                    <div className="p-4 rounded-lg border bg-card">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-full bg-amber-100">
                                                <Shield className="h-6 w-6 text-amber-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h5 className="font-medium">Enhance your account security</h5>
                                                    <Badge variant="outline" className="text-amber-600 border-amber-600">Recommended</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    Add an extra layer of security to your account by enabling two-factor authentication.
                                                    You'll need to enter a code from your phone in addition to your password.
                                                </p>
                                                <Button onClick={handleEnable2FA} className="bg-primary hover:bg-primary/90">
                                                    <Smartphone className="h-4 w-4 mr-2" />
                                                    Enable 2FA
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Active Sessions */}
                                <div className="space-y-4">
                                    <h4 className="font-medium text-foreground">Active Sessions</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-full bg-green-100">
                                                    <Monitor className="h-4 w-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Windows PC - Chrome</p>
                                                    <p className="text-sm text-muted-foreground">New York, USA · Current session</p>
                                                </div>
                                            </div>
                                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-lg border">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-full bg-muted">
                                                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">iPhone 14 - Safari</p>
                                                    <p className="text-sm text-muted-foreground">New York, USA · 2 hours ago</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                                Revoke
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* System Tab */}
                    <TabsContent value="system" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Regional Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Globe className="h-5 w-5 text-primary" />
                                        Regional Settings
                                    </CardTitle>
                                    <CardDescription>
                                        Configure language and regional preferences
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Language</Label>
                                        <Select
                                            value={systemSettings.language}
                                            onValueChange={(value) => setSystemSettings({ ...systemSettings, language: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="es">Spanish</SelectItem>
                                                <SelectItem value="fr">French</SelectItem>
                                                <SelectItem value="de">German</SelectItem>
                                                <SelectItem value="zh">Chinese</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Timezone</Label>
                                        <Select
                                            value={systemSettings.timezone}
                                            onValueChange={(value) => setSystemSettings({ ...systemSettings, timezone: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select timezone" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                                                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                                                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                                                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                                                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                                                <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date Format</Label>
                                        <Select
                                            value={systemSettings.dateFormat}
                                            onValueChange={(value) => setSystemSettings({ ...systemSettings, dateFormat: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select date format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Time Format</Label>
                                        <Select
                                            value={systemSettings.timeFormat}
                                            onValueChange={(value) => setSystemSettings({ ...systemSettings, timeFormat: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select time format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="12h">12 Hour (AM/PM)</SelectItem>
                                                <SelectItem value="24h">24 Hour</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Session Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-primary" />
                                        Session Settings
                                    </CardTitle>
                                    <CardDescription>
                                        Configure session and timeout preferences
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Auto Logout (minutes)</Label>
                                        <Select
                                            value={systemSettings.autoLogout}
                                            onValueChange={(value) => setSystemSettings({ ...systemSettings, autoLogout: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select timeout" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="15">15 minutes</SelectItem>
                                                <SelectItem value="30">30 minutes</SelectItem>
                                                <SelectItem value="60">1 hour</SelectItem>
                                                <SelectItem value="120">2 hours</SelectItem>
                                                <SelectItem value="never">Never</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border">
                                        <div>
                                            <p className="font-medium">Remember Me</p>
                                            <p className="text-sm text-muted-foreground">Stay logged in on this device</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border">
                                        <div>
                                            <p className="font-medium">Login Alerts</p>
                                            <p className="text-sm text-muted-foreground">Get notified of new logins</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Data & Storage */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Database className="h-5 w-5 text-primary" />
                                        Data & Storage
                                    </CardTitle>
                                    <CardDescription>
                                        Manage your data and storage settings
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-4 rounded-lg border bg-muted/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">Storage Used</span>
                                            <span className="text-sm text-muted-foreground">2.4 GB of 10 GB</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: "24%" }}></div>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full">
                                        <HardDrive className="h-4 w-4 mr-2" />
                                        Download My Data
                                    </Button>
                                    <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                                        <AlertTriangle className="h-4 w-4 mr-2" />
                                        Clear Cache
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* System Status */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Wifi className="h-5 w-5 text-primary" />
                                        System Status
                                    </CardTitle>
                                    <CardDescription>
                                        View current system status and connectivity
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-lg border">
                                        <div className="flex items-center gap-3">
                                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                                            <span>API Server</span>
                                        </div>
                                        <Badge className="bg-green-100 text-green-700">Online</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border">
                                        <div className="flex items-center gap-3">
                                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                                            <span>Database</span>
                                        </div>
                                        <Badge className="bg-green-100 text-green-700">Connected</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border">
                                        <div className="flex items-center gap-3">
                                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                                            <span>File Storage</span>
                                        </div>
                                        <Badge className="bg-green-100 text-green-700">Available</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground text-center">
                                        Last checked: Just now
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={handleSaveSystem} className="bg-primary hover:bg-primary/90">
                                <Save className="h-4 w-4 mr-2" />
                                Save System Settings
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Settings;
