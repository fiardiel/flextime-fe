import React from 'react';
import { redirect } from 'next/navigation';
import { getSessionPlanByFitnessPlan } from '../../../../apis/fitness_plan_apis';
import { ISessionPlan } from '../../../../types/fitness_plan/SessionPlan';
import SessionPlanList from './components/SessionPlanList';

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
