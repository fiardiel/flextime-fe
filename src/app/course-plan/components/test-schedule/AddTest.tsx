'use client'

import { Button, Datepicker, TextInput } from 'flowbite-react'
import React, { FormEventHandler } from 'react'
import Modal from '@/app/components/Modal'
import { IoIosTime } from 'react-icons/io'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { TestSchedule, TestScheduleForm } from '../../../../../types/course_plan/TestSchedule'
import { addTestSchedule } from '../../../../../apis/test_schedule_apis'
import { FaPlus } from 'react-icons/fa'

interface AddTestProps {
    onAdd: (testSchedule: TestSchedule) => void
}

const AddTest: React.FC<AddTestProps> = ({ onAdd }) => {
    const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);
    const [addInput, setAddInput] = React.useState<TestScheduleForm>({
        test_name: '',
        test_start: '',
        test_end: '',
        test_date: '',
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

        const newTestSchedule: TestScheduleForm = {
            test_name: addInput.test_name,
            test_start: addInput.test_start,
            test_end: addInput.test_end,
            test_date: addInput.test_date,
            course_plan: addInput.course_plan
        };

        try {
            const createdTestSchedule = await addTestSchedule({ testSchedule: newTestSchedule });
            onAdd(createdTestSchedule);
            console.log('Test Schedule added successfully with ID:', createdTestSchedule.id);
        } catch (err) {
            console.error('Error creating test schedule:', err);
        }

        setOpenAddModal(false);
    }

    return (
        <div>
            <Button outline gradientDuoTone={'cyanToBlue'} onClick={handleOpenAddModal}>
                Add Test <FaPlus size={10} className='self-center ml-2' />
            </Button>
            <Modal modalOpen={openAddModal} setModalOpen={setOpenAddModal}>
                <div className='flex flex-col mb-5 font-sans'>
                    <h3 className='text-xl font-mono font-semibold inline-block'> Create Test Schedule </h3>
                </div>
                <form onSubmit={handleAdd}>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="test_name" className='mb-3 text-gray-400 text-sm'>Name</label>
                        <TextInput name="test_name" value={addInput.test_name} onChange={handleInputChange} icon={MdDriveFileRenameOutline} type="text" placeholder="Test name" required shadow />
                    </div>
                    <div className='mb-3 font-sans'>
                        <label htmlFor="test_date" className='mb-3 text-gray-400 text-sm'>Date</label>
                        <Datepicker
                            name='test_date'
                            value={addInput.test_date}
                            onChange={handleInputChange}
                            onSelectedDateChanged={(date) => {
                                const formattedDate = date.getFullYear() + '-' +
                                    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                                    ('0' + date.getDate()).slice(-2);
                                setAddInput({ ...addInput, test_date: formattedDate });
                            }}
                            placeholder='Test date'
                            required
                        >
                        </Datepicker>
                    </div>
                    <div className='mb-8 font-sans grid grid-cols-2'>
                        <div className='mr-3'>
                            <label htmlFor="test_start" className='mb-2 text-gray-400 text-sm'>Start Time</label>
                            <TextInput name="test_start" value={addInput.test_start} onChange={handleInputChange} type="time" placeholder="Start time" icon={IoIosTime} required shadow />
                        </div>
                        <div>
                            <label htmlFor="test_end" className='mb-2 text-gray-400 text-sm'>End Time</label>
                            <TextInput name="test_end" value={addInput.test_end} onChange={handleInputChange} type="time" placeholder="End time" icon={IoIosTime} required shadow />
                        </div>
                    </div>
                    <Button type='submit' outline gradientDuoTone={'purpleToBlue'} className='w-full transition'>Add Test</Button>
                </form>
            </Modal>
        </div>
    )
}

export default AddTest
