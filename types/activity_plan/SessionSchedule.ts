import { ISessionPlan } from "../fitness_plan/SessionPlan"

export interface SessionSchedule {
    id: number
    session_plan: ISessionPlan
    activity_plan: number
    start_time: string
    end_time: string
    day: string
}