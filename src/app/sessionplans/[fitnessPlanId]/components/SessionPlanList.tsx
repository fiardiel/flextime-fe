'use client';

import { useState } from 'react';
import SessionPlan from './SessionPlan';



interface SessionPlan {
    id: number;
    training_type: string;
    fitness_plan: number;
} 

interface SessionPlansListProps {
    sessionPlans: SessionPlan[];
}

const SessionPlanList: React.FC<SessionPlansListProps> = ({ sessionPlans }) => {
    return (
        <div> 
            <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-9'>
                {sessionPlans.map(plan => (
                    <SessionPlan sessionPlan={plan}/>
                ))}
            </div>
        </div>
    )
}

export default SessionPlanList
