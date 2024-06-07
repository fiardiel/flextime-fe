'use client'

import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdAssignment, MdDashboard } from "react-icons/md";
import ClassList, {  } from "./class-schedule/ClassList";
import React from 'react'
import { IClassSchedule } from "../../../../types/course_plan/ClassSchedule";
import { FaChalkboard } from "react-icons/fa";
import { PiChalkboardSimple, PiChalkboardSimpleFill, PiExamFill } from "react-icons/pi";

interface TabComponentProps {
  initClassSchedules: IClassSchedule[]
}

const TabComponent: React.FC<TabComponentProps> = ({ initClassSchedules }) => {
  return (
    <Tabs aria-label="Tabs with underline" style="underline">
      <Tabs.Item active title="Class" icon={PiChalkboardSimpleFill}>
        <ClassList initClassSchedules={initClassSchedules} />
      </Tabs.Item>
      <Tabs.Item active title="Assignment" icon={MdAssignment}>
        <ClassList initClassSchedules={initClassSchedules} />
      </Tabs.Item>
      <Tabs.Item active title="Test" icon={PiExamFill}>
        <ClassList initClassSchedules={initClassSchedules} />
      </Tabs.Item>
    </Tabs>
  )
}

export default TabComponent
