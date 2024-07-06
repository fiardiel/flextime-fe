'use client';

import { useState } from 'react';
import SessionPlan from './SessionPlan';
import AddSession from './AddSession';
import { ISessionPlan } from '../../../../../../types/fitness_plan/SessionPlan';

interface SessionPlansListProps {
    initSessionPlans: ISessionPlan[];
}

const SessionPlanList: React.FC<SessionPlansListProps> = ({ initSessionPlans }) => {
    const [sessionPlans, setSessionPlans] = useState<ISessionPlan[]>(initSessionPlans);

    const handleDeleteSessionPlan = (id: number) => {
        setSessionPlans(prevSessionPlans => prevSessionPlans.filter(plan => plan.id !== id))
    }

    const handleAddSessionPlan = (sessionPlan: ISessionPlan) => { 
        console.log('handleAddSessionPlan called with:', sessionPlan);
        setSessionPlans(prevSessionPlans => [...prevSessionPlans, sessionPlan]);
    }

    return (
        <div> 
            <AddSession onAdd={handleAddSessionPlan}></AddSession>
            <div className='flex flex-wrap pt-10 gap-9'>
                {sessionPlans.map(plan => (
                    <SessionPlan key={plan.id} sessionPlan={plan} onDelete={handleDeleteSessionPlan}/>
                ))}
            </div>
        </div>
    )
}

export default SessionPlanList
