import React from 'react'
import { getSessionScheduleById } from '../../../../../../apis/activity_plan_apis'
import EditForm from './EditForm'
import { getSessionPlanById } from '../../../../../../apis/fitness_plan_apis'

const page = async ({params}: {params: {activityPlanId: number, sessionScheduleId: number}}) => {
    const sessionSchedule = await getSessionScheduleById(params.sessionScheduleId)
    const sessionPlan = await getSessionPlanById({ id: sessionSchedule.session_plan })
    return (
        <div className='max-w-screen min-h-screen flex justify-center items-center'>
            <EditForm sessionSchedule={sessionSchedule} sessionPlan={sessionPlan} />
        </div>
    )
}

export default page
