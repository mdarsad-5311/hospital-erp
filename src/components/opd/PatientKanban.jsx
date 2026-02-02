import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Badge from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Clock, MoreHorizontal } from 'lucide-react';

const initialData = {
    waiting: [
        { id: 'p1', name: 'John Doe', time: '10:00 AM', reason: 'Fever', priority: 'high' },
        { id: 'p2', name: 'Alice Smith', time: '10:15 AM', reason: 'Checkup', priority: 'medium' },
    ],
    vitals: [
        { id: 'p3', name: 'Robert Johnson', time: '09:45 AM', reason: 'BP Check', priority: 'low' },
    ],
    consultation: [
        { id: 'p4', name: 'Emily Davis', time: '09:30 AM', reason: 'Flu', priority: 'high' },
    ],
    pharmacy: [],
    done: [
        { id: 'p5', name: 'Michael Brown', time: '09:00 AM', reason: 'Follow up', priority: 'low' },
    ],
};

const columns = {
    waiting: 'Waiting Room',
    vitals: 'Vitals & Triage',
    consultation: 'Doctor Consultation',
    pharmacy: 'Pharmacy/Billing',
    done: 'Completed',
};

function SortableItem({ id, patient }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-700 hover:bg-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
            case 'low': return 'bg-green-100 text-green-700 hover:bg-green-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-3">
            <Card className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                    {patient.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">{patient.name}</p>
                                <p className="text-xs text-muted-foreground">{patient.reason}</p>
                            </div>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <Badge variant="secondary" className={`text-[10px] px-1.5 py-0.5 ${getPriorityColor(patient.priority)} border-0`}>
                            {patient.priority.toUpperCase()}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <Clock size={12} className="mr-1" />
                            {patient.time}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function Column({ id, patients, title }) {
    const { setNodeRef } = useSortable({ id });

    return (
        <div className="flex flex-col h-full rounded-lg bg-muted/50 p-2 min-w-[280px]">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-semibold text-sm text-foreground">{title}</h3>
                <Badge variant="outline" className="text-xs">{patients.length}</Badge>
            </div>
            <div ref={setNodeRef} className="flex-1 min-h-[100px]">
                <SortableContext items={patients.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                    {patients.map((patient) => (
                        <SortableItem key={patient.id} id={patient.id} patient={patient} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}

export default function PatientKanban() {
    const [items, setItems] = useState(initialData);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const findContainer = (id) => {
        if (id in items) return id;
        return Object.keys(items).find((key) => items[key].find((p) => p.id === id));
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        const overId = over?.id;

        if (!overId || active.id === overId) return;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(overId);

        if (!activeContainer || !overContainer || activeContainer === overContainer) return;

        setItems((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];
            const activeIndex = activeItems.findIndex((p) => p.id === active.id);
            const overIndex = overItems.findIndex((p) => p.id === overId);

            let newIndex;
            if (overId in prev) {
                newIndex = overItems.length + 1;
            } else {
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((item) => item.id !== active.id),
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    activeItems[activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length),
                ],
            };
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over?.id);

        if (activeContainer && overContainer && activeContainer !== overContainer) {
            // logic handled in dragOver for cross-container
        } else if (activeContainer && overContainer && activeContainer === overContainer) {
            const activeIndex = items[activeContainer].findIndex((p) => p.id === active.id);
            const overIndex = items[overContainer].findIndex((p) => p.id === over.id);

            if (activeIndex !== overIndex) {
                setItems((items) => ({
                    ...items,
                    [activeContainer]: arrayMove(items[activeContainer], activeIndex, overIndex),
                }));
            }
        }

        setActiveId(null);
    };

    const getActivePatient = () => {
        for (const key in items) {
            const patient = items[key].find((p) => p.id === activeId);
            if (patient) return patient;
        }
        return null;
    };

    return (
        <div className="h-full overflow-x-auto">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-4 h-full min-w-[1200px] pb-4">
                    {Object.keys(columns).map((key) => (
                        <div key={key} className="flex-1">
                            <Column
                                id={key}
                                title={columns[key]}
                                patients={items[key]}
                            />
                        </div>
                    ))}
                </div>
                <DragOverlay>
                    {activeId ? <div className="opacity-80 rotate-2"><SortableItem id={activeId} patient={getActivePatient()} /></div> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
