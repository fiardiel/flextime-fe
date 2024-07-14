'use client'

import React, { FormEventHandler, useState } from 'react'
import { ClassScheduleForm, IClassSchedule } from '../../../../types/course_plan/ClassSchedule'
import { addClassSchedule } from '../../../../apis/class_schedule_apis'
import { IoIosTime } from 'react-icons/io'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { Input, Select, SelectItem, TimeInput } from '@nextui-org/react'
import { BsCalendar2Fill } from 'react-icons/bs'
import { parseTime, Time } from '@internationalized/date'
import Cookies from 'js-cookie'

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
    const token = Cookies.get('userToken');
    const [error, setError] = useState<Error | null>(null);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [addInput, setAddInput] = React.useState<ClassScheduleForm>({
        class_name: '',
        start_time: '10:00',
        end_time: '11:00',
        class_day: '',
    });
    const handleInputChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
        setAddInput({ ...addInput, [event.target.name]: event.target.value });
    }

    const handleStartTimeChange = (value: Time) => {
        setAddInput({ ...addInput, start_time: value.toString() });
    }

    const handleEndTimeChange = (value: Time) => {
        setAddInput({ ...addInput, end_time: value.toString() });
    }

    const handleAdd: FormEventHandler = async (e) => {
        e.preventDefault();

        const newClassSchedule: ClassScheduleForm = {
            class_name: addInput.class_name,
            start_time: addInput.start_time,
            end_time: addInput.end_time,
            class_day: addInput.class_day,
        };

        try {
            const createdClassSchedule = await addClassSchedule(newClassSchedule, token);
            onAdd(createdClassSchedule);
            console.log('Class Schedule added successfully with ID:', createdClassSchedule.id);
            onClose();
        } catch (err) {
            setError(err as Error);
        }
    }

    const handleCloseModal = () => {
        setError(null);
        onClose();
        setAddInput({
            class_name: '',
            start_time: '10:00',
            end_time: '11:00',
            class_day: '',
        });
    }

    return (
        <div>
            <Button variant='ghost' color='primary' onPress={onOpen} className='mt-4 text-white'>
                Add Class <FaPlus size={10} className='self-center' />
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                onClose={handleCloseModal}
            >
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1">Add Class</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleAdd(e);
                            }}>
                                <ModalBody>
                                    <Input
                                        name='class_name'
                                        type='text'
                                        autoFocus
                                        label="Name"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={addInput.class_name}
                                        startContent={<MdDriveFileRenameOutline />}
                                        required
                                    />
                                    <Select
                                        name='class_day'
                                        label="Day"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={addInput.class_day}
                                        startContent={<BsCalendar2Fill size={12} />}
                                        required
                                    >
                                        {DAYS_OF_WEEK.map(day => (
                                            <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
                                        ))}
                                    </Select>
                                    <TimeInput
                                        name='start_time'
                                        label="Start"
                                        variant='bordered'
                                        onChange={handleStartTimeChange}
                                        value={parseTime(addInput.start_time)}
                                        startContent={<IoIosTime />}
                                    />
                                    <TimeInput
                                        name='end_time'
                                        label="End"
                                        variant='bordered'
                                        onChange={handleEndTimeChange}
                                        value={parseTime(addInput.end_time)}
                                        startContent={<IoIosTime />}
                                    />
                                    {error ? (<p className='text-danger'> {error.message} </p>) : null}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type='submit'>
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </form>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AddClass
