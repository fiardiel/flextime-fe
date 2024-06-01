import { IFitnessPlan } from './types/FitnessPlan';
import { ISessionPlan } from './types/SessionPlan';


const baseUrl = 'http://127.0.0.1:8000'

export const getAllFitnessPlans = async (): Promise<IFitnessPlan[]> => {
    const res = await fetch(`${baseUrl}/fitnessplans/`)
    const data = await res.json()
    return data.results
}

export const getSessionPlanByFitnessPlan = async ( {fitnessPlanId}: { fitnessPlanId: number } ): Promise<ISessionPlan[]> => {
    const res = await fetch(`${baseUrl}/sessionplans/?fitnessPlan=${fitnessPlanId}`, { next: { tags: ['sessionPlans'] } })
    const data =  await res.json()
    return data.results;
}

export const deleteSessionPlan = async ( {sessionPlanId}: { sessionPlanId: number } ): Promise<void> => {
    await fetch(`${baseUrl}/sessionplans/${sessionPlanId}/`, {
        method: 'DELETE'
    });
}