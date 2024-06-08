'use client';

import { Button, Card, Datepicker, TextInput } from 'flowbite-react';
import React, { FormEventHandler } from 'react'
import { RiEditBoxFill } from 'react-icons/ri';
import { TbTrashFilled } from 'react-icons/tb';
import Modal from '@/app/components/Modal';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { IoIosTime } from 'react-icons/io';
import { AssignmentDeadlineForm, IAssignmentDeadline } from '../../../../../types/course_plan/AssignmentDeadline';
import { deleteAssignmentDeadline, updateAssignmentDeadline } from '../../../../../apis/assignment_deadline_apis';


interface AssignmentProps {
    initAssignmentDeadline: IAssignmentDeadline
    onDelete: (id: number) => void
}

const AssignmentDeadline: React.FC<AssignmentProps> = ({ initAssignmentDeadline, onDelete }) => {
    const [assignmentDeadline, setAssignmentDeadline] = React.useState<IAssignmentDeadline>(initAssignmentDeadline);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [updateModalOpen, setUpdateModalOpen] = React.useState<boolean>(false);
    const [updateInput, setUpdateInput] = React.useState<AssignmentDeadlineForm>({
        assignment_name: assignmentDeadline.assignment_name,
        assignment_due_date: assignmentDeadline.assignment_due_date,
        assignment_due_time: assignmentDeadline.assignment_due_time,
        course_plan: assignmentDeadline.course_plan
    });

    const handleDelete = async () => {
        await deleteAssignmentDeadline({ id: assignmentDeadline.id });
        onDelete(assignmentDeadline.id);
        setDeleteModalOpen(false);
    }

    const handleUpdate: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const newAssignmentDeadline: AssignmentDeadlineForm = {
            assignment_name: updateInput.assignment_name,
            assignment_due_date: updateInput.assignment_due_date,
            assignment_due_time: updateInput.assignment_due_time,
            course_plan: updateInput.course_plan
        };

        try {
            const updatedAssignmentDeadline = await updateAssignmentDeadline({ id: assignmentDeadline.id, assignmentDeadline: newAssignmentDeadline  });
            console.log('Assignment updated successfully with ID:', updatedAssignmentDeadline.id);
            setAssignmentDeadline(updatedAssignmentDeadline);
        } catch (err) {
            console.error('Error updating assignment:', err);
        }
        setUpdateModalOpen(false);
    }

    const handleInputChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
        setUpdateInput({ ...updateInput, [event.target.name]: event.target.value });
    }

    const handleUpdateModal = async () => { setUpdateModalOpen(true) }
    const handleDeleteModal = async () => { setDeleteModalOpen(true) }
    const deleteAction = <Button outline onClick={handleDelete} gradientMonochrome="failure">Delete</Button>
    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }

    return (
        <div>
            <Card className="w-56 dark:bg-card-bg dark:border-gray-700 transition hover:scale-110 hover:-translate-y-3">
                <h5 className="font-mono text-2xl font-bold tracking-tight text-gray-900 dark:text-white -mb-3 overflow-scroll h-16">
                    {assignmentDeadline.assignment_name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 -mb-4">
                    {assignmentDeadline.assignment_due_date}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {formatTime(assignmentDeadline.assignment_due_time)}
                </p>
                <div className='flex flex-row justify-end'>
                    <Button className='mr-2' outline size='sm' onClick={handleUpdateModal} gradientDuoTone="purpleToBlue"><RiEditBoxFill size={17} /></Button>
                    <Button className='' outline size='sm' onClick={handleDeleteModal} gradientMonochrome="failure"><TbTrashFilled size={17} /></Button>
                </div>
            </Card>

            <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} actions={deleteAction}>
                <h3 className='text-xl font-mono font-medium'>Delete {assignmentDeadline.assignment_name} #{assignmentDeadline.id}</h3>
            </Modal>

            <Modal modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen}>
                <div className='flex flex-col mb-5 font-sans'>
                    <h3 className='text-xl font-mono font-semibold inline-block'> Update {assignmentDeadline.assignment_name} #{assignmentDeadline.id} </h3>
                </div>
                <form onSubmit={handleUpdate}>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="assignment_name" className='mb-3 text-gray-400 text-sm'>Name</label>
                        <TextInput name="assignment_name" value={updateInput.assignment_name} onChange={handleInputChange} icon={MdDriveFileRenameOutline} type="text" placeholder="Assignment name" required shadow />
                    </div>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="assignment_due_date" className='mb-3 text-gray-400 text-sm'>Due Date</label>
                        <Datepicker
                            name='assignment_due_date'
                            value={updateInput.assignment_due_date}
                            onChange={handleInputChange}
                            onSelectedDateChanged={(date) => {
                                const formattedDate = date.getFullYear() + '-' +
                                    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                                    ('0' + date.getDate()).slice(-2);
                                setUpdateInput({ ...updateInput, assignment_due_date: formattedDate });
                            }}
                            required
                        >
                        </Datepicker>
                    </div>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="assignment_due_time" className='mb-2 text-gray-400 text-sm'>Due Time</label>
                        <TextInput name="assignment_due_time" value={updateInput.assignment_due_time} onChange={handleInputChange} type="time" placeholder="Due time" icon={IoIosTime} required shadow />
                    </div>
                    <Button type='submit' outline gradientDuoTone={'purpleToBlue'} className='w-full transition'>Update Assignment</Button>
                </form>
            </Modal>

        </div>
    )
}

export default AssignmentDeadline
