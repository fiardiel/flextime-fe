import React from 'react'
import { getAllClassSchedule } from '../../../apis/class_schedule_apis'
import TabComponent from './components/TabComponent'
import { getAllTestSchedule } from '../../../apis/test_schedule_apis'
import { getAllAssignmentDeadline } from '../../../apis/assignment_deadline_apis'


const CoursePlanPage = async () => {
  const classSchedules = await getAllClassSchedule()
  const testSchedules = await getAllTestSchedule()
  const assignmentDeadlines = await getAllAssignmentDeadline()
  return (
    <div className='flex flex-col items-center justify-center translate-y-10'>
      <TabComponent initClassSchedules={classSchedules} initTestSchedules={testSchedules} initAssignments={assignmentDeadlines} />
    </div>
  )
}

export default CoursePlanPage
