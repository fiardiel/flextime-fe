import { Token } from '@/types/user/User';
import { CustomizationForm, ICustomization } from '../types/fitness_plan/Customization';
import { FitnessPlanForm, IFitnessPlan } from '../types/fitness_plan/FitnessPlan';
import { Duration, ISessionPlan, SessionPlanForm } from '../types/fitness_plan/SessionPlan';
import { ISessionTraining, SessionTrainingForm } from '../types/fitness_plan/SessionTraining';
import { ITraining } from '../types/fitness_plan/Training';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const baseUrl = 'http://127.0.0.1:8000'

export const addFitnessPlan = async (fitnessPlan: FitnessPlanForm, token: string): Promise<IFitnessPlan> => {
    const res = await fetch(`${baseUrl}/fitness-plan/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(fitnessPlan)
    })
    const newFitnessPlan = await res.json()
    return newFitnessPlan
}

export const getFitnessPlan = async (token: Token): Promise<IFitnessPlan> => {
    const res = await fetch(`${baseUrl}/fitness-plan/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`   
        }
    })
    const data = await res.json()
    return data
}

export const getFitnessPlanByUser = async (token: RequestCookie | undefined): Promise<IFitnessPlan> => {
    const res = await fetch(`${baseUrl}/fitness-plan/get_fitness_plan_by_user`, { 
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token?.value}`
        }
    })
    if (!res.ok) {
        throw new Error('Fitness Plan not found')
    }
    const data = await res.json()
    return data
}

export const updateFitnessPlanById = async ({ id, fitnessPlan, token }: { id: number, fitnessPlan: FitnessPlanForm, token: Token}): Promise<IFitnessPlan> => {
    const res = await fetch(`${baseUrl}/fitness-plan/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(fitnessPlan)
    })
    const updatedFitnessPlan = await res.json()
    return updatedFitnessPlan
}

export const getSessionPlanByFitnessPlan = async ( {fitnessPlanId, token}: { fitnessPlanId: number, token: Token } ): Promise<ISessionPlan[]> => {
    const res = await fetch(`${baseUrl}/session-plan/?fitness_plan=${fitnessPlanId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await res.json()
    return data
}

export const getSessionPlanById = async (id: number, token: Token): Promise<ISessionPlan> => {
    const res = await fetch(`${baseUrl}/session-plan/${id}/`, {
        method: 'GET', 
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export const addSessionPlan = async (sessionPlan: SessionPlanForm, token: Token): Promise<ISessionPlan> => {
    const res = await fetch(`${baseUrl}/session-plan/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(sessionPlan)
    })
    const newSessionPlan = await res.json()
    return newSessionPlan
}

export const deleteSessionPlan = async ( {sessionPlanId, token}: { sessionPlanId: number, token: Token } ): Promise<void> => {
    await fetch(`${baseUrl}/session-plan/${sessionPlanId}/`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
}

export const getTotalDuration = async ( { sessionPlanId, token }: { sessionPlanId: number, token: Token } ): Promise<Duration> => {
    const res = await fetch(`${baseUrl}/session-plan/${sessionPlanId}/total_duration/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await res.json()
    return data
}

export const getTrainingCountBySessionPlan = async (sessionPlanId: number, token: Token): Promise<number> => {
    const res = await fetch(`${baseUrl}/session-training/count/?session_plan=${sessionPlanId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await res.json()
    return data.count
}


export const getTrainingsByTrainingType = async (trainingType: string, token: Token): Promise<ITraining[]> => {
    const res = await fetch(`${baseUrl}/training/?training_type=${trainingType}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    const data = await res.json()
    return data;
}

export const getSessionTrainingsBySessionPlan = async (sessionPlanId: number, token: Token): Promise<ISessionTraining[]> => {
    const res = await fetch(`${baseUrl}/session-training/?session_plan=${sessionPlanId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export const getTrainingById = async (id: number, token: Token): Promise<ITraining> => {
    const res = await fetch(`${baseUrl}/training/${id}/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await res.json()
    return data
}

export const getCustomizationById = async (id:number, token:Token): Promise<ICustomization> => {
    const res = await fetch(`${baseUrl}/customization/${id}/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await res.json()
    return data
}

export const addCustomization = async ( customization: CustomizationForm, token: Token ): Promise<ICustomization> => {
    const res = await fetch(`${baseUrl}/customization/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(customization)
    })
    const newCustomziation = await res.json()
    return newCustomziation
}

export const addSessionTraining = async ( sessionTraining: SessionTrainingForm, token: Token ): Promise<ISessionTraining> => {
    const res = await fetch(`${baseUrl}/session-training/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(sessionTraining)
    })
    const newSessionTraining = await res.json()
    return newSessionTraining
}

export const updateCustomization = async ( id: number, customization: CustomizationForm, token: Token ): Promise<ICustomization> => {
    const res = await fetch(`${baseUrl}/customization/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(customization)
    })
    const updatedCustomization = await res.json()
    return updatedCustomization
}

export const deleteCustomization = async ( id: number, token: Token ): Promise<void> => {
    await fetch(`${baseUrl}/customization/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    console.log(`Customization with id ${id} deleted successfully`);
}