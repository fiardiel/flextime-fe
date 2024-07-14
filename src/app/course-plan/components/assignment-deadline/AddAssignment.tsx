'use client'

import React, { FormEventHandler } from 'react'
import { IoIosTime } from 'react-icons/io'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { AssignmentDeadlineForm, IAssignmentDeadline } from '../../../../types/course_plan/AssignmentDeadline'
import { addAssignmentDeadline } from '../../../../apis/assignment_deadline_apis'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { Button, DatePicker, Input, Select, TimeInput } from '@nextui-org/react'
import { CalendarDate, getLocalTimeZone, now, parseDate, parseTime, Time, today } from '@internationalized/date'
import Cookies from 'js-cookie'

interface AddAssignmentProps {
    onAdd: (assignmentDeadline: IAssignmentDeadline) => void | boolean
}

const AddAssignment: React.FC<AddAssignmentProps> = ({ onAdd }) => {
    const [error, setError] = React.useState<Error | null>(null);
    const token = Cookies.get('userToken');
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [addInput, setAddInput] = React.useState<AssignmentDeadlineForm>({
        assignment_name: '',
        assignment_due_date: today(getLocalTimeZone()).toString(),
        assignment_due_time: now(getLocalTimeZone()).toString().slice(11, 16)
    });

    const handleInputChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
        setAddInput({ ...addInput, [event.target.name]: event.target.value });
    }

    const handleDateChange = (value: CalendarDate) => {
        setAddInput({ ...addInput, assignment_due_date: value.toString() });
    }

    const handleTimeChange = (value: Time) => {
        setAddInput({ ...addInput, assignment_due_time: value.toString() });
    }

    const handleAdd: FormEventHandler = async (e) => {
        e.preventDefault();

        const newAssignmentDeadline: AssignmentDeadlineForm = {
            assignment_name: addInput.assignment_name,
            assignment_due_date: addInput.assignment_due_date,
            assignment_due_time: addInput.assignment_due_time,
        };

        try {
            const createdAssignmentDeadline = await addAssignmentDeadline(newAssignmentDeadline, token);
            onAdd(createdAssignmentDeadline);
            console.log('Assignment Deadline added successfully with ID:', createdAssignmentDeadline.id);
            onClose();
        } catch (err) {
            setError(err as Error)
        }
    }

    const handleCloseAddModal = () => {
        setAddInput({
            assignment_name: '',
            assignment_due_date: today(getLocalTimeZone()).toString(),
            assignment_due_time: now(getLocalTimeZone()).toString().slice(11, 16)
        });
        onClose();
    }

    return (
        <div>
            <Button variant='ghost' color='primary' onPress={onOpen} className='mt-4 text-white'>
                Add Assignment <FaPlus size={10} className='self-center' />
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                onClose={handleCloseAddModal}
            >
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1">Add Assignment</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleAdd(e);
                            }}>
                                <ModalBody>
                                    <Input
                                        name='assignment_name'
                                        type='text'
                                        autoFocus
                                        label="Name"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={addInput.assignment_name}
                                        startContent={<MdDriveFileRenameOutline />}
                                        required
                                        isRequired
                                    />
                                    <DatePicker
                                        label='Due Date'
                                        name='assignment_due_date'
                                        value={parseDate(addInput.assignment_due_date)}
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
                                        value={parseTime(addInput.assignment_due_time)}
                                        startContent={<IoIosTime />}
                                        isRequired
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

                            <div />
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AddAssignment;
