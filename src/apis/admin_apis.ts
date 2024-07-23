import { ITraining, TrainingForm } from "@/types/fitness_plan/Training"
import { Token } from "@/types/user/User"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const fetchTrainings = async (token: Token): Promise<ITraining[]> => {
    const res = await fetch(`${baseUrl}/training/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await res.json()
    return data
}

export const addTraining = async (training: TrainingForm, token: Token): Promise<ITraining> => {
    const res = await fetch(`${baseUrl}/training/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(training)
    })
    const data = await res.json()
    return data
}

export const updateTraining = async (id: number, training: TrainingForm, token: Token): Promise<ITraining> => {    
    const res = await fetch(`${baseUrl}/training/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(training)
    })
    const data = await res.json()
    return data
}

export const deleteTraining = async (id: number, token: Token): Promise<void> => {
    await fetch(`${baseUrl}/training/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
}