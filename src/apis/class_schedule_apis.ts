import { Token } from "@/types/user/User"
import { ClassScheduleForm, IClassSchedule } from "../types/course_plan/ClassSchedule"

const baseUrl = 'http://127.0.0.1:8000'

export const getAllClassSchedule = async(token: Token): Promise<IClassSchedule[]> => {
    const res = await fetch(`${baseUrl}/class-schedule`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await res.json()
    console.log('data:', data)
    return data
}

export const addClassSchedule = async(classSchedule: ClassScheduleForm, token: Token): Promise<IClassSchedule> => {
    const res = await fetch(`${baseUrl}/class-schedule/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(classSchedule)
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }
    return data
}

export const updateClassSchedule = async(id: number, classSchedule: ClassScheduleForm, token: Token): Promise<IClassSchedule> => {
    const res = await fetch(`${baseUrl}/class-schedule/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(classSchedule)
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }
    return data
}

export const deleteClassSchedule = async(id: number, token: Token): Promise<void> => {
    await fetch(`${baseUrl}/class-schedule/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
}