import React from 'react'
import ClassList from './components/class-schedule/ClassList'
import { getAllClassSchedule } from '../../../apis/class_schedule_apis'
import TabComponent from './components/TabComponent'
import { getAllTestSchedule } from '../../../apis/test_schedule_apis'


const CoursePlanPage = async () => {
  const classSchedules = await getAllClassSchedule()
  const testSchedules = await getAllTestSchedule()
  return (
    <div className='min-h-screen flex flex-col items-center justify-center -translate-y-20'>
      <TabComponent initClassSchedules={classSchedules} initTestSchedules={testSchedules} />
    </div>
  )
}

export default CoursePlanPage
