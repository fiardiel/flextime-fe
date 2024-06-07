import { TestSchedule, TestScheduleForm } from "../types/course_plan/TestSchedule"


const baseUrl = 'http://127.0.0.1:8000'

export const getAllTestSchedule = async(): Promise<TestSchedule> => {
    const res = await fetch(`${baseUrl}/test-schedule/`)
    const data = await res.json()
    return data.results
}

export const addTestSchedule = async ({ testSchedule }: { testSchedule: TestScheduleForm }): Promise<TestSchedule> => { 
    const res = await fetch(`${baseUrl}/test-schedule/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(testSchedule)
    })
    const data = await res.json()
    return data
}

export const updateTestSchedule = async ({ id, testSchedule }: { id: number, testSchedule: TestScheduleForm }): Promise<TestSchedule> => {
    const res = await fetch(`${baseUrl}/test-schedule/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(testSchedule)
    })
    const data = await res.json()
    return data
}

export const deleteTestSchedule = async ({ id }: { id: number }) => {
    await fetch(`${baseUrl}/test-schedule/${id}/`, {
        method: 'DELETE'
    })
}