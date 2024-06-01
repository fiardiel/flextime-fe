'use client';

import React from 'react'
import DeleteSessionPlanButton from './DeleteSessionPlanButton';
import ViewTrainingsButton from './ViewTrainingsButton';


interface SessionPlan {
    id: number;
    training_type: string;
    fitness_plan: number;
} 

interface SessionPlansListProps {
    sessionPlans: SessionPlan[];
}

const SessionPlans: React.FC<SessionPlansListProps> = ({ sessionPlans }) => {
    return (
        <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-9'>
            {sessionPlans.map((plan) => (
                <div className="hover:-translate-y-2 hover:scale-110 transition card bg-card-bg w-72 shadow-xl">
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
  )
}

export default SessionPlans
