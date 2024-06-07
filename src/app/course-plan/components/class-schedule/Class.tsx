'use client';

import { Button, Card, Select, TextInput } from 'flowbite-react';
import React, { FormEventHandler } from 'react'
import { ClassScheduleForm, IClassSchedule } from '../../../../../types/course_plan/ClassSchedule';
import { RiEditBoxFill } from 'react-icons/ri';
import { TbTrashFilled } from 'react-icons/tb';
import Modal from '@/app/components/Modal';
import { deleteClassSchedule, updateClassSchedule } from '../../../../../apis/class_schedule_apis';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { IoCalendarClearSharp } from 'react-icons/io5';
import { IoIosTime } from 'react-icons/io';


interface ClassProps {
    initClassSchedule: IClassSchedule
    onDelete: (id: number) => void
}

const DAYS_OF_WEEK = [
    { value: 'MON', label: 'Monday' },
    { value: 'TUE', label: 'Tuesday' },
    { value: 'WED', label: 'Wednesday' },
    { value: 'THU', label: 'Thursday' },
    { value: 'FRI', label: 'Friday' },
    { value: 'SAT', label: 'Saturday' },
    { value: 'SUN', label: 'Sunday' },
];

const Class: React.FC<ClassProps> = ({ initClassSchedule, onDelete }) => {
    const [classSchedule, setClassSchedule] = React.useState<IClassSchedule>(initClassSchedule);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [updateModalOpen, setUpdateModalOpen] = React.useState<boolean>(false);
    const [updateInput, setUpdateInput] = React.useState<ClassScheduleForm>({
        class_name: classSchedule.class_name,
        start_time: classSchedule.start_time,
        end_time: classSchedule.end_time,
        class_day: classSchedule.class_day,
        course_plan: classSchedule.course_plan
    });

    const handleDelete = async () => { 
        await deleteClassSchedule({ id: classSchedule.id });
        onDelete(classSchedule.id);
        setDeleteModalOpen(false);
    }

    const handleUpdate: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const newClassSchedule: ClassScheduleForm = {
            class_name: updateInput.class_name,
            start_time: updateInput.start_time,
            end_time: updateInput.end_time,
            class_day: updateInput.class_day,
            course_plan: updateInput.course_plan
        };

        try {
            const updatedClass = await updateClassSchedule({ id: classSchedule.id, classSchedule: newClassSchedule });
            console.log('Class updated successfully with ID:', updatedClass.id);
            setClassSchedule(updatedClass);
        } catch (err) {
            console.error('Error updating custom training:', err);
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
                <h5 className="text-2xl font-mono font-bold tracking-tight text-gray-900 dark:text-white -mb-3 overflow-scroll h-16">
                    {classSchedule.class_name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 -mb-4">
                    {DAYS_OF_WEEK.find(day => day.value === classSchedule.class_day)?.label + ' '}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {formatTime(classSchedule.start_time)} - {formatTime(classSchedule.end_time)}
                </p>
                <div className='flex flex-row justify-end'>
                    <Button className='mr-2' outline size='sm' onClick={handleUpdateModal} gradientDuoTone="purpleToBlue"><RiEditBoxFill size={17} /></Button>
                    <Button className='' outline size='sm' onClick={handleDeleteModal} gradientMonochrome="failure"><TbTrashFilled size={17} /></Button>
                </div>
            </Card>

            <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} actions={deleteAction}>
                <h3 className='text-xl font-mono font-medium'>Delete {classSchedule.class_name} #{classSchedule.id}</h3>
            </Modal>

            <Modal modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen}>
                <div className='flex flex-col mb-5 font-sans'>
                    <h3 className='text-xl font-mono font-semibold inline-block'> Update {classSchedule.class_name} #{classSchedule.id} </h3>
                </div>
                <form onSubmit={handleUpdate}>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="class_name" className='mb-3 text-gray-400 text-sm'>Name</label>
                        <TextInput name="class_name" value={updateInput.class_name} onChange={handleInputChange} icon={MdDriveFileRenameOutline} type="text" placeholder="Class name" required shadow />
                    </div>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="class_day" className='mb-3 text-gray-400 text-sm'>Day</label>
                        <Select name='class_day' value={updateInput.class_day} onChange={handleInputChange} icon={IoCalendarClearSharp}>
                            {DAYS_OF_WEEK.map(day => (
                                <option key={day.value} value={day.value}>{day.label}</option>
                            ))}
                        </Select>
                    </div>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="start_time" className='mb-2 text-gray-400 text-sm'>Start Time</label>
                        <TextInput name="start_time" value={updateInput.start_time} onChange={handleInputChange} type="time" placeholder="Start time" icon={IoIosTime} required shadow />
                    </div>
                    <div className='mb-8 font-sans'>
                        <label htmlFor="end_time" className='mb-2 text-gray-400 text-sm'>End Time</label>
                        <TextInput name="end_time" value={updateInput.end_time} onChange={handleInputChange} type="time" placeholder="End time" icon={IoIosTime} required shadow />
                    </div>
                    <Button type='submit' outline gradientDuoTone={'purpleToBlue'} className='w-full transition'>Update Class</Button>
                </form>
            </Modal>

        </div>
    )
}

export default Class
