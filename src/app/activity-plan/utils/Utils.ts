import { CalendarDate, getLocalTimeZone } from "@internationalized/date"
import { format } from 'date-fns'
import { ActivityPlan } from "../../../../types/activity_plan/ActivityPlan"

export interface NormalizedSchedule {
    id: number
    name: string
    type: string
    start: string
    end: string
}

export const normalizeData = (activityPlan: ActivityPlan): NormalizedSchedule[] => {
    const normalized: NormalizedSchedule[] = []

    activityPlan.session_schedules.forEach(sched => {
        normalized.push({
            id: sched.id,
            name: sched.session_plan.training_type,
            type: 'Session',
            start: sched.start_time,
            end: sched.end_time
        })
    })
    
    activityPlan.class_schedules.forEach(sched => {
        normalized.push({
            id: sched.id,
            name: sched.class_name,
            type: 'Class',
            start: sched.start_time,
            end: sched.end_time
        })
    })

    activityPlan.test_schedules.forEach(sched => {
        normalized.push({
            id: sched.id,
            name: sched.test_name,
            type: 'Test',
            start: sched.test_start,
            end: sched.test_end
        })
    })

    activityPlan.assignment_deadlines.forEach(sched => {
        normalized.push({
            id: sched.id,
            name: sched.assignment_name,
            type: 'Deadline',
            start: sched.assignment_due_time,
            end: ''
        })
    })

    return normalized
}

export const sortedSchedules = (schedules: NormalizedSchedule[]) => {
    return schedules.sort((a, b) => {
        if (a.start < b.start) {
            return -1
        }
        if (a.start > b.start) {
            return 1
        }
        return 0
    })
}

export const getDayName = (date: CalendarDate) => {
    const dateObj = date.toDate(getLocalTimeZone())
    return format(dateObj, 'EEE')
}