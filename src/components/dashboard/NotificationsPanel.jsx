import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import  Button  from '../ui/button';
import  Badge  from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import {
    Bell,
    AlertTriangle,
    Info,
    CheckCircle,
    X,
    MessageSquare
} from 'lucide-react';


const initialNotifications = [
    {
        id: '1',
        title: 'Critical Alert',
        message: 'Patient in Ward C requires immediate attention',
        type: 'alert',
        time: '2 min ago',
        read: false,
    },
    {
        id: '2',
        title: 'Lab Results Ready',
        message: 'Blood work results for patient #4521 are available',
        type: 'info',
        time: '15 min ago',
        read: false,
    },
    {
        id: '3',
        title: 'Appointment Confirmed',
        message: 'Dr. Chen confirmed appointment with Emma Wilson',
        type: 'success',
        time: '30 min ago',
        read: false,
    },
    {
        id: '4',
        title: 'New Message',
        message: 'You have a message from Dr. Sarah Johnson',
        type: 'message',
        time: '1 hour ago',
        read: true,
    },
    {
        id: '5',
        title: 'System Update',
        message: 'Scheduled maintenance tonight at 2:00 AM',
        type: 'info',
        time: '2 hours ago',
        read: true,
    },
];

const typeConfig = {
    alert: { icon: AlertTriangle, color: 'text-destructive', bgColor: 'bg-destructive/10' },
    info: { icon: Info, color: 'text-info', bgColor: 'bg-info/10' },
    success: { icon: CheckCircle, color: 'text-success', bgColor: 'bg-success/10' },
    message: { icon: MessageSquare, color: 'text-primary', bgColor: 'bg-primary/10' },
};

export function NotificationsPanel() {
    const [notifications, setNotifications] = useState(initialNotifications);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = () => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const dismissNotification = () => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Bell size={20} className="text-primary" />
                        <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
                        {unreadCount > 0 && (
                            <Badge className="bg-destructive text-destructive-foreground h-5 w-5 p-0 flex items-center justify-center text-xs">
                                {unreadCount}
                            </Badge>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                            Mark all read
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[280px] pr-4">
                        <AnimatePresence>
                            <div className="space-y-3">
                                {notifications.map((notification, index) => {
                                    const config = typeConfig[notification.type];
                                    const Icon = config.icon;
                                    return (
                                        <div
                                            className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${notification.read ? 'bg-muted/30' : 'bg-card hover:bg-muted/50'
                                                }`}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className={`w-8 h-8 rounded-full ${config.bgColor} ${config.color} flex items-center justify-center flex-shrink-0`}>
                                                <Icon size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : ''}`}>
                                                        {notification.title}
                                                    </p>
                                                    {!notification.read && (
                                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 flex-shrink-0"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    dismissNotification(notification.id);
                                                }}
                                            >
                                                <X size={14} />
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </AnimatePresence>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
