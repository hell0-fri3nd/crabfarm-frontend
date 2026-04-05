import React from 'react'
import { Button } from './ui'
import { Clock, Plus, X } from 'lucide-react'
import type { DispenserGroup } from '~/types/configuration';
import ScheduleModal from './modal/schedule-modal';

interface FeedingSchedule {
    id: number;
    type: 'row' | 'column';
    groups: string[];
    time: string;
    portion: number;
}

const SchedulerSection = ({groups}: { groups: DispenserGroup[] }) => {

    const [schedules, setSchedules] = React.useState<FeedingSchedule[]>([]);
    const [openSchedule,setOpenSchedule] = React.useState(false);
    const getGroupNames = (groupIds: string[]) => {
        return groupIds
        .map((label) => groups.find((g) => g.label === label)?.label)
        .filter(Boolean)
        .join(', ');
    };

    return (
        <div>            
            <section className="space-y-6 mt-16 pt-12 border-t border-border/30">

                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-foreground">Feeding Schedules</h2>
                        <p className="text-sm text-muted-foreground">Automate feeding at specific times</p>
                    </div>
                    <Button
                    onClick={() => setOpenSchedule(true)}
                    size="lg">
                        <Plus className="w-12 h-12" />
                        <span className='hidden md:inline'>Add Schedule</span>
                    </Button>
                </div>

                {/* Schedules List */}
                {schedules.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border/40 p-12 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted/40 mb-4">
                            <Clock className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-foreground font-medium">No schedules yet</p>
                        <p className="text-sm text-muted-foreground mt-1">Create your first automatic feeding schedule</p>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {schedules.map((schedule) => (
                            <div
                            key={schedule.id}
                            className="flex items-center justify-between rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm p-4 hover:bg-card/60 hover:border-border transition-all group"
                            >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-foreground/10 text-foreground text-xs font-semibold uppercase">
                                        {schedule.type}
                                    </span>
                                    <span className="text-sm font-medium text-foreground truncate">
                                        {getGroupNames(schedule.groups)}
                                    </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        {schedule.time}
                                    </span>
                                    <span className="text-border/60">•</span>
                                    <span className="font-medium text-foreground/70">{schedule.portion}g</span>
                                </div>
                            </div>
                            <Button
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 w-8 p-0 transition-opacity"
                            size="icon">
                                <X className="w-4 h-4" />
                            </Button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <ScheduleModal open={openSchedule} onOpenChange={setOpenSchedule} />
        </div>
    )
}

export default SchedulerSection