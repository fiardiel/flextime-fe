import React from 'react';
import { redirect } from 'next/navigation';

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
            <div className='min-h-screen flex flex-col items-center justify-center'>
                <h1 className='text-5xl font-bold mb-5'>Your Session Plans!</h1>
                <div className='grid grid-cols-3 content-center justify-items-center p-10 gap-8'>
                    {sessionPlans.map((plan) => (
                        <div key={plan.id} className="hover:-translate-y-2 transition card bg-card-bg w-72 shadow-xl">
                            <div className="card-body">
                                <p className="card-title -mb-1">
                                    {plan.training_type}
                                </p>
                                <p className='text-gray-300 mb-4'>Flex up with FlexTime!</p>
                                <div className="card-actions justify-end">
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
