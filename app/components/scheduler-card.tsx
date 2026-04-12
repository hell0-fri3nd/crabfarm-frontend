import { Calendar, CalendarDays, CalendarRange, Clock, Repeat, Timer, Utensils } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { cn } from '~/lib/utils'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import SwitchLabel from './switch-label'

interface Schedule {
  id: number
  hour: number
  seconds: number
  is_enabled: boolean
  scheduler_type: "custom" | "daily" | "weekly" | "monthly"
  type: string
}

interface SchedulerCardProps {
  schedule: Schedule
  onToggle?: (id: number, enabled: boolean) => void
}

const SchedulerCard = ({ schedule, onToggle }: SchedulerCardProps) => {

    const SchedulerIcon = getSchedulerIcon(schedule.scheduler_type)
    const TypeIcon = getTypeIcon(schedule.type)
    const isCustom = schedule.scheduler_type === "custom"

    function formatTime(hour: number): string {
        const period = hour >= 12 ? "PM" : "AM"
        const displayHour = hour % 12 || 12
        return `${displayHour}:00 ${period}`
    }

    function getSchedulerIcon(type: string) {
        switch (type) {
            case "daily":
            return Calendar
            case "weekly":
            return CalendarDays
            case "monthly":
            return CalendarRange
            case "custom":
            return Timer
            default:
            return Clock
        }
    }

    function getTypeIcon(type: string) {
        switch (type.toLowerCase()) {
            case "feeding":
            return Utensils
            default:
            return Clock
        }
    }

    return (
        <Card
        className={cn(
            "transition-all duration-200",
            schedule.is_enabled 
            ? "border-border" 
            : "opacity-60"
        )}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                    {/* Left content */}
                    <div className="flex-1 space-y-3">
                        {/* Header row with badges */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge 
                                variant={schedule.is_enabled ? "default" : "secondary"}
                                className="gap-1.5 capitalize"
                            >
                                <TypeIcon className="h-3 w-3" />
                                {schedule.type}
                            </Badge>
                            <Badge 
                                variant="outline" 
                                className={cn(
                                "gap-1.5 capitalize",
                                isCustom && "border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                                )}
                            >
                                <SchedulerIcon className="h-3 w-3" />
                                {schedule.scheduler_type}
                            </Badge>
                        </div>

                        <Separator />

                        {/* Time display */}
                        <div className="space-y-1">
                        {isCustom ? (
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                                    <Repeat className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold tracking-tight">
                                    Every {schedule.hour} {schedule.hour === 1 ? "hour" : "hours"}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                    Interval-based schedule
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <Clock className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold tracking-tight">
                                    {formatTime(schedule.hour)}
                                    </p>
                                    <p className="text-sm text-muted-foreground capitalize">
                                    Runs {schedule.scheduler_type}
                                    </p>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>

                    {/* Right side - Toggle */}
                    <div className="flex flex-col items-center gap-3 pt-0">

                        <SwitchLabel 
                        id={`scheduler-${schedule.id}`}
                        checked={schedule.is_enabled}
                        onCheckedChange={(checked) => onToggle?.(schedule.id, checked)}
                        label={schedule.is_enabled ? "Active" : "Inactive"}
                        />
                        {/* <Switch
                        id={`scheduler-${schedule.id}`}
                        checked={schedule.is_enabled}
                        onCheckedChange={(checked) => onToggle?.(schedule.id, checked)}
                        />
                        <Label
                        htmlFor={`scheduler-${schedule.id}`}
                        className={cn(
                            "text-xs font-medium cursor-pointer",
                            schedule.is_enabled ? "text-primary" : "text-muted-foreground"
                        )}
                        >
                        {schedule.is_enabled ? "Active" : "Inactive"}
                        </Label> */}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SchedulerCard