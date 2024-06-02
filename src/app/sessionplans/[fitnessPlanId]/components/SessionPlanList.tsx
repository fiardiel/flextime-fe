'use client';

import { useState } from 'react';
import SessionPlan from './SessionPlan';



interface SessionPlan {
    id: number;
    training_type: string;
    fitness_plan: number;
} 

interface SessionPlansListProps {
    initSessionPlans: SessionPlan[];
}

const SessionPlanList: React.FC<SessionPlansListProps> = ({ initSessionPlans }) => {
    const [sessionPlans, setSessionPlans] = useState<SessionPlan[]>(initSessionPlans);

    const handleDeleteSessionPlan = (id: number) => {
        setSessionPlans(prevSessionPlans => prevSessionPlans.filter(plan => plan.id !== id))
    }

    return (
        <div> 
            <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-9'>
                {sessionPlans.map(plan => (
                    <SessionPlan sessionPlan={plan} onDelete={handleDeleteSessionPlan}/>
                ))}
            </div>
        </div>
    )
}

export default SessionPlanList
