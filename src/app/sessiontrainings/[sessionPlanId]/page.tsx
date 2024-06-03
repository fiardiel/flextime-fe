import React from 'react'
import { getSessionPlanById, getSessionTrainingsBySessionPlan, getTrainingsByTrainingType } from '../../../../api';
import { parse } from 'path';
import PickedTrainingList from './components/PickedTrainingList';
import AvailableTrainingList from './components/AvailableTrainingList';

const SessionTrainingPage = async ({ params }: { params: { sessionPlanId: string } }) => {
    const sessionTrainings = await getSessionTrainingsBySessionPlan({ sessionPlanId: parseInt(params.sessionPlanId) });
    const sessionPlan = await getSessionPlanById({ id: params.sessionPlanId });
    const availableTrainings = await getTrainingsByTrainingType({ trainingType: sessionPlan.training_type });

    return (
        <div className='flex flex-col items-center h-full w-full'>
            <h1 className='text-5xl font-bold font-mono mb-2 col-span-3 text-start px-52 mt-28'>your session trainings:</h1>
            <div className='self-center font-sans'>
                <PickedTrainingList initPickedTrainings={sessionTrainings}></PickedTrainingList>
            </div>
            <h1 className='text-5xl font-bold font-mono mb-2 col-span-3 text-start px-52 mt-28'>available trainings:</h1>
            <div className='self-center font-sans'>
                <AvailableTrainingList availableTrainings={availableTrainings}></AvailableTrainingList>
            </div>
        </div>
    )
}

export default SessionTrainingPage
