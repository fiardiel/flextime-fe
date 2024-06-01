import React from 'react';
import { redirect } from 'next/navigation';
import SessionPlans from '@/app/components/SessionPlans';

interface SessionPlan {
    id: number;
    training_type: string;
    fitness_plan: number;
}

const SessionPlanPage = async ({ params }: { params: { fitnessPlanId: string } }) => {
    const fitnessPlanId = params.fitnessPlanId;

    try {
        const res = await fetch(`http://127.0.0.1:8000/sessionplans/?fitnessPlan=${fitnessPlanId}`, { cache: "no-store" });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        const sessionPlans: SessionPlan[] = data.results;

        return (
            <div className='min-h-screen flex flex-col items-center justify-center -translate-y-10'>
                <h1 className='text-5xl font-bold font-mono mb-2 col-span-3 text-start'>your session plans:</h1>
                <SessionPlans sessionPlans={sessionPlans}/>
            </div>
        );
    } catch (error) {
        console.error('Error fetching session plans:', error);
        redirect('/error');
    }
};

export default SessionPlanPage;
