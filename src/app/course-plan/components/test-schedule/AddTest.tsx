'use client'

import React, { FormEventHandler } from 'react'
import { IoIosTime } from 'react-icons/io'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { TestSchedule, TestScheduleForm } from '../../../../../types/course_plan/TestSchedule'
import { addTestSchedule } from '../../../../../apis/test_schedule_apis'
import { FaPlus } from 'react-icons/fa'
import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { DatePicker, Input, TimeInput } from '@nextui-org/react'
import { CalendarDate, getLocalTimeZone, now, parseDate, parseTime, Time, today } from '@internationalized/date'

interface AddTestProps {
    onAdd: (testSchedule: TestSchedule) => void
}

const AddTest: React.FC<AddTestProps> = ({ onAdd }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [addInput, setAddInput] = React.useState<TestScheduleForm>({
        test_name: '',
        test_start: now(getLocalTimeZone()).toString().slice(11, 16),
        test_end: now(getLocalTimeZone()).add({ hours: 1 }).toString().slice(11, 16),
        test_date: today(getLocalTimeZone()).toString(),
        course_plan: 1
    });

    const handleInputChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
        setAddInput({ ...addInput, [event.target.name]: event.target.value });
    }

    const handleStartTimeChange = (value: Time) => {
        setAddInput({ ...addInput, test_start: value.toString() });
    }

    const handleEndTimeChange = (value: Time) => {
        setAddInput({ ...addInput, test_end: value.toString() });
    }

    const handleDateChange = (value: CalendarDate) => {
        setAddInput({ ...addInput, test_date: value.toString() });
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

        onClose()
    }

    const handleCloseAddModal = () => {
        setAddInput({
            test_name: '',
            test_start: now(getLocalTimeZone()).toString().slice(11, 16),
            test_end: now(getLocalTimeZone()).add({ hours: 1 }).toString().slice(11, 16),
            test_date: today(getLocalTimeZone()).toString(),
            course_plan: 1
        });
        onClose();
    }

    return (
        <div>
            <Button variant='ghost' color='primary' onPress={onOpen} className='mt-4 text-white'>
                Add Test <FaPlus size={10} className='self-center' />
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1">Add Test</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleAdd(e);
                            }}>
                                <ModalBody>
                                    <Input
                                        name='test_name'
                                        label="Name"
                                        type='text'
                                        autoFocus
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={addInput.test_name}
                                        startContent={<MdDriveFileRenameOutline />}
                                        required
                                        isRequired
                                    />
                                    <DatePicker
                                        name='test_date'
                                        label='Date'
                                        value={parseDate(addInput.test_date)}
                                        onChange={handleDateChange}
                                        isRequired
                                        variant='bordered'
                                        className='w-full'
                                    >
                                    </DatePicker>
                                    <TimeInput
                                        name='test_start'
                                        label="Start"
                                        variant='bordered'
                                        onChange={handleStartTimeChange}
                                        value={parseTime(addInput.test_start)}
                                        startContent={<IoIosTime />}
                                        isRequired
                                    />
                                    <TimeInput
                                        name='test_end'
                                        label="End"
                                        variant='bordered'
                                        onChange={handleEndTimeChange}
                                        value={parseTime(addInput.test_end)}
                                        startContent={<IoIosTime />}
                                        isRequired
                                    />

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={handleCloseAddModal}>
                                        Close
                                    </Button>
                                    <Button color="primary" type='submit'>
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </form>

                            <div />
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AddTest
