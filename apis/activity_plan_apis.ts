import { ActivityPlan } from "../types/activity_plan/ActivityPlan"

const baseUrl = "http://127.0.0.1:8000"

export const getSchedules = async (activityPlanId: number, dateStr: string): Promise<ActivityPlan> => {
    const formattedDate = dateStr.split('T')[0].replace(/-/g, '')
    const url = `${baseUrl}/activity-plan/${activityPlanId}/get_schedules/?date=${formattedDate}&format=json`
    const response = await fetch(`${url}`)
    return response.json()
}