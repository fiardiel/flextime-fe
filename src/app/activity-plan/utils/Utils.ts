import { CalendarDate, getLocalTimeZone } from "@internationalized/date"
import { format } from 'date-fns'
import { ActivityPlan } from "../../../types/activity_plan/ActivityPlan"
import { getSessionPlanById } from "../../../apis/fitness_plan_apis"

export interface NormalizedSchedule {
    id: number
    name: string
    type: string
    start: string
    end: string
}

export const normalizeData = async (activityPlan: ActivityPlan): Promise<NormalizedSchedule[]> => {
    const normalized: NormalizedSchedule[] = [];

    const sessionPromises = activityPlan.session_schedules.map(async (sched) => {
        const sessionPlan = await getSessionPlanById({ id: sched.session_plan });
        return {
            id: sched.id,
            name: sessionPlan.training_type,
            type: 'Session',
            start: sched.start_time,
            end: sched.end_time
        };
    });

    const sessions = await Promise.all(sessionPromises);
    normalized.push(...sessions);

    activityPlan.class_schedules.forEach((sched) => {
        normalized.push({
            id: sched.id,
            name: sched.class_name,
            type: 'Class',
            start: sched.start_time,
            end: sched.end_time
        });
    });

    activityPlan.test_schedules.forEach((sched) => {
        normalized.push({
            id: sched.id,
            name: sched.test_name,
            type: 'Test',
            start: sched.test_start,
            end: sched.test_end
        });
    });

    activityPlan.assignment_deadlines.forEach((sched) => {
        normalized.push({
            id: sched.id,
            name: sched.assignment_name,
            type: 'Deadline',
            start: sched.assignment_due_time,
            end: ''
        });
    });

    console.log(normalized);

    return normalized;
};


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