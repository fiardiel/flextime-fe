'use client';

import { useState } from 'react';
import SessionPlan from './SessionPlan';
import { ISessionPlan } from '../../../../../types/fitness_plan/SessionPlan';
import AddSession from './AddSession';

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
            <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-9'>
                <AddSession onAdd={handleAddSessionPlan}></AddSession>
                {sessionPlans.map(plan => (
                    <SessionPlan key={plan.id} sessionPlan={plan} onDelete={handleDeleteSessionPlan}/>
                ))}
            </div>
        </div>
    )
}

export default SessionPlanList
