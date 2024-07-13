'use client'

import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import React from 'react'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { deleteSessionSchedule } from '../../../../apis/activity_plan_apis';

interface DeleteScheduleProps {
    sessionScheduleId: number;
}

const DeleteSchedule:React.FC<DeleteScheduleProps> = ( {sessionScheduleId} ) => {
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange, onClose: onDeleteClose } = useDisclosure();
    const handleDelete = () => {
        try {
            deleteSessionSchedule(sessionScheduleId)
            console.log("Deleted Session Schedule with id ", sessionScheduleId)
            onDeleteClose()
        } catch {
            console.log("Error deleting Session Schedule with id ", sessionScheduleId)
        }
    }


    return (
        <div>
            <Button color='danger' variant='light' isIconOnly onPress={onDeleteOpen}> <MdDelete size={20} /> </Button>
            <Modal
                isOpen={isDeleteOpen}
                onOpenChange={onDeleteOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1">Delete Session Schedule</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}>
                                <ModalBody>
                                    Are you sure you want to delete session schedule #{sessionScheduleId}?
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
        </div>
    )
}

export default DeleteSchedule
