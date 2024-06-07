import React from 'react';
import { redirect } from 'next/navigation';
import { getSessionPlanByFitnessPlan } from '../../../../apis/fitness_plan_apis';
import { ISessionPlan } from '../../../../types/fitness_plan/SessionPlan';
import SessionPlanList from './components/SessionPlanList';

const SessionPlanPage = async ({ params }: { params: { fitnessPlanId: number } }) => {
    try {
        const sessionPlans: ISessionPlan[] =  await getSessionPlanByFitnessPlan({ fitnessPlanId: params.fitnessPlanId });

        return (
            <div className='flex flex-col items-center h-full w-full'>
                <h1 className='text-5xl font-bold font-mono mb-2 col-span-3 text-start px-52 mt-28'>your session plans:</h1>
                <div className='self-center font-sans'>
                    <SessionPlanList initSessionPlans={sessionPlans}/>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching session plans:', error);
        redirect('/error');
    }
};

export default SessionPlanPage;
