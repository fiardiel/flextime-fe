import React from 'react'
import { getSessionPlanById, getSessionTrainingsBySessionPlan, getTrainingsByTrainingType } from '../../../apis/fitness_plan_apis';
import Trainings from './components/Trainings';
import BackButton from '@/app/components/BackButton';
import { cookies } from 'next/headers';

const SessionTrainingPage = async ({ params }: { params: { sessionPlanId: number } }) => {
    const token = cookies().get('userToken')?.value;
    const sessionTrainings = await getSessionTrainingsBySessionPlan(params.sessionPlanId, token);
    const sessionPlan = await getSessionPlanById(params.sessionPlanId, token);
    const availableTrainings = await getTrainingsByTrainingType(sessionPlan.training_type, token);

    return (
        <div>
            <div className='z-48 ml-14 mt-10 justify-self-start'>
                <BackButton />
            </div>
            <div className='flex flex-col items-center h-full w-full'>
                <Trainings trainingType={sessionPlan.training_type} initPickedTrainings={sessionTrainings} availableTrainings={availableTrainings} />
            </div>
        </div>
    )
}

export default SessionTrainingPage
