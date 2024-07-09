import React from 'react'
import { getSessionPlanById, getSessionTrainingsBySessionPlan, getTrainingsByTrainingType } from '../../../../apis/fitness_plan_apis';
import Trainings from './components/Trainings';

const SessionTrainingPage = async ({ params }: { params: { sessionPlanId: string } }) => {
    const sessionTrainings = await getSessionTrainingsBySessionPlan({ sessionPlanId: parseInt(params.sessionPlanId) });
    const sessionPlan = await getSessionPlanById({ id: Number(params.sessionPlanId) });
    const availableTrainings = await getTrainingsByTrainingType({ trainingType: sessionPlan.training_type });

    return (
        <div className='flex flex-col items-center h-full w-full'>
            <Trainings trainingType={sessionPlan.training_type} initPickedTrainings={sessionTrainings} availableTrainings={availableTrainings}/>
        </div>
    )
}

export default SessionTrainingPage
