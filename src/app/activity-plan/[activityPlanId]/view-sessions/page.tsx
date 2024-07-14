import { Button, Card, CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react'
import React from 'react'
import { PiBarbellFill } from 'react-icons/pi'
import { ISessionPlan } from '../../../../types/fitness_plan/SessionPlan'
import { getSessionPlanById, getTotalDuration, getTrainingCountBySessionPlan } from '../../../../apis/fitness_plan_apis'
import { getActivityPlanById, getAvailableSessionPlans, getSessionSchedulesByActivityPlan } from '../../../../apis/activity_plan_apis'
import { SessionSchedule } from '../../../../types/activity_plan/SessionSchedule'
import { MdAdd, MdModeEdit } from 'react-icons/md'
import DeleteSchedule from './DeleteSchedule'
import BackButton from '@/app/components/BackButton'
import { cookies } from 'next/headers'

const page = async ({ params }: { params: { activityPlanId: number } }) => {
  const token = cookies().get('userToken')?.value

  const getSessionPlan = async (id: number) => {
    const sessionPlan = await getSessionPlanById(id, token)
    console.log('sessionPlan:', sessionPlan)
    return sessionPlan
  }

  const getTrainingCount = async (sessionPlanId: number) => {
    const count = await getTrainingCountBySessionPlan(sessionPlanId, token)
    return count
  }

  const getSessionDuration = async (sessionPlanId: number) => {
    const totalDuration = await getTotalDuration({ sessionPlanId: sessionPlanId, token: token })
    const minutes = Math.floor(totalDuration.total_duration / 60);
    const seconds = totalDuration.total_duration % 60;
    const formattedDuration = `${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
    return formattedDuration
  }

  const availableSessionPlans = await getAvailableSessionPlans(params.activityPlanId, token)
  const sessionSchedules: SessionSchedule[] = await getSessionSchedulesByActivityPlan(params.activityPlanId, token)
  return (
    <div className='mx-16 my-10 flex flex-col'>
      <div className='z-48 mb-6 -ml-2'>
        <BackButton />
      </div>
      <h1 className='text-2xl font-sans font-semibold mb-5'>Scheduled Sessions</h1>
      <div className='flex flex-row gap-8 flex-wrap mb-16'>
        {sessionSchedules.map(async sched => {
          const sessionPlan = getSessionPlan(sched.session_plan)
          return (
            <Card key={sched.id} className='p-5 w-72 h-52 hover:-translate-y-2 hover:scale-110 transition'>
              <CardHeader>
                <h1 className='font-bold font-custom text-3xl mr-5'> {(await sessionPlan).training_type} </h1>
              </CardHeader>
              <CardBody className='py-0'>
                <p>
                  <span className='text-blue-800 text-xs px-2 py-1 bg-blue-300 text-center rounded-lg self-start font-semibold mb-2 mr-2'>{sched.day}</span>
                  <span className='text-gray-400 text-sm'> {sched.start_time.substring(0, 5)} - {sched.end_time.substring(0, 5)} </span>
                </p>
              </CardBody>
              <CardFooter className='justify-end gap-2'>
                <Link href={`/session-training/${sched.session_plan}`}>
                  <Button className='bg-transparent fill-white' variant='light' color='primary' isIconOnly> <PiBarbellFill size={20} color='white' /> </Button>
                </Link>
                <Link href={`/activity-plan/${params.activityPlanId}/edit-schedule/${sched.id}`}>
                  <Button className='bg-transparent fill-white' variant='light' color='primary' isIconOnly> <MdModeEdit size={20} color='white' /> </Button>
                </Link>
                <DeleteSchedule sessionScheduleId={sched.id}></DeleteSchedule>
              </CardFooter>
            </Card>
          )
        })}
      </div>
      <h1 className='text-2xl font-sans font-semibold mb-5'>Available Session Plans</h1>
      <div className='flex flex-row gap-8 flex-wrap'>
        {availableSessionPlans.map(plan => (
          <Card key={plan.id} className='p-5 w-72 h-52 hover:-translate-y-2 hover:scale-110 transition'>
            <CardHeader>
              <h1 className='font-bold font-custom text-3xl mr-5'>{plan.training_type}</h1>
            </CardHeader>
            <CardBody className='py-0'>
              <p className='text-gray-400 text-sm mb-2'> {getTrainingCount(plan.id)} training(s) added </p>
              <p className='text-blue-800 text-xs px-2 py-1 bg-blue-300 text-center rounded-lg self-start font-semibold mb-4'> {getSessionDuration(plan.id)} </p>
            </CardBody>
            <CardFooter className='justify-end'>
              <Link href={`/session-training/${plan.id}`} className='mr-2'>
                <Button className='bg-transparent' color='primary' isIconOnly variant='light'> <PiBarbellFill size={20} color='white' /> </Button>
              </Link>
              <Link href={`/activity-plan/${params.activityPlanId}/add-schedule/${plan.id}`}>
                <Button radius='lg' color='primary' variant='flat' isIconOnly> <MdAdd size={20} /> </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default page
