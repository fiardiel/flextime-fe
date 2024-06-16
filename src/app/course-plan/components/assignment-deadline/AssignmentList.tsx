'use client'

import React from 'react'
import { IAssignmentDeadline } from '../../../../../types/course_plan/AssignmentDeadline'
import AddAssignment from './AddAssignment'
import AssignmentDeadline from './Assignment'

interface AssignmentListProps {
    initAssignmentDeadlines: IAssignmentDeadline[]
}

const AssignmentList: React.FC<AssignmentListProps> = ({initAssignmentDeadlines}) => {
    const [assignmentDeadlines, setAssignmentDeadlines] = React.useState<IAssignmentDeadline[]>(initAssignmentDeadlines)
    
    const handleDeleteAssignmentDeadline = (id: number) => {
        setAssignmentDeadlines(prev => prev.filter(assignmentDeadline => assignmentDeadline.id  !== id))
    }

    const handleAddAssignmentDeadline = (newAssignmentDeadline: IAssignmentDeadline) => {
        console.log('handleAddAssignmentDeadline called with:', newAssignmentDeadline.id);
        setAssignmentDeadlines(prev => {
            const newSchedules = [...prev, newAssignmentDeadline];
            newSchedules.sort((a, b) => {
                if (a.assignment_due_date < b.assignment_due_date) {
                    return -1;
                }
                if (a.assignment_due_date > b.assignment_due_date) {
                    return 1;
                }
                if (a.assignment_due_time < b.assignment_due_time) {
                    return -1;
                }
                if (a.assignment_due_time > b.assignment_due_time) {
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
                <AddAssignment onAdd={handleAddAssignmentDeadline}></AddAssignment>
            </div>
            <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-9'>   
                {assignmentDeadlines.map(sched => (
                    <AssignmentDeadline key={sched.id} initAssignmentDeadline={sched} onDelete={handleDeleteAssignmentDeadline}/>
                ))}
            </div>
        </div>
    )
}

export default AssignmentList
