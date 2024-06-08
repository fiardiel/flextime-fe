'use client'

import { Button, Datepicker, TextInput } from 'flowbite-react'
import React, { FormEventHandler } from 'react'
import Modal from '@/app/components/Modal'
import { IoIosTime } from 'react-icons/io'
import { IoCalendarClearSharp } from 'react-icons/io5'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { TestSchedule, TestScheduleForm } from '../../../../../types/course_plan/TestSchedule'
import { addTestSchedule } from '../../../../../apis/test_schedule_apis'
import { FaPlus } from 'react-icons/fa'
import { AssignmentDeadlineForm, IAssignmentDeadline } from '../../../../../types/course_plan/AssignmentDeadline'
import { addAssignmentDeadline } from '../../../../../apis/assignment_deadline_apis'

interface AddAssignmentProps {
    onAdd: (assignmentDeadline: IAssignmentDeadline) => void
}

const AddAssignment: React.FC<AddAssignmentProps> = ({ onAdd }) => {
    const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);
    const [addInput, setAddInput] = React.useState<AssignmentDeadlineForm>({
        assignment_name: '',
        assignment_due_date: '',
        course_plan: 1,
        assignment_due_time: ''
    });

    const handleOpenAddModal = () => {
        setOpenAddModal(true);
    }

    const handleInputChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
        setAddInput({ ...addInput, [event.target.name]: event.target.value });
    }

    const handleAdd: FormEventHandler = async (e) => {
        e.preventDefault();

        const newAssignmentDeadline: AssignmentDeadlineForm = {
            assignment_name: addInput.assignment_name,
            assignment_due_date: addInput.assignment_due_date,
            assignment_due_time: addInput.assignment_due_time,
            course_plan: addInput.course_plan
        };

        try {
            const createdAssignmentDeadline = await addAssignmentDeadline({ assignmentDeadline: newAssignmentDeadline });
            onAdd(createdAssignmentDeadline);
            console.log('Assignment Deadline added successfully with ID:', createdAssignmentDeadline.id);
        } catch (err) {
            console.error('Error creating assignment deadline:', err);
        }

        setOpenAddModal(false);
    }

    return (
        <div>
            <Button outline gradientDuoTone={'cyanToBlue'} onClick={handleOpenAddModal}>
                Add Assignment <FaPlus size={10} className='self-center ml-2' />
            </Button>
            <Modal modalOpen={openAddModal} setModalOpen={setOpenAddModal}>
                <div className='flex flex-col mb-5 font-sans'>
                    <h3 className='text-xl font-mono font-semibold inline-block'> Create Assignment Deadline </h3>
                </div>
                <form onSubmit={handleAdd}>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="assignment_name" className='mb-3 text-gray-400 text-sm'>Name</label>
                        <TextInput name="assignment_name" value={addInput.assignment_name} onChange={handleInputChange} icon={MdDriveFileRenameOutline} type="text" placeholder="Assignment name" required shadow />
                    </div>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="assignment_due_date" className='mb-3 text-gray-400 text-sm'>Due date</label>
                        <Datepicker
                            name='assignment_due_date'
                            value={addInput.assignment_due_date}
                            onChange={handleInputChange}
                            placeholder='Due date'
                            onSelectedDateChanged={(date) => {
                                const formattedDate = date.getFullYear() + '-' +
                                    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                                    ('0' + date.getDate()).slice(-2);
                                setAddInput({ ...addInput, assignment_due_date: formattedDate });
                            }}
                            required
                        >
                        </Datepicker>
                    </div>
                    <div className='mb-8 font-sans'>
                        <label htmlFor="assignment_due_time" className='mb-3 text-gray-400 text-sm'>Time</label>
                        <TextInput name="assignment_due_time" value={addInput.assignment_due_time} onChange={handleInputChange} icon={IoIosTime} type="time" placeholder="Due time" required shadow />
                    </div>
                    <Button type='submit' outline gradientDuoTone={'purpleToBlue'} className='w-full transition'>Add Assignment</Button>
                </form>
            </Modal>
        </div>
    )
}

export default AddAssignment
