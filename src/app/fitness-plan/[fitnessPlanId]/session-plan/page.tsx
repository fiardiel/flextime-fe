import React from 'react';
import { redirect } from 'next/navigation';
import SessionPlanList from './components/SessionPlanList';
import { ISessionPlan } from '../../../../../types/fitness_plan/SessionPlan';
import { getSessionPlanByFitnessPlan } from '../../../../../apis/fitness_plan_apis';
import BackButton from '@/app/components/BackButton';

const SessionPlanPage = async ({ params }: { params: { fitnessPlanId: number } }) => {
    try {
        const sessionPlans: ISessionPlan[] = await getSessionPlanByFitnessPlan({ fitnessPlanId: params.fitnessPlanId });

        return (
            <div>
                <div className='z-48 ml-14 mt-10 mb-1'>
                    <BackButton />
                </div>
                <div className='flex flex-col h-full mx-10 p-6'>
                    <div className='font-sans'>
                        <h3 className='text-4xl font-bold font-custom col-span-3 text-start mt-4'>your session plans:</h3>
                        <SessionPlanList initSessionPlans={sessionPlans} />
                    </div>
                </div>
            </div>

        );
    } catch (error) {
        console.error('Error fetching session plans:', error);
        redirect('/error');
    }
};

export default SessionPlanPage;
