import { Token } from "@/types/user/User"
import { ActivityPlan, IActivityPlan } from "../types/activity_plan/ActivityPlan"
import { SessionSchedule, SessionScheduleForm } from "../types/activity_plan/SessionSchedule"
import { ISessionPlan } from "../types/fitness_plan/SessionPlan"

const baseUrl = "http://127.0.0.1:8000"

export const getSchedules = async (activityPlanId: number, dateStr: string, token: Token): Promise<ActivityPlan> => {
    const formattedDate = dateStr.split('T')[0].replace(/-/g, '')
    const url = `${baseUrl}/activity-plan/${activityPlanId}/get_schedules/?date=${formattedDate}`
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await response.json()
    return data
}

export const getActivityPlan = async (token: Token): Promise<IActivityPlan> => {
    const response = await fetch(`${baseUrl}/activity-plan/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await response.json()
    const activityPlan: IActivityPlan = data[0]
    return activityPlan
}

export const getActivityPlanById = async (activityPlanId: number): Promise<IActivityPlan> => { 
    const response = await fetch(`${baseUrl}/activity-plan/${activityPlanId}/`)
    return response.json()
}

export const getAvailableSessionPlans = async (activityPlanId: number): Promise<ISessionPlan[]> => {
    const response = await fetch(`${baseUrl}/activity-plan/${activityPlanId}/get_available_session_plans/`)
    return response.json()
}

export const getSessionSchedulesByActivityPlan = async (activityPlanId: number): Promise<SessionSchedule[]> => {
    const response = await fetch(`${baseUrl}/session-schedule/?activity_plan=${activityPlanId}`)
    const data = await response.json()
    return data.results
}

export const addSessionSchedule = async (sessionSchedule: SessionScheduleForm): Promise<SessionSchedule> => {
    const response = await fetch(`${baseUrl}/session-schedule/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(sessionSchedule)
    })
    const data = await response.json()
    if (!response.ok) {
        console.log(response.status, data.message, "ERROR")
        throw new Error(data.message)
    }
    return data
}

export const getSessionScheduleById = async (sessionScheduleId: number): Promise<SessionSchedule> => {
    const response = await fetch(`${baseUrl}/session-schedule/${sessionScheduleId}/`)
    return response.json()
}

export const updateSessionSchedule = async (sessionScheduleId: number, sessionSchedule: SessionScheduleForm): Promise<SessionSchedule> => {
    const response = await fetch(`${baseUrl}/session-schedule/${sessionScheduleId}/`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(sessionSchedule)
    })

    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)
    }
    return data
}

export const deleteSessionSchedule = async (sessionScheduleId: number) => {
    await fetch (`${baseUrl}/session-schedule/${sessionScheduleId}/`, {method: 'DELETE'})
}