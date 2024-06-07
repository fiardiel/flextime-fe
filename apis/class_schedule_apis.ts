import { ClassScheduleForm, IClassSchedule } from "../types/course_plan/ClassSchedule"

const baseUrl = 'http://127.0.0.1:8000'

export const getAllClassSchedule = async(): Promise<IClassSchedule[]> => {
    const res = await fetch(`${baseUrl}/class-schedule/`)
    const data = await res.json()
    return data.results
}

export const addClassSchedule = async({ classSchedule }: { classSchedule: ClassScheduleForm }): Promise<IClassSchedule> => {
    const res = await fetch(`${baseUrl}/class-schedule/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(classSchedule)
    })
    const data = await res.json()
    return data
}

export const updateClassSchedule = async({ id, classSchedule }: { id: number, classSchedule: ClassScheduleForm }): Promise<IClassSchedule> => {
    const res = await fetch(`${baseUrl}/class-schedule/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(classSchedule)
    })
    const data = await res.json()
    return data
}

export const deleteClassSchedule = async({ id }: { id: number }): Promise<void> => {
    await fetch(`${baseUrl}/class-schedule/${id}/`, {
        method: 'DELETE'
    })
}