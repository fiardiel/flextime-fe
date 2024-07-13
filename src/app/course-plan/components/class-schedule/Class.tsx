'use client';

import React, { FormEventHandler } from 'react'
import { ClassScheduleForm, IClassSchedule } from '../../../../types/course_plan/ClassSchedule';
import { RiEditBoxFill } from 'react-icons/ri';
import { TbTrashFilled } from 'react-icons/tb';
import { deleteClassSchedule, updateClassSchedule } from '../../../../apis/class_schedule_apis';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { IoIosTime } from 'react-icons/io';
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, TimeInput, TimeInputValue, useDisclosure } from '@nextui-org/react';
import { parseTime, Time } from '@internationalized/date';
import { BsCalendar2Fill } from 'react-icons/bs';


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
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange, onClose: onDeleteClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange, onClose: onEditClose } = useDisclosure();
    const [classSchedule, setClassSchedule] = React.useState<IClassSchedule>(initClassSchedule);
    const [updateInput, setUpdateInput] = React.useState<ClassScheduleForm>({
        class_name: classSchedule.class_name,
        start_time: classSchedule.start_time,
        end_time: classSchedule.end_time,
        class_day: classSchedule.class_day,
        course_plan: classSchedule.course_plan
    });
    const [startTime, setStartTime] = React.useState<string>(updateInput.start_time);
    const [endTime, setEndTime] = React.useState<string>(updateInput.end_time);

    const handleDelete = async () => {
        await deleteClassSchedule({ id: classSchedule.id });
        onDelete(classSchedule.id);
        onDeleteClose();
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
        onEditClose();
    }

    const handleInputChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
        setUpdateInput({ ...updateInput, [event.target.name]: event.target.value });
    }

    const handleStartTimeInputChange = (value: Time) => { 
        setStartTime(value.toString());
    }

    const handleEndTimeInputChange = (value: Time) => {
        setEndTime(value.toString());
    }

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }

    const handleCloseEditModal = () => { 
        onEditClose();
        setUpdateInput({
            class_name: classSchedule.class_name,
            start_time: classSchedule.start_time,
            end_time: classSchedule.end_time,
            class_day: classSchedule.class_day,
            course_plan: classSchedule.course_plan
        });
    }

    return (
        <div>
            <Card className='p-5 w-72 h-60 hover:-translate-y-2 hover:scale-110 transition'>
                <CardHeader>
                    <p className='font-bold font-custom text-3xl mr-5 h-20'>
                        <span>{classSchedule.class_name}</span>
                    </p>
                </CardHeader>
                <CardBody className='px-3 pt-0 -mt-1 pb-3 overflow-hidden'>
                    <p className='text-gray-500 text-md h-12'>
                        <span>{DAYS_OF_WEEK.find(day => day.value === classSchedule.class_day)?.label + ' '}</span>
                    </p>
                    <p className='text-gray-500 text-md h-12'>
                        <span>{formatTime(classSchedule.start_time.toString())} - {formatTime(classSchedule.end_time.toString())}</span>
                    </p>
                </CardBody>
                <CardFooter className='justify-end'>
                    <Button color='primary' className='border-2 border-gray-500 mr-2' isIconOnly onPress={onEditOpen}>
                        <RiEditBoxFill size={17} />
                    </Button>
                    <Button color='danger' className='border-2 border-gray-500' isIconOnly onPress={onDeleteOpen}>
                        <TbTrashFilled size={17} />
                    </Button>
                </CardFooter>
            </Card>

            <Modal
                isOpen={isDeleteOpen}
                onOpenChange={onDeleteOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1">Delete Class</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}>
                                <ModalBody>
                                    Are you sure you want to delete this class?
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="faded" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="danger" type='submit'>
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </form>

                            <div />
                        </div>
                    )}
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isEditOpen}
                onOpenChange={onEditOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1">Edit class</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(e);
                            }}>
                                <ModalBody>
                                    <Input
                                        name='class_name'
                                        type='text'
                                        autoFocus
                                        label="Name"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={updateInput.class_name}
                                        startContent={<MdDriveFileRenameOutline />}
                                    />
                                    <Select
                                        name='class_day'
                                        autoFocus
                                        label="Day"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        defaultSelectedKeys={[updateInput.class_day]}
                                        value={updateInput.class_day}
                                        startContent={<BsCalendar2Fill size={12}/>}
                                    >
                                        {DAYS_OF_WEEK.map(day => (
                                            <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
                                        ))}
                                    </Select>
                                    <TimeInput
                                        name='start_time'
                                        autoFocus
                                        label="Start"
                                        variant='bordered'
                                        onChange={handleStartTimeInputChange}
                                        value={parseTime(startTime)}
                                        startContent={<IoIosTime />}
                                    />
                                    <TimeInput
                                        name='end_time'
                                        autoFocus
                                        label="End"
                                        variant='bordered'
                                        onChange={handleEndTimeInputChange}
                                        value={parseTime(endTime)}
                                        startContent={<IoIosTime />}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={handleCloseEditModal}>
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

export default Class
