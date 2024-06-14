'use client'

import React, { FormEventHandler, useEffect, useState } from 'react'
import { getFitnessPlanById, updateFitnessPlanById } from '../../../../apis/fitness_plan_apis'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import AddFitnessPlan from './AddFitnessPlan'
import { FitnessPlanForm, IFitnessPlan } from '../../../../types/fitness_plan/FitnessPlan';
import { Button } from '@nextui-org/button';
import { RiPencilFill } from 'react-icons/ri';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Input } from '@nextui-org/react';

interface FitnessPlanProps {
    initFitnessPlan: any
}

const FitnessPlan: React.FC<FitnessPlanProps> = ({ initFitnessPlan }) => {
    const [fitnessPlan, setFitnessPlan] = useState(initFitnessPlan)
    const [revalidationTrigger, setRevalidationTrigger] = useState(false)
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [updateInput, setUpdateInput] = React.useState<FitnessPlanForm | any>({
        title: fitnessPlan.detail === 'No FitnessPlan matches the given query.' ? '' : fitnessPlan.title,
        user: fitnessPlan.detail === 'No FitnessPlan matches the given query.' ? '' : '1'
    });
    const handleInputChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
        setUpdateInput({ ...updateInput, [event.target.name]: event.target.value });
    }

    const handleUpdate: FormEventHandler = async (e) => {
        e.preventDefault();

        const newFitnessPlan: FitnessPlanForm = {
            title: updateInput.title,
            user: updateInput.user,
        };

        try {
            const updatedFitnessPlan = await updateFitnessPlanById({ id: fitnessPlan.id, fitnessPlan: newFitnessPlan });
            setFitnessPlan(updatedFitnessPlan);
            console.log('Fitness plan updated successfully:', updatedFitnessPlan.id);
        } catch (err) {
            console.error('Error updating fitness plan:', err);
        }
        onClose()
    }

    const fetchFitnessPlans = async () => {
        const plan = await getFitnessPlanById({ id: 6 })
        setUpdateInput({
            title: plan.title,
            user: plan.user
        })
        setFitnessPlan(plan)
        setRevalidationTrigger(false)
    }

    useEffect(() => {
        if (revalidationTrigger) {
            fetchFitnessPlans()
        }
    }, [revalidationTrigger])

    const handleAdd = async () => {
        setRevalidationTrigger(!revalidationTrigger)
    }

    const renderFitnessPlan = () => {
        if (fitnessPlan.detail === 'No FitnessPlan matches the given query.') {
            return <AddFitnessPlan onAdd={handleAdd}></AddFitnessPlan>
        } else {
            const currentFitnessPlan = fitnessPlan as IFitnessPlan
            return (
                <div>
                    <Card className='p-5 w-80 h-60'>
                        <CardHeader>
                            <h1 className='font-bold font-custom text-3xl mr-5'>{currentFitnessPlan.title}</h1>
                            <Button isIconOnly className='bg-transparent' onPress={onOpen}>
                                <RiPencilFill size={22} />
                            </Button>
                        </CardHeader>
                        <CardBody className='-mt-2'>
                            <p className='font-medium text-gray-500 text-lg'>Flex up with FlexTime!</p>
                        </CardBody>
                        <CardFooter className='justify-end'>
                            <Button color="primary" variant='ghost' className='text-white'>Session Plans</Button>
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
                                    <ModalHeader className="flex flex-col gap-1">Update Fitness Plan</ModalHeader>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdate(e);
                                    }}>
                                        <ModalBody>
                                            <Input
                                                name='title'
                                                autoFocus
                                                label="Fitness Plan Name"
                                                variant='bordered'
                                                onChange={handleInputChange}
                                                value={updateInput.title}
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
    }

    return (
        <div>
            {renderFitnessPlan()}
        </div>
    )
}

export default FitnessPlan
