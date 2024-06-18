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
            <h3 className='text-4xl font-bold font-custom mb-2 col-span-3 text-start px-10 mt-4'>your session plans:</h3>
            <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-9'>
                {sessionPlans.map(plan => (
                    <SessionPlan key={plan.id} sessionPlan={plan} onDelete={handleDeleteSessionPlan}/>
                ))}
            </div>
        </div>
    )
}

export default SessionPlanList
