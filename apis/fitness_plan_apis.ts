import { CustomizationForm, ICustomization } from '../types/fitness_plan/Customization';
import { FitnessPlanForm, IFitnessPlan } from '../types/fitness_plan/FitnessPlan';
import { Duration, ISessionPlan, SessionPlanForm } from '../types/fitness_plan/SessionPlan';
import { ISessionTraining, SessionTrainingForm } from '../types/fitness_plan/SessionTraining';
import { ITraining } from '../types/fitness_plan/Training';

const baseUrl = 'http://127.0.0.1:8000'

export const getAllFitnessPlans = async (): Promise<IFitnessPlan[]> => {
    const res = await fetch(`${baseUrl}/fitness-plan/`)
    const data = await res.json()
    return data.results
}

export const addFitnessPlan = async (fitnessPlan: FitnessPlanForm): Promise<IFitnessPlan> => {
    const res = await fetch(`${baseUrl}/fitness-plan/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(fitnessPlan)
    })
    const newFitnessPlan = await res.json()
    return newFitnessPlan
}

export const getFitnessPlanById = async ({ id }: { id: number }): Promise<any> => {
    const res = await fetch(`${baseUrl}/fitness-plan/${id}/`)
    const data = await res.json()
    return data
}

export const updateFitnessPlanById = async ({ id, fitnessPlan }: { id: number, fitnessPlan: FitnessPlanForm }): Promise<IFitnessPlan> => {
    const res = await fetch(`${baseUrl}/fitness-plan/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(fitnessPlan)
    })
    const updatedFitnessPlan = await res.json()
    return updatedFitnessPlan
}

export const getSessionPlanByFitnessPlan = async ( {fitnessPlanId}: { fitnessPlanId: number } ): Promise<ISessionPlan[]> => {
    const res = await fetch(`${baseUrl}/session-plan/?fitness_plan=${fitnessPlanId}`, { next: { tags: ['sessionPlans'] } })
    const data =  await res.json()
    return data.results
}

export const deleteSessionPlan = async ( {sessionPlanId}: { sessionPlanId: number } ): Promise<void> => {
    await fetch(`${baseUrl}/session-plan/${sessionPlanId}/`, {
        method: 'DELETE'
    });
}

export const getTrainingsByTrainingType = async ({ trainingType }: { trainingType: string }): Promise<ITraining[]> => {
    const res = await fetch(`${baseUrl}/training/?training_type=${trainingType}`);
    const data = await res.json()
    return data.results;
}

export const getSessionTrainingsBySessionPlan = async ({ sessionPlanId }: { sessionPlanId: number }): Promise<ISessionTraining[]> => {
    const res = await fetch(`${baseUrl}/session-training/?session_plan=${sessionPlanId}`, { next: { tags: ['sessionTrainings'] } });
    const data = await res.json();
    return data.results;
}

export const getSessionPlanById = async ({ id }: { id: string }): Promise<ISessionPlan> => {
    const res = await fetch(`${baseUrl}/session-plan/${id}/`);
    const data = await res.json();
    return data;
}

export const deleteSessionTraining = async ({ id }: { id: number }): Promise<void> => {
    await fetch(`${baseUrl}/session-training/${id}/`, {
        method: 'DELETE'
    });
}

export const getTrainingById = async ({ id }: { id: number }): Promise<ITraining> => {
    const res = await fetch(`${baseUrl}/training/${id}/`)
    const data = await res.json()
    return data
}

export const getCustomizationById = async ({ id }: { id: number }): Promise<ICustomization> => {
    const res = await fetch(`${baseUrl}/customization/${id}/`)
    const data = await res.json()
    return data
}

export const addCustomization = async ( customization: CustomizationForm ): Promise<ICustomization> => {
    const res = await fetch(`${baseUrl}/customization/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(customization)
    })
    const newCustomziation = await res.json()
    return newCustomziation
}

export const addSessionTraining = async ( sessionTraining: SessionTrainingForm ): Promise<ISessionTraining> => {
    const res = await fetch(`${baseUrl}/session-training/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(sessionTraining)
    })
    const newSessionTraining = await res.json()
    return newSessionTraining
}

export const updateCustomization = async ( { id, customization }: { id: number, customization: CustomizationForm } ): Promise<ICustomization> => {
    const res = await fetch(`${baseUrl}/customization/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(customization)
    })
    const updatedCustomization = await res.json()
    return updatedCustomization
}

export const deleteCustomization = async ( { id }: { id: number } ): Promise<void> => {
    await fetch(`${baseUrl}/customization/${id}/`, {
        method: 'DELETE'
    });
}

export const getTotalDuration = async ( { sessionPlanId }: { sessionPlanId: number } ): Promise<Duration> => {
    const res = await fetch(`${baseUrl}/session-plan/${sessionPlanId}/total_duration/`)
    const data = await res.json()
    return data
}

export const getTrainingCountBySessionPlan = async ({ sessionPlanId }: { sessionPlanId: number }): Promise<number> => {
    const res = await fetch(`${baseUrl}/session-training/?session_plan=${sessionPlanId}`)
    const data = await res.json()
    return data.count
}

export const addSessionPlan = async (sessionPlan: SessionPlanForm): Promise<ISessionPlan> => {
    const res = await fetch(`${baseUrl}/session-plan/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(sessionPlan)
    })
    const newSessionPlan = await res.json()
    return newSessionPlan
}