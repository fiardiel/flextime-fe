'use client'

import { Button, FloatingLabel, Select, TextInput } from 'flowbite-react'
import React, { FormEventHandler, MouseEventHandler } from 'react'
import { ClassScheduleForm, IClassSchedule } from '../../../../../types/course_plan/ClassSchedule'
import Modal from '@/app/components/Modal'
import { addClassSchedule } from '../../../../../apis/class_schedule_apis'
import { IoIosTime } from 'react-icons/io'
import { IoCalendarClearSharp } from 'react-icons/io5'
import { MdDriveFileRenameOutline } from 'react-icons/md'

interface AddClassProps {
    onAdd: (classSchedule: IClassSchedule) => void
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

const AddClass: React.FC<AddClassProps> = ({ onAdd }) => {
    const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);
    const [addInput, setAddInput] = React.useState<ClassScheduleForm>({
        class_name: '',
        start_time: '',
        end_time: '',
        class_day: 'MON',
        course_plan: 1
    });

    const handleOpenAddModal = () => {
        setOpenAddModal(true);
    }

    const handleInputChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
        setAddInput({ ...addInput, [event.target.name]: event.target.value });
    }

    const handleAdd: FormEventHandler = async (e) => {
        e.preventDefault();

        const newClassSchedule: ClassScheduleForm = {
            class_name: addInput.class_name,
            start_time: addInput.start_time,
            end_time: addInput.end_time,
            class_day: addInput.class_day,
            course_plan: addInput.course_plan
        };

        try {
            const createdClassSchedule = await addClassSchedule({ classSchedule: newClassSchedule });
            onAdd(createdClassSchedule);
            console.log('Class Schedule added successfully with ID:', createdClassSchedule.id);
        } catch (err) {
            console.error('Error creating class schedule:', err);
        }

        setOpenAddModal(false);
    }

    return (
        <div>
            <Button outline gradientDuoTone={'cyanToBlue'} onClick={handleOpenAddModal}>
                Add Class
            </Button>
            <Modal modalOpen={openAddModal} setModalOpen={setOpenAddModal}>
                <div className='flex flex-col mb-5 font-sans'>
                    <h3 className='text-xl font-mono font-semibold inline-block'> Create Class Schedule </h3>
                </div>
                <form onSubmit={handleAdd}>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="class_name" className='mb-3 text-gray-400 text-sm'>Name</label>
                        <TextInput name="class_name" value={addInput.class_name} onChange={handleInputChange} icon={MdDriveFileRenameOutline} type="text" placeholder="Class name" required shadow />
                    </div>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="class_day" className='mb-3 text-gray-400 text-sm'>Day</label>
                        <Select name='class_day' value={addInput.class_day} onChange={handleInputChange} icon={IoCalendarClearSharp}>
                            {DAYS_OF_WEEK.map(day => (
                                <option key={day.value} value={day.value}>{day.label}</option>
                            ))}
                        </Select>
                    </div>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="start_time" className='mb-2 text-gray-400 text-sm'>Start Time</label>
                        <TextInput name="start_time" value={addInput.start_time} onChange={handleInputChange} type="time" placeholder="Start time" icon={IoIosTime} required shadow />
                    </div>
                    <div className='mb-8 font-sans'>
                        <label htmlFor="end_time" className='mb-2 text-gray-400 text-sm'>End Time</label>
                        <TextInput name="end_time" value={addInput.end_time} onChange={handleInputChange} type="time" placeholder="End time" icon={IoIosTime} required shadow />
                    </div>
                    <Button type='submit' outline gradientDuoTone={'purpleToBlue'} className='w-full transition'>Add Class</Button>
                </form>
            </Modal>
        </div>
    )
}

export default AddClass
