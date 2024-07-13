import { AssignmentDeadlineForm, IAssignmentDeadline } from "../types/course_plan/AssignmentDeadline"

const baseUrl = 'http://127.0.0.1:8000'

export const getAllAssignmentDeadline = async(): Promise<IAssignmentDeadline[]> => {
    const res = await fetch(`${baseUrl}/assignment-deadline/`)
    const data = await res.json()
    return data.results
}

export const addAssignmentDeadline = async ({ assignmentDeadline }: { assignmentDeadline: AssignmentDeadlineForm }): Promise<IAssignmentDeadline> => {
    const res = await fetch(`${baseUrl}/assignment-deadline/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignmentDeadline)
    })
    const data = await res.json()
    return data
}

export const updateAssignmentDeadline = async ({ id, assignmentDeadline }: { id: number, assignmentDeadline: AssignmentDeadlineForm }): Promise<IAssignmentDeadline> => {
    const res = await fetch(`${baseUrl}/assignment-deadline/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignmentDeadline)
    })
    const data = await res.json()
    return data
}

export const deleteAssignmentDeadline = async ({ id }: { id: number }): Promise<void> => {
    await fetch(`${baseUrl}/assignment-deadline/${id}/`, {
        method: 'DELETE'
    })
}
    