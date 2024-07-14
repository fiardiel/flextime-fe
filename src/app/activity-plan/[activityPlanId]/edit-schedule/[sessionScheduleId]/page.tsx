import React from 'react'
import { getSessionScheduleById } from '../../../../../apis/activity_plan_apis'
import EditForm from './EditForm'
import { getSessionPlanById } from '../../../../../apis/fitness_plan_apis'
import BackButton from '@/app/components/BackButton'
import { cookies } from 'next/headers'

const page = async ({ params }: { params: { activityPlanId: number, sessionScheduleId: number } }) => {
    const token = cookies().get('userToken')?.value
    const sessionSchedule = await getSessionScheduleById(params.sessionScheduleId, token)
    const sessionPlan = await getSessionPlanById(sessionSchedule.session_plan, token)
    return (
        <div className='relative'>
            <div className='z-48 mb-6 mx-14 mt-10 absolute top-0 left-0'>
                <BackButton />
            </div>
            <div className='max-w-screen min-h-screen flex justify-center items-center'>
                <EditForm sessionSchedule={sessionSchedule} sessionPlan={sessionPlan} />
            </div>
        </div>

    )
}

export default page
