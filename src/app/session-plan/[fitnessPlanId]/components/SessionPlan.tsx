'use client';

import React, { useEffect } from 'react'
import { ISessionPlan } from '../../../../../types/fitness_plan/SessionPlan'
import { deleteSessionPlan, getTotalDuration, getTrainingCountBySessionPlan } from '../../../../../apis/fitness_plan_apis';
import { PiBarbellFill } from 'react-icons/pi';
import { TbTrashFilled } from 'react-icons/tb';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Textarea, Link } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

interface SessionPlanProps {
    sessionPlan: ISessionPlan;
    onDelete: (id: number) => void;
}

const SessionPlan: React.FC<SessionPlanProps> = ({ sessionPlan, onDelete }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [totalDuration, setTotalDuration] = React.useState<string | null>(null);
    const [trainingCount, setTrainingCount] = React.useState<number | null>(null);

    const confirmDelete = async () => {
        await deleteSessionPlan({ sessionPlanId: sessionPlan.id });
        console.log(`Session plan ${sessionPlan.id} deleted`);
        onClose()
        onDelete(sessionPlan.id)
    };

    useEffect(() => {
        const fetchTotalDuration = async () => {
            const fetchedDuration = await getTotalDuration({ sessionPlanId: sessionPlan.id });
            const minutes = Math.floor(fetchedDuration.total_duration / 60);
            const seconds = fetchedDuration.total_duration % 60;
            const formattedDuration = `${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
            setTotalDuration(formattedDuration);
        }
        fetchTotalDuration();
    }, [sessionPlan.id]);

    useEffect(() => {
        const fetchTrainingCount = async () => {
            const fetchedCount = await getTrainingCountBySessionPlan({ sessionPlanId: sessionPlan.id });
            setTrainingCount(fetchedCount);
        }
        fetchTrainingCount();
    }, [sessionPlan.id])

    return (
        <div>
            <Card className='p-5 w-72 h-52 hover:-translate-y-2 hover:scale-110 transition'>
                <CardHeader>
                    <h1 className='font-bold font-custom text-3xl mr-5'>{sessionPlan.training_type}</h1>
                </CardHeader>
                <CardBody className='py-0'>
                    <p className='text-gray-400 text-sm mb-2'> {trainingCount} training(s) added </p>
                    <p className='text-blue-800 text-xs px-2 py-1 bg-blue-300 text-center rounded-lg self-start font-semibold mb-4'> {totalDuration || 0} </p>
                </CardBody>
                <CardFooter className='justify-end'>
                    <Link href={`/session-training/${sessionPlan.id}`} className='mr-2'>
                        <Button color='primary' isIconOnly> <PiBarbellFill size={20} /> </Button>
                    </Link>
                    <Button color='danger' isIconOnly onPress={onOpen}>
                        <TbTrashFilled size={20} />
                    </Button>
                </CardFooter>
            </Card>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1">Delete Session plan</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                confirmDelete();
                            }}>
                                <ModalBody>
                                    Are you sure you want to delete this session plan?
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

export default SessionPlan
