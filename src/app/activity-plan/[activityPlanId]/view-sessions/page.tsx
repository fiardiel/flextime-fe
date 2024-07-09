import { Button, Card, CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react'
import React from 'react'
import { PiBarbellFill } from 'react-icons/pi'
import { ISessionPlan } from '../../../../../types/fitness_plan/SessionPlan'
import { getSessionPlanById, getTotalDuration, getTrainingCountBySessionPlan } from '../../../../../apis/fitness_plan_apis'
import { getActivityPlanById, getAvailableSessionPlans, getSessionSchedulesByActivityPlan } from '../../../../../apis/activity_plan_apis'
import { redirect } from 'next/navigation'
import { SessionSchedule } from '../../../../../types/activity_plan/SessionSchedule'
import { MdAdd, MdModeEdit } from 'react-icons/md'

const page = async ({ params }: { params: { activityPlanId: number } }) => {
  console.log("Activity Plan Id: ", params.activityPlanId)

  const activityPlan = await getActivityPlanById(params.activityPlanId);

  const getTrainingCount = async (sessionPlanId: number) => {
    const trainingCount = await getTrainingCountBySessionPlan({ sessionPlanId: sessionPlanId });
    return trainingCount;
  }

  const getSessionDuration = async (sessionPlanId: number) => {
    const totalDuration = await getTotalDuration({ sessionPlanId: sessionPlanId });
    const minutes = Math.floor(totalDuration.total_duration / 60);
    const seconds = totalDuration.total_duration % 60;
    const formattedDuration = `${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
    return formattedDuration;
  }

  const getSessionPlan = async (sessionPlanId: number) => {
    const sessionPlan = await getSessionPlanById({ id: sessionPlanId });
    return sessionPlan
  }

  const t2 = await getSessionPlan(3)

  console.log("Session Plan: ", t2)

  try {
    const sessionPlans: ISessionPlan[] = await getAvailableSessionPlans(activityPlan.id);
    const sessionSchedules: SessionSchedule[] = await getSessionSchedulesByActivityPlan(activityPlan.id);
    const pickedSessionPlans: ISessionPlan[] = [];

    for (let i = 0; i < sessionSchedules.length; i++) {
      const sessionPlan = await getSessionPlan(sessionSchedules[i].session_plan);
      pickedSessionPlans.push(sessionPlan);
    }

    console.log(pickedSessionPlans)

    return (
      <div className='mx-16 my-10 flex flex-col'>
        <h1 className='text-2xl font-sans font-semibold mb-5'>Scheduled Sessions</h1>
        <div className='flex flex-row gap-8 flex-wrap mb-16'>
          {sessionSchedules.map(async sched => {
            const sessionPlan = getSessionPlan(sched.session_plan)
            return (
            <Card key={sched.id} className='p-5 w-72 h-52 hover:-translate-y-2 hover:scale-110 transition'>
              <CardHeader>
                <h1 className='font-bold font-custom text-3xl mr-5'> { (await sessionPlan).training_type } </h1>
              </CardHeader>
              <CardBody className='py-0'>
                <p>
                  <span className='text-blue-800 text-xs px-2 py-1 bg-blue-300 text-center rounded-lg self-start font-semibold mb-2 mr-2'>{sched.day}</span>
                  <span className='text-gray-400 text-sm'> {sched.start_time.substring(0, 5)} - {sched.end_time.substring(0, 5)} </span>
                </p>
              </CardBody>
              <CardFooter className='justify-end gap-2'>
                <Link href={``}>
                  <Button className='border-2 border-gray-500' color='primary' isIconOnly> <PiBarbellFill size={20} /> </Button>
                </Link>
                <Link href={`/activity-plan/${activityPlan.id}/edit-schedule/${sched.id}`}>
                  <Button className='border-2 border-gray-500' color='primary' isIconOnly> <MdModeEdit size={20} /> </Button>
                </Link>
              </CardFooter>
            </Card>
          )})}
        </div>
        <h1 className='text-2xl font-sans font-semibold mb-5'>Available Session Plans</h1>
        <div className='flex flex-row gap-8 flex-wrap'>
          {sessionPlans.map(plan => (
            <Card key={plan.id} className='p-5 w-72 h-52 hover:-translate-y-2 hover:scale-110 transition'>
              <CardHeader>
                <h1 className='font-bold font-custom text-3xl mr-5'>{plan.training_type}</h1>
              </CardHeader>
              <CardBody className='py-0'>
                <p className='text-gray-400 text-sm mb-2'> {getTrainingCount(plan.id)} training(s) added </p>
                <p className='text-blue-800 text-xs px-2 py-1 bg-blue-300 text-center rounded-lg self-start font-semibold mb-4'> {getSessionDuration(plan.id) || 0} </p>
              </CardBody>
              <CardFooter className='justify-end'>
                <Link href={`/session-training/${plan.id}`} className='mr-2'>
                  <Button className='border-2 border-gray-500' color='primary' isIconOnly> <PiBarbellFill size={20} /> </Button>
                </Link>
                <Link href={`/activity-plan/${activityPlan.id}/add-schedule/${plan.id}`} className='mr-2'>
                  <Button className='border-2 border-gray-500' color='primary' isIconOnly> <MdAdd size={20} /> </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching session plans:', error);
    redirect('/error');
  }
}

export default page
