import React from 'react'
import ClassList from './components/class-schedule/ClassList'
import { getAllClassSchedule } from '../../../apis/course_plan_apis'
import TabComponent from './components/TabComponent'


const CoursePlanPage = async () => {
  const classSchedules = await getAllClassSchedule()
  return (
    <div className='min-h-screen flex flex-col items-center justify-center -translate-y-20'>
      <TabComponent initClassSchedules={classSchedules} />
    </div>
  )
}

export default CoursePlanPage
