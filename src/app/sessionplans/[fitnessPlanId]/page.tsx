import React from 'react';
import { redirect } from 'next/navigation';
import ViewTrainingsButton from '@/app/components/ViewTrainingsButton';
import DeleteSessionPlanButton from '@/app/components/DeleteSessionPlanButton';

interface SessionPlan {
    id: number;
    training_type: string;
    trainings: number[];
}

const SessionPlanPage = async ({ params }: { params: { fitnessPlanId: string } }) => {
    const fitnessPlanId = params.fitnessPlanId;

    try {
        const res = await fetch(`http://127.0.0.1:8000/sessionplans/?fitnessPlan=${fitnessPlanId}`);
        
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        const sessionPlans: SessionPlan[] = data.results;

        return (
            <div className='min-h-screen flex flex-col items-center justify-center -translate-y-10'>
                <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-8'>
                <h1 className='text-5xl font-semibold font-mono mb-2 col-span-3'>your session plans:</h1>
                    {sessionPlans.map((plan) => (
                        <div key={plan.id} className="hover:-translate-y-2 transition card bg-card-bg w-72 shadow-xl">
                            <div className="card-body">
                                <p className="card-title -mb-1 font-mono font-extrabold">
                                    {plan.training_type}
                                </p>
                                <p className='text-gray-400 text-sm mb-4'>Flex up with FlexTime!</p>
                                <div className="card-actions justify-end">
                                    <ViewTrainingsButton sessionPlanId={plan.id}></ViewTrainingsButton>
                                    <DeleteSessionPlanButton sessionPlanId={plan.id}></DeleteSessionPlanButton>
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching session plans:', error);
        redirect('/error');
    }
};

export default SessionPlanPage;
