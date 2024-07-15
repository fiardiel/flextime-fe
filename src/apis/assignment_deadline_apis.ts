import { Token } from "@/types/user/User"
import { AssignmentDeadlineForm, IAssignmentDeadline } from "../types/course_plan/AssignmentDeadline"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getAllAssignmentDeadline = async(token: Token): Promise<IAssignmentDeadline[]> => {
    const res = await fetch(`${baseUrl}/assignment-deadline/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await res.json()
    return data
}

export const addAssignmentDeadline = async (assignmentDeadline: AssignmentDeadlineForm, token: Token): Promise<IAssignmentDeadline> => {
    const res = await fetch(`${baseUrl}/assignment-deadline/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(assignmentDeadline)
    })
    const data = await res.json()
    return data
}

export const updateAssignmentDeadline = async (id: number, assignmentDeadline: AssignmentDeadlineForm, token:Token): Promise<IAssignmentDeadline> => {
    const res = await fetch(`${baseUrl}/assignment-deadline/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(assignmentDeadline)
    })
    const data = await res.json()
    return data
}

export const deleteAssignmentDeadline = async (id: number, token: Token): Promise<void> => {
    await fetch(`${baseUrl}/assignment-deadline/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
}
    