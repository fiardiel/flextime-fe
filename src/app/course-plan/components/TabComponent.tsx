'use client'

import { Tabs } from "flowbite-react";
import { MdAssignment } from "react-icons/md";
import ClassList, { } from "./class-schedule/ClassList";
import React from 'react'
import { IClassSchedule } from "../../../../types/course_plan/ClassSchedule";
import { PiChalkboardSimpleFill, PiExamFill } from "react-icons/pi";
import TestList from "./test-schedule/TestList";
import { TestSchedule } from "../../../../types/course_plan/TestSchedule";
import AssignmentList from "./assignment-deadline/AssignmentList";
import { IAssignmentDeadline } from "../../../../types/course_plan/AssignmentDeadline";

interface TabComponentProps {
  initClassSchedules: IClassSchedule[]
  initTestSchedules: TestSchedule[]
  initAssignments: IAssignmentDeadline[]
}

const TabComponent: React.FC<TabComponentProps> = ({ initClassSchedules, initTestSchedules, initAssignments }) => {
  return (
    <div className="font-sans">
      <Tabs className="focus:outline-none focus:ring-0 focus:ring-transparent" aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="Class" className="focus:outline-none focus:ring-0 focus:ring-transparent" icon={PiChalkboardSimpleFill}>
          <ClassList initClassSchedules={initClassSchedules} />
        </Tabs.Item>
        <Tabs.Item active title="Assignment" className="focus:outline-none focus:ring-0 focus:ring-transparent" icon={MdAssignment}>
          <AssignmentList initAssignmentDeadlines={initAssignments}/>
        </Tabs.Item>
        <Tabs.Item active title="Test" className="focus:outline-none focus:ring-0 focus:ring-transparent" icon={PiExamFill}>
          <TestList initTestSchedules={initTestSchedules} />
        </Tabs.Item>
      </Tabs>
    </div>

  )
}

export default TabComponent
