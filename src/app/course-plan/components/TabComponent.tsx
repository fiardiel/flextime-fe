'use client'

import { MdAssignment } from "react-icons/md";
import ClassList, { } from "./class-schedule/ClassList";
import React from 'react'
import { IClassSchedule } from "../../../../types/course_plan/ClassSchedule";
import { PiExamFill } from "react-icons/pi";
import TestList from "./test-schedule/TestList";
import { TestSchedule } from "../../../../types/course_plan/TestSchedule";
import AssignmentList from "./assignment-deadline/AssignmentList";
import { IAssignmentDeadline } from "../../../../types/course_plan/AssignmentDeadline";

import { FaBookOpen } from "react-icons/fa";
import { Tab, Tabs } from "@nextui-org/react";

interface TabComponentProps {
  initClassSchedules: IClassSchedule[]
  initTestSchedules: TestSchedule[]
  initAssignments: IAssignmentDeadline[]
}

const TabComponent: React.FC<TabComponentProps> = ({ initClassSchedules, initTestSchedules, initAssignments }) => {
  return (
    <div className="font-sans">
      <div className="flex w-full flex-col items-center">
        <Tabs aria-label="Options" color="primary" variant="bordered">
          <Tab
            key="class"
            title={
              <div className="flex items-center space-x-2">
                <FaBookOpen />
                <span>Class</span>
              </div>
            }
          >
            <div>
              <ClassList initClassSchedules={initClassSchedules} />
            </div>

          </Tab>
          <Tab
            key="assignment"
            title={
              <div className="flex items-center space-x-2">
                <MdAssignment />
                <span>Assignment</span>
              </div>
            }
          />
          <Tab
            key="test"
            title={
              <div className="flex items-center space-x-2">
                <PiExamFill />
                <span>Test</span>
              </div>
            }
          />
        </Tabs>
      </div>
    </div>

  )
}

export default TabComponent
