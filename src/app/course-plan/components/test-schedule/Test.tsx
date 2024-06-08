'use client';

import { Button, Card, Datepicker, TextInput } from 'flowbite-react';
import React, { FormEventHandler } from 'react'
import { RiEditBoxFill } from 'react-icons/ri';
import { TbTrashFilled } from 'react-icons/tb';
import Modal from '@/app/components/Modal';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { IoCalendarClearSharp } from 'react-icons/io5';
import { IoIosTime } from 'react-icons/io';
import { TestSchedule, TestScheduleForm } from '../../../../../types/course_plan/TestSchedule';
import { deleteTestSchedule, updateTestSchedule } from '../../../../../apis/test_schedule_apis';


interface TestProps {
    initTestSchedule: TestSchedule
    onDelete: (id: number) => void
}

const Test: React.FC<TestProps> = ({ initTestSchedule, onDelete }) => {
    const [testSchedule, setTestSchedule] = React.useState<TestSchedule>(initTestSchedule);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [updateModalOpen, setUpdateModalOpen] = React.useState<boolean>(false);
    const [updateInput, setUpdateInput] = React.useState<TestScheduleForm>({
        test_name: testSchedule.test_name,
        test_start: testSchedule.test_start,
        test_end: testSchedule.test_end,
        test_date: testSchedule.test_date,
        course_plan: testSchedule.course_plan
    });

    const handleDelete = async () => { 
        await deleteTestSchedule({ id: testSchedule.id });
        onDelete(testSchedule.id);
        setDeleteModalOpen(false);
    }

    const handleUpdate: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const newClassSchedule: TestScheduleForm = {
            test_name: updateInput.test_name,
            test_start: updateInput.test_start,
            test_end: updateInput.test_end,
            test_date: updateInput.test_date,
            course_plan: updateInput.course_plan
        };

        try {
            const updatedTest = await updateTestSchedule({ id: testSchedule.id, testSchedule: newClassSchedule });
            console.log('Class updated successfully with ID:', updatedTest.id);
            setTestSchedule(updatedTest);
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
                <h5 className="font-mono text-2xl font-bold tracking-tight text-gray-900 dark:text-white -mb-3 overflow-scroll h-16">
                    {testSchedule.test_name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 -mb-4">
                    {testSchedule.test_date}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {formatTime(testSchedule.test_start)} - {formatTime(testSchedule.test_end)}
                </p>
                <div className='flex flex-row justify-end'>
                    <Button className='mr-2' outline size='sm' onClick={handleUpdateModal} gradientDuoTone="purpleToBlue"><RiEditBoxFill size={17} /></Button>
                    <Button className='' outline size='sm' onClick={handleDeleteModal} gradientMonochrome="failure"><TbTrashFilled size={17} /></Button>
                </div>
            </Card>

            <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} actions={deleteAction}>
                <h3 className='text-xl font-mono font-medium'>Delete {testSchedule.test_name} #{testSchedule.id}</h3>
            </Modal>

            <Modal modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen}>
                <div className='flex flex-col mb-5 font-sans'>
                    <h3 className='text-xl font-mono font-semibold inline-block'> Update {testSchedule.test_name} #{testSchedule.id} </h3>
                </div>
                <form onSubmit={handleUpdate}>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="test_name" className='mb-3 text-gray-400 text-sm'>Name</label>
                        <TextInput name="test_name" value={updateInput.test_name} onChange={handleInputChange} icon={MdDriveFileRenameOutline} type="text" placeholder="Class name" required shadow />
                    </div>
                    {/* <div className='mb-3 font-sans'>
                        <label htmlFor="test_date" className='mb-3 text-gray-400 text-sm'>Day</label>
                        <Datepicker name='test_date' value={updateInput.test_date.toString()} onChange={handleInputChange} required></Datepicker>
                    </div> */}
                    <div className='mb-3 font-sans'>
                        <label htmlFor="test_date" className='mb-3 text-gray-400 text-sm'>Date</label>
                        <Datepicker
                            name='test_date'
                            value={updateInput.test_date}
                            onChange={handleInputChange}
                            onSelectedDateChanged={(date) => {
                                const formattedDate = date.getFullYear() + '-' +
                                    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                                    ('0' + date.getDate()).slice(-2);
                                setUpdateInput({ ...updateInput, test_date: formattedDate });
                            }}
                            required
                        >
                        </Datepicker>
                    </div>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="test_start" className='mb-2 text-gray-400 text-sm'>Start Time</label>
                        <TextInput name="test_start" value={updateInput.test_start} onChange={handleInputChange} type="time" placeholder="Start time" icon={IoIosTime} required shadow />
                    </div>
                    <div className='mb-8 font-sans'>
                        <label htmlFor="test_end" className='mb-2 text-gray-400 text-sm'>End Time</label>
                        <TextInput name="test_end" value={updateInput.test_end} onChange={handleInputChange} type="time" placeholder="End time" icon={IoIosTime} required shadow />
                    </div>
                    <Button type='submit' outline gradientDuoTone={'purpleToBlue'} className='w-full transition'>Update Test</Button>
                </form>
            </Modal>

        </div>
    )
}

export default Test
