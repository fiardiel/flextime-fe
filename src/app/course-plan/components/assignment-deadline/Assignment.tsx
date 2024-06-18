'use client';

import React, { FormEventHandler } from 'react'
import { RiEditBoxFill } from 'react-icons/ri';
import { TbTrashFilled } from 'react-icons/tb';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { IoIosTime } from 'react-icons/io';
import { AssignmentDeadlineForm, IAssignmentDeadline } from '../../../../../types/course_plan/AssignmentDeadline';
import { deleteAssignmentDeadline, updateAssignmentDeadline } from '../../../../../apis/assignment_deadline_apis';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { CalendarDate, getLocalTimeZone, parseDate, parseTime, Time } from '@internationalized/date';
import { Button, Card, CardBody, CardFooter, CardHeader, DatePicker, Input, TimeInput } from '@nextui-org/react';
import { useDateFormatter } from '@react-aria/i18n';


interface AssignmentProps {
    initAssignmentDeadline: IAssignmentDeadline
    onDelete: (id: number) => void
}

const AssignmentDeadline: React.FC<AssignmentProps> = ({ initAssignmentDeadline, onDelete }) => {
    const dateFormatter = useDateFormatter({ dateStyle: "full" });
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange, onClose: onDeleteClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange, onClose: onEditClose } = useDisclosure();
    const [assignmentDeadline, setAssignmentDeadline] = React.useState<IAssignmentDeadline>(initAssignmentDeadline);
    const [updateInput, setUpdateInput] = React.useState<AssignmentDeadlineForm>({
        assignment_name: assignmentDeadline.assignment_name,
        assignment_due_date: assignmentDeadline.assignment_due_date,
        assignment_due_time: assignmentDeadline.assignment_due_time,
        course_plan: assignmentDeadline.course_plan
    });

    const handleDelete = async () => {
        await deleteAssignmentDeadline({ id: assignmentDeadline.id });
        onDelete(assignmentDeadline.id);
        onDeleteClose()
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
            const updatedAssignmentDeadline = await updateAssignmentDeadline({ id: assignmentDeadline.id, assignmentDeadline: newAssignmentDeadline });
            console.log('Assignment updated successfully with ID:', updatedAssignmentDeadline.id);
            setAssignmentDeadline(updatedAssignmentDeadline);
        } catch (err) {
            console.error('Error updating assignment:', err);
        }
        onEditClose()
    }

    const handleInputChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
        setUpdateInput({ ...updateInput, [event.target.name]: event.target.value });
    }

    const handleDateChange = (value: CalendarDate) => {
        setUpdateInput({ ...updateInput, assignment_due_date: value.toString() });
    }

    const handleTimeChange = (value: Time) => {
        setUpdateInput({ ...updateInput, assignment_due_time: value.toString() });
    }

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }

    const handleCloseEditModal = () => {
        setUpdateInput({
            assignment_name: assignmentDeadline.assignment_name,
            assignment_due_date: assignmentDeadline.assignment_due_date,
            assignment_due_time: assignmentDeadline.assignment_due_time,
            course_plan: assignmentDeadline.course_plan
        });
        onEditClose();
    }
 
    return (
        <div>
            <Card className='p-5 w-72 h-60 hover:-translate-y-2 hover:scale-110 transition'>
                <CardHeader>
                    <p className='font-bold font-custom text-3xl mr-5 h-20'>
                        <span>{assignmentDeadline.assignment_name}</span>
                    </p>
                </CardHeader>
                <CardBody className='px-3 pt-0 -mt-1 pb-3 overflow-hidden'>
                    <p className='text-gray-500 text-md h-12'>
                        <span>{dateFormatter.format(parseDate(assignmentDeadline.assignment_due_date).toDate(getLocalTimeZone()))}</span>
                    </p>
                    <p className='text-gray-500 text-md h-12'>
                        <span>Due {formatTime(assignmentDeadline.assignment_due_time.toString())}</span>
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
                            <ModalHeader className="flex flex-col gap-1">Delete Assignment {assignmentDeadline.assignment_name}</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}>
                                <ModalBody>
                                    Are you sure you want to delete this assignment?
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
                            <ModalHeader className="flex flex-col gap-1">Edit {assignmentDeadline.assignment_name} </ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(e);
                            }}>
                                <ModalBody>
                                    <Input
                                        name='assignment_name'
                                        type='text'
                                        autoFocus
                                        label="Name"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={updateInput.assignment_name}
                                        startContent={<MdDriveFileRenameOutline />}
                                        required
                                        isRequired
                                    />
                                    <DatePicker
                                        label='Due Date'
                                        name='assignment_due_date'
                                        value={parseDate(updateInput.assignment_due_date)}
                                        onChange={handleDateChange}
                                        isRequired
                                        variant='bordered'
                                        className='w-full'
                                    >

                                    </DatePicker>
                                    <TimeInput
                                        name='assignment_due_time'
                                        label="Start"
                                        variant='bordered'
                                        onChange={handleTimeChange}
                                        value={parseTime(updateInput.assignment_due_time)}
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

export default AssignmentDeadline
