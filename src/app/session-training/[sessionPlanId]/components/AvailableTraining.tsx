'use client';

import { useParams } from 'next/navigation';
import { ITraining } from '../../../../../types/fitness_plan/Training';
import React, { FormEventHandler } from 'react';
import { HiPlus } from 'react-icons/hi';
import { MdOutlineTimer } from 'react-icons/md';
import { addCustomization, addSessionTraining } from '../../../../../apis/fitness_plan_apis';
import { FaListUl } from 'react-icons/fa';
import { RiLoopLeftFill } from 'react-icons/ri';
import { ISessionTraining } from '../../../../../types/fitness_plan/SessionTraining';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";


interface AvailableTrainingProps {
    training: ITraining;
    onAdd: (newTraining: ISessionTraining) => void;
}

const AvailableTraining: React.FC<AvailableTrainingProps> = ({ training, onAdd }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const { sessionPlanId } = useParams()

    const handleSubmitCustomization: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const newCustomization = {
            sets: parseInt(customization.set),
            reps: parseInt(customization.repetition),
            duration: parseInt(customization.duration)
        };

        try {
            const createdCustomization = await addCustomization(newCustomization);
            const createdSessionTraining = await addSessionTraining({
                training: training.id,
                customization: createdCustomization.id,
                session_plan: parseInt(sessionPlanId as unknown as string)
            });
            onAdd(createdSessionTraining);

            console.log('Customization added successfully with ID:', createdCustomization.id,
                '\nSession Training added successfully with ID:', createdSessionTraining.id,
            );
        } catch (err) {
            console.error('Error creating custom training:', err);
        }

        setCustomization({
            set: '',
            repetition: '',
            duration: ''
        });

        onClose();
    }

    const [customization, setCustomization] = React.useState({
        set: '',
        repetition: '',
        duration: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomization({ ...customization, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <Card className='p-5 w-72 h-72 hover:-translate-y-2 transition'>
                <CardHeader>
                    <h1 className='font-bold font-custom text-3xl mr-5 overflow-scroll h-[72px]'>{training.title}</h1>
                </CardHeader>
                <CardBody className='pt-1'>
                    <p className='text-gray-500 text-md h-20 overflow-scroll'>
                        {training.description}
                    </p>
                </CardBody>
                <CardFooter className='justify-end'>
                    <Button color='primary' size='sm' radius='full' variant='flat' isIconOnly onPress={onOpen} className='hover:-translate-y-1 hover:scale-110 transition origin-bottom-right'>
                        <HiPlus className='self-center' size={20} />
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
                            <ModalHeader className="flex flex-col gap-1">Customize { training.title }</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmitCustomization(e);
                            }}>
                                <ModalBody>
                                    <Input
                                        name='set'
                                        autoFocus
                                        label="Sets"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={customization.set}
                                        startContent={<FaListUl />}
                                    />
                                    <Input
                                        name='repetition'
                                        autoFocus
                                        label="Reps"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={customization.repetition}
                                        startContent={<RiLoopLeftFill />}
                                    />
                                    <Input
                                        name='duration'
                                        autoFocus
                                        label="Duration (in seconds)"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={customization.duration}
                                        startContent={<MdOutlineTimer />}
                                    />
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

export default AvailableTraining
