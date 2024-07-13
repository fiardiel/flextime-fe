'use client'

import { Button, TimeInput } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/select'
import React, { FormEventHandler, useEffect, useState } from 'react'
import { BsCalendar2Fill } from 'react-icons/bs'
import { IoIosTime } from 'react-icons/io'
import { ISessionPlan } from '../../../../../types/fitness_plan/SessionPlan'
import { useRouter, useParams } from 'next/navigation'
import { getSessionPlanById } from '../../../../../apis/fitness_plan_apis'
import { parseTime, Time } from '@internationalized/date'
import { addSessionSchedule } from '../../../../../apis/activity_plan_apis'
import { SessionScheduleForm } from '../../../../../types/activity_plan/SessionSchedule'
import BackButton from '@/app/components/BackButton'

const DAYS_OF_WEEK = [
    { value: 'MON', label: 'Monday' },
    { value: 'TUE', label: 'Tuesday' },
    { value: 'WED', label: 'Wednesday' },
    { value: 'THU', label: 'Thursday' },
    { value: 'FRI', label: 'Friday' },
    { value: 'SAT', label: 'Saturday' },
    { value: 'SUN', label: 'Sunday' },
];


const page = () => {
    const router = useRouter()
    const [error, setError] = useState<Error | null>(null)
    const { sessionPlanId, activityPlanId } = useParams()
    const [sessionPlan, setSessionPlan] = React.useState<ISessionPlan | null>(null);
    const [startTime, setStartTime] = React.useState<string>('10:00');
    const [endTime, setEndTime] = React.useState<string>('11:00');
    const [day, setDay] = React.useState<string>('MON');

    const handleStartTimeChange = (value: Time) => {
        setStartTime(value.toString());
    }

    const handleEndTimeChange = (value: Time) => {
        setEndTime(value.toString());
    }

    useEffect(() => {
        const fetchSessionPlan = async () => {
            const fetchedSessionPlan = await getSessionPlanById({ id: Number(sessionPlanId) });
            setSessionPlan(fetchedSessionPlan);
        }

        fetchSessionPlan();
    }, []);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const form: SessionScheduleForm = {
            session_plan: sessionPlan?.id!,
            start_time: startTime,
            end_time: endTime,
            activity_plan: Number(activityPlanId),
            day: day
        }

        try {
            const sessionSchedule = await addSessionSchedule(form)
            console.log("Session Schedule: ", sessionSchedule, " added successfully")
            router.push(`/activity-plan/${activityPlanId}/view-sessions`)
        } catch (error) {
            setError(error as Error)
        }
    }

    return (
        <div className='relative'>
            <div className='z-48 mb-6 mx-14 mt-10 absolute top-0 left-0'>
                <BackButton />
            </div>
            <div className='max-w-screen min-h-screen flex justify-center items-center'>
                <div className='flex flex-col items-center w-full -translate-y-10'>
                    <h3 className='text-3xl font-bold font-sans mb-5'>Schedule {sessionPlan?.training_type} #{sessionPlan?.id} </h3>
                    <form className='w-3/5' onSubmit={handleSubmit}>
                        <div className='gap-5 flex flex-wrap'>
                            <TimeInput
                                name='start_time'
                                autoFocus
                                label="Start"
                                variant='bordered'
                                startContent={<IoIosTime />}
                                value={parseTime(startTime)}
                                onChange={handleStartTimeChange}

                            />
                            <TimeInput
                                name='end_time'
                                autoFocus
                                label="End"
                                variant='bordered'
                                startContent={<IoIosTime />}
                                value={parseTime(endTime)}
                                onChange={handleEndTimeChange}
                            />
                            <Select
                                name='class_day'
                                label="Day"
                                variant='bordered'
                                startContent={<BsCalendar2Fill color='gray' />}
                                defaultSelectedKeys={["MON"]}
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                            >
                                {DAYS_OF_WEEK.map(day => (
                                    <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
                                ))}
                            </Select>
                            {error ? (
                                <p className='text-danger'> {error.message} </p>
                            ) :
                                null
                            }
                        </div>
                        <Button color="primary" variant='flat' type='submit' className='mt-10 w-full'>Submit</Button>
                    </form>
                </div>
            </div>

        </div>

    )
}

export default page
