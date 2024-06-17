'use client'

import React from 'react'
import { IClassSchedule } from '../../../../../types/course_plan/ClassSchedule'
import Class from './Class'
import AddClass from './AddClass'

interface ClassListProps {
    initClassSchedules: IClassSchedule[]
}

const ClassList: React.FC<ClassListProps> = ({ initClassSchedules }) => {
    const [classSchedules, setClassSchedules] = React.useState<IClassSchedule[]>(initClassSchedules)

    const handleDeleteClassSchedule = (id: number) => {
        setClassSchedules(prev => prev.filter(classSchedule => classSchedule.id !== id))
    }

    const handleAddClassSchedule = (newClassSchedule: IClassSchedule) => {
        console.log('handleAddClassSchedule called with:', newClassSchedule.id);
        setClassSchedules(prev => {
            const newSchedules = [...prev, newClassSchedule];
            newSchedules.sort((a, b) => {
                if (a.class_day < b.class_day) {
                    return -1;
                }
                if (a.class_day > b.class_day) {
                    return 1;
                }
                if (a.start_time < b.start_time) {
                    return -1;
                }
                if (a.start_time > b.start_time) {
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
                <AddClass onAdd={handleAddClassSchedule}></AddClass>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center justify-items-start py-10 gap-9'>
                {classSchedules.map(sched => (
                    <Class key={sched.id} initClassSchedule={sched} onDelete={handleDeleteClassSchedule} />
                ))}
            </div>
        </div>
    )
}

export default ClassList
