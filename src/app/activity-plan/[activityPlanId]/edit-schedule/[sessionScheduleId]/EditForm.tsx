'use client'

import React, { useState } from 'react'
import { SessionSchedule } from '../../../../../../types/activity_plan/SessionSchedule'
import { ISessionPlan } from '../../../../../../types/fitness_plan/SessionPlan'
import { updateSessionSchedule } from '../../../../../../apis/activity_plan_apis'
import { parseTime, Time } from '@internationalized/date'
import { Button, Select, SelectItem, TimeInput } from '@nextui-org/react'
import { IoIosTime } from 'react-icons/io'
import { BsCalendar2Fill } from 'react-icons/bs'
import { useParams, useRouter } from 'next/navigation'

interface EditFormProps {
	sessionSchedule: SessionSchedule
	sessionPlan: ISessionPlan
}

const DAYS_OF_WEEK = [
	{ value: 'MON', label: 'Monday' },
	{ value: 'TUE', label: 'Tuesday' },
	{ value: 'WED', label: 'Wednesday' },
	{ value: 'THU', label: 'Thursday' },
	{ value: 'FRI', label: 'Friday' },
	{ value: 'SAT', label: 'Saturday' },
	{ value: 'SUN', label: 'Sunday' },
];

const EditForm: React.FC<EditFormProps> = ({ sessionSchedule, sessionPlan }) => {
	const router = useRouter()
	const { activityPlanId } = useParams()
	const [startTime, setStartTime] = useState<string>(sessionSchedule.start_time)
	const [endTime, setEndTime] = useState<string>(sessionSchedule.end_time)
	const [day, setDay] = useState<string>(sessionSchedule.day)
	const [error, setError] = useState<Error | null>(null)

	console.log('start time, end time, day', startTime, endTime, day)

	const handleStartTimeChange = (value: Time) => {
		setStartTime(value.toString());
	}

	const handleEndTimeChange = (value: Time) => {
		setEndTime(value.toString())
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const updatedSessionSchedule = await updateSessionSchedule(sessionSchedule.id, {
				session_plan: sessionPlan.id,
				start_time: startTime,
				end_time: endTime,
				activity_plan: sessionSchedule.activity_plan,
				day: sessionSchedule.day
			})
			console.log('Session Schedule updated sucessfully. Newly updated Schedule: ', updatedSessionSchedule)
			router.push(`/activity-plan/${activityPlanId}/view-sessions`)
		} catch (err) {
			setError(err as Error)
		}
	}

	return (
		<div className='flex flex-col items-center w-full -translate-y-10'>
			<h3 className='text-3xl font-bold font-sans mb-5'>Update {sessionPlan?.training_type} #{sessionPlan?.id} Schedule </h3>
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
						defaultSelectedKeys={[day]}
						value={day}
						onChange={(e) => setDay(e.target.value)}
					>
						{DAYS_OF_WEEK.map(weekDays => (
							<SelectItem key={weekDays.value} value={weekDays.value}>{weekDays.label}</SelectItem>
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
	)
}

export default EditForm
