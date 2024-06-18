import React from 'react';
import { redirect } from 'next/navigation';
import SessionPlanList from './components/SessionPlanList';
import { ISessionPlan } from '../../../../../types/fitness_plan/SessionPlan';
import { getSessionPlanByFitnessPlan } from '../../../../../apis/fitness_plan_apis';

const SessionPlanPage = async ({ params }: { params: { fitnessPlanId: number } }) => {
    try {
        const sessionPlans: ISessionPlan[] =  await getSessionPlanByFitnessPlan({ fitnessPlanId: params.fitnessPlanId });

        return (
            <div className='flex flex-col h-full w-full'>
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
