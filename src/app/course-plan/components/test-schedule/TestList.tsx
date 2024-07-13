'use client'

import React from 'react'
import { IClassSchedule } from '../../../../types/course_plan/ClassSchedule'
import { TestSchedule } from '../../../../types/course_plan/TestSchedule'
import Test from './Test'
import AddTest from './AddTest'

interface TestListProps {
    initTestSchedules: TestSchedule[]
}

const TestList: React.FC<TestListProps> = ({ initTestSchedules }) => {
    const [testSchedules, setTestSchedule] = React.useState<TestSchedule[]>(initTestSchedules)

    const handleDeleteTestSchedule = (id: number) => {
        setTestSchedule(prev => prev.filter(testSchedule => testSchedule.id !== id))
    }

    const handleAddClassSchedule = (newTestSchedule: TestSchedule) => {
        console.log('handleAddClassSchedule called with:', newTestSchedule.id);
        setTestSchedule(prev => {
            const newSchedules = [...prev, newTestSchedule];
            newSchedules.sort((a, b) => {
                if (a.test_date < b.test_date) {
                    return -1;
                }
                if (a.test_date > b.test_date) {
                    return 1;
                }
                if (a.test_start < b.test_start) {
                    return -1;
                }
                if (a.test_start > b.test_start) {
                    return 1;
                }
                return 0;
            });
            return newSchedules;
        });
    }

    return (
        <div>
            <div className='flex justify-center'>
                <AddTest onAdd={handleAddClassSchedule}></AddTest>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center justify-items-start py-10 gap-9'>
                {testSchedules.map(sched => (
                    <Test key={sched.id} initTestSchedule={sched} onDelete={handleDeleteTestSchedule} />
                ))}
            </div>
        </div>
    )
}

export default TestList
