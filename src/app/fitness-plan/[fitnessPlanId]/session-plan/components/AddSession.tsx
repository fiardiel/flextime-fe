'use client';

import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useParams, useRouter } from 'next/navigation';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { ISessionPlan } from '../../../../../types/fitness_plan/SessionPlan';
import { addSessionPlan } from '../../../../../apis/fitness_plan_apis';
import Cookies from 'js-cookie';

interface AddSessionProps {
    onAdd: (newSessionPlan: ISessionPlan) => void;
}

const AddSession: React.FC<AddSessionProps> = ({ onAdd }) => {
    const router = useRouter()

    const { fitnessPlanId } = useParams();

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const handleSubmit = async (trainingType: string) => {
        const sessionPlan = await addSessionPlan({
            training_type: trainingType,
            fitness_plan: parseInt(fitnessPlanId as unknown as string)
        }, Cookies.get('userToken'));
        console.log('Session Plan added successfully with ID: ', sessionPlan.id);
        onAdd(sessionPlan);
        onClose();
        // router.push(`/session-training/${sessionPlan.id}`)
    }

    return (
        <div className='flex mt-9'>
            <Button onPress={onOpen} color='primary' variant='shadow' startContent={<FaPlus/>}>
                <span>Add Session</span>
            </Button>
            <Modal
                size='sm'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1 text-center">Pick Training Type</ModalHeader>
                            <ModalBody className='pt-0 font-sans font-extrabold'>
                                <div className='flex flex-row justify-center'>
                                    <Button size='lg' name='trainingType' color="secondary" variant="ghost" className='mr-5 p-4 text-white' onClick={() => handleSubmit('HIIT')}>
                                        HIIT
                                    </Button>
                                    <Button size='lg' name='trainingType' color="secondary" variant="ghost" className='mr-5 p-4 text-white' onClick={() => handleSubmit("Strength")} >
                                        Strength
                                    </Button>
                                    <Button size='lg' name='trainingType' color="secondary" variant="ghost" className='p-4 mb-3 text-white' onClick={() => handleSubmit("Cardio")} >
                                        Cardio
                                    </Button>
                                </div>
                            </ModalBody>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AddSession
