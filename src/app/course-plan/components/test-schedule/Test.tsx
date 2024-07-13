'use client';

import React, { FormEventHandler } from 'react'
import { RiEditBoxFill } from 'react-icons/ri';
import { TbTrashFilled } from 'react-icons/tb';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { IoIosTime } from 'react-icons/io';
import { TestSchedule, TestScheduleForm } from '../../../../types/course_plan/TestSchedule';
import { deleteTestSchedule, updateTestSchedule } from '../../../../apis/test_schedule_apis';
import { Button, Card, CardBody, CardFooter, CardHeader, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, TimeInput, useDisclosure } from '@nextui-org/react';
import { useDateFormatter } from '@react-aria/i18n';
import { CalendarDate, getLocalTimeZone, parseDate, parseTime, Time } from '@internationalized/date';


interface TestProps {
    initTestSchedule: TestSchedule
    onDelete: (id: number) => void
}

const Test: React.FC<TestProps> = ({ initTestSchedule, onDelete }) => {
    const dateFormatter = useDateFormatter({ dateStyle: "full" });
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange, onClose: onDeleteClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange, onClose: onEditClose } = useDisclosure();
    const [testSchedule, setTestSchedule] = React.useState<TestSchedule>(initTestSchedule);
    const [updateInput, setUpdateInput] = React.useState<TestScheduleForm>({
        test_name: testSchedule.test_name,
        test_start: testSchedule.test_start,
        test_end: testSchedule.test_end,
        test_date: testSchedule.test_date,
        course_plan: testSchedule.course_plan
    });

    const handleStartTimeChange = (value: Time) => {
        setUpdateInput({ ...updateInput, test_start: value.toString() });
    }

    const handleEndTimeChange = (value: Time) => {
        setUpdateInput({ ...updateInput, test_end: value.toString() });
    }

    const handleDateChange = (value: CalendarDate) => {
        setUpdateInput({ ...updateInput, test_date: value.toString() });
    }

    const handleDelete = async () => {
        await deleteTestSchedule({ id: testSchedule.id });
        onDelete(testSchedule.id);
        onDeleteClose();
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
        onEditClose();
    }

    const handleInputChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
        setUpdateInput({ ...updateInput, [event.target.name]: event.target.value });
    }

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }

    const handleCloseEditModal = () => {   
        setUpdateInput({
            test_name: testSchedule.test_name,
            test_start: testSchedule.test_start,
            test_end: testSchedule.test_end,
            test_date: testSchedule.test_date,
            course_plan: testSchedule.course_plan
        });
        onEditClose();
    }

    return (
        <div>
            <Card className='p-5 w-72 h-60 hover:-translate-y-2 hover:scale-110 transition'>
                <CardHeader>
                    <p className='font-bold font-custom text-3xl mr-5 h-20'>
                        <span>{testSchedule.test_name}</span>
                    </p>
                </CardHeader>
                <CardBody className='px-3 pt-0 -mt-1 pb-3 overflow-hidden'>
                    <p className='text-gray-500 text-md h-12'>
                        <span>{dateFormatter.format(parseDate(testSchedule.test_date).toDate(getLocalTimeZone()))}</span>
                    </p>
                    <p className='text-gray-500 text-md h-12'>
                        <span> {formatTime(testSchedule.test_start)} - {formatTime(testSchedule.test_end)} </span>
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
                            <ModalHeader className="flex flex-col gap-1">Delete test {testSchedule.test_name}</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}>
                                <ModalBody>
                                    Are you sure you want to delete this test?
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
                            <ModalHeader className="flex flex-col gap-1">Add Assignment</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(e);
                            }}>
                                <ModalBody>
                                    <Input
                                        name='test_name'
                                        label="Name"
                                        type='text'
                                        autoFocus
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={updateInput.test_name}
                                        startContent={<MdDriveFileRenameOutline />}
                                        required
                                        isRequired
                                    />
                                    <DatePicker
                                        name='test_date'
                                        label='Date'
                                        value={parseDate(updateInput.test_date)}
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
                                        value={parseTime(updateInput.test_start)}
                                        startContent={<IoIosTime />}
                                        isRequired
                                    />
                                    <TimeInput
                                        name='test_end'
                                        label="End"
                                        variant='bordered'
                                        onChange={handleEndTimeChange}
                                        value={parseTime(updateInput.test_end)}
                                        startContent={<IoIosTime />}
                                        isRequired
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

export default Test
