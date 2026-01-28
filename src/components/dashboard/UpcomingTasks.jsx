import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import  Button  from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import  Badge  from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';





const priorityStyles = {
    high: 'bg-destructive/10 text-destructive border-destructive/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    low: 'bg-info/10 text-info border-info/20',
};

export function UpcomingTasks() {
    const [tasks, setTasks] = useState(initialTasks);

    const toggleTask = (taskId) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const pendingCount = tasks.filter(t => !t.completed).length;

    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">Today's Tasks</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            {completedCount} completed, {pendingCount} pending
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="gap-1">
                            <CheckCircle2 size={12} />
                            {completedCount}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                            <AlertCircle size={12} />
                            {pendingCount}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[250px] pr-4">
                        <div className="space-y-3">
                            {tasks.map((task, index) => (
                                <div
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${task.completed ? 'bg-muted/30 opacity-60' : 'bg-card hover:bg-muted/50'
                                        }`}
                                >
                                    <Checkbox
                                        checked={task.completed}
                                        onCheckedChange={() => toggleTask(task.id)}
                                        className="h-5 w-5"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                            {task.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock size={12} className="text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">{task.time}</span>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className={priorityStyles[task.priority]}>
                                        {task.priority}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
