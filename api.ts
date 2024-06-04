import { CustomizationForm, ICustomization } from './types/Customization';
import { IFitnessPlan } from './types/FitnessPlan';
import { Duration, ISessionPlan } from './types/SessionPlan';
import { ISessionTraining, SessionTrainingForm } from './types/SessionTraining';
import { ITraining } from './types/Training';


const baseUrl = 'http://127.0.0.1:8000'

export const getAllFitnessPlans = async (): Promise<IFitnessPlan[]> => {
    const res = await fetch(`${baseUrl}/fitnessplans/`)
    const data = await res.json()
    return data.results
}

export const getSessionPlanByFitnessPlan = async ( {fitnessPlanId}: { fitnessPlanId: number } ): Promise<ISessionPlan[]> => {
    const res = await fetch(`${baseUrl}/sessionplans/?fitnessplan=${fitnessPlanId}`, { next: { tags: ['sessionPlans'] } })
    const data =  await res.json()
    return data.results
}

export const deleteSessionPlan = async ( {sessionPlanId}: { sessionPlanId: number } ): Promise<void> => {
    await fetch(`${baseUrl}/sessionplans/${sessionPlanId}/`, {
        method: 'DELETE'
    });
}

export const getTrainingsByTrainingType = async ({ trainingType }: { trainingType: string }): Promise<ITraining[]> => {
    const res = await fetch(`${baseUrl}/trainings/?training_type=${trainingType}`);
    const data = await res.json()
    return data.results;
}

export const getSessionTrainingsBySessionPlan = async ({ sessionPlanId }: { sessionPlanId: number }): Promise<ISessionTraining[]> => {
    const res = await fetch(`${baseUrl}/sessiontrainings/?sessionplan=${sessionPlanId}`, { next: { tags: ['sessionTrainings'] } });
    const data = await res.json();
    return data.results;
}

export const getSessionPlanById = async ({ id }: { id: string }): Promise<ISessionPlan> => {
    const res = await fetch(`${baseUrl}/sessionplans/${id}/`);
    const data = await res.json();
    return data;
}

export const deleteSessionTraining = async ({ id }: { id: number }): Promise<void> => {
    await fetch(`${baseUrl}/sessiontrainings/${id}/`, {
        method: 'DELETE'
    });
}

export const getTrainingById = async ({ id }: { id: number }): Promise<ITraining> => {
    const res = await fetch(`${baseUrl}/trainings/${id}/`)
    const data = await res.json()
    return data
}

export const getCustomizationById = async ({ id }: { id: number }): Promise<ICustomization> => {
    const res = await fetch(`${baseUrl}/customizations/${id}/`)
    const data = await res.json()
    return data
}

export const addCustomization = async ( customization: CustomizationForm ): Promise<ICustomization> => {
    const res = await fetch(`${baseUrl}/customizations/`, {
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
    const res = await fetch(`${baseUrl}/sessiontrainings/`, {
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
    const res = await fetch(`${baseUrl}/customizations/${id}/`, {
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
    await fetch(`${baseUrl}/customizations/${id}/`, {
        method: 'DELETE'
    });
}

export const getTotalDuration = async ( { sessionPlanId }: { sessionPlanId: number } ): Promise<Duration> => {
    const res = await fetch(`${baseUrl}/sessionplans/${sessionPlanId}/total_duration/`)
    const data = await res.json()
    return data
}

export const getTrainingCountBySessionPlan = async ({ sessionPlanId }: { sessionPlanId: number }): Promise<number> => {
    const res = await fetch(`${baseUrl}/sessiontrainings/?sessionplan=${sessionPlanId}`)
    const data = await res.json()
    return data.count
}