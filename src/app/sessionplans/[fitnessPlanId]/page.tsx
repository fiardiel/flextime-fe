import React from 'react';
import { redirect } from 'next/navigation';
import { getSessionPlanByFitnessPlan } from '../../../../api';
import { ISessionPlan } from '../../../../types/SessionPlan';
import SessionPlanList from './components/SessionPlanList';

const SessionPlanPage = async ({ params }: { params: { fitnessPlanId: string } }) => {
    const fitnessPlanId = Number(params.fitnessPlanId);
    try {
        const sessionPlans: ISessionPlan[] =  await getSessionPlanByFitnessPlan({ fitnessPlanId: fitnessPlanId });

        return (
            <div className='flex flex-col items-center h-full w-full'>
                <h1 className='text-5xl font-bold font-mono mb-2 col-span-3 text-start px-52 mt-28'>your session plans:</h1>
                <div className='self-center'>
                    <SessionPlanList sessionPlans={sessionPlans}/>
                </div>
                
            </div>
        );
    } catch (error) {
        console.error('Error fetching session plans:', error);
        redirect('/error');
    }
};

export default SessionPlanPage;
