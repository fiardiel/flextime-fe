import { Token } from "@/types/user/User"
import { TestSchedule, TestScheduleForm } from "../types/course_plan/TestSchedule"


const baseUrl = 'http://127.0.0.1:8000'

export const getAllTestSchedule = async(token: Token): Promise<TestSchedule[]> => {
    const res = await fetch(`${baseUrl}/test-schedule/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await res.json()
    return data
}

export const addTestSchedule = async (testSchedule: TestScheduleForm, token: Token): Promise<TestSchedule> => { 
    const res = await fetch(`${baseUrl}/test-schedule/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(testSchedule)
    })
    const data = await res.json()
    if (!res.ok) { 
        throw new Error(data.message)
    }
    return data
}

export const updateTestSchedule = async (id: number, testSchedule: TestScheduleForm, token: Token): Promise<TestSchedule> => {
    const res = await fetch(`${baseUrl}/test-schedule/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(testSchedule)
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }
    return data
}

export const deleteTestSchedule = async (id: number, token: Token) => {
    await fetch(`${baseUrl}/test-schedule/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
}