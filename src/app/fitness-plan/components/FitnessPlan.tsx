'use client'

import React, { FormEventHandler, useState } from 'react'
import {updateFitnessPlanById } from '../../../apis/fitness_plan_apis'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { FitnessPlanForm, IFitnessPlan } from '../../../types/fitness_plan/FitnessPlan';
import { Button } from '@nextui-org/button';
import { RiPencilFill } from 'react-icons/ri';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Input, Link } from '@nextui-org/react';
import Cookies from 'js-cookie'
import { getUser } from '../../../apis/user_apis';

interface FitnessPlanProps {
    initFitnessPlan: IFitnessPlan
}

const FitnessPlan: React.FC<FitnessPlanProps> = ({ initFitnessPlan }) => {
    const token = Cookies.get('userToken')
    const [fitnessPlan, setFitnessPlan] =  useState(initFitnessPlan)
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [updateInput, setUpdateInput] = React.useState<string>(fitnessPlan.title);

    const handleUpdate: FormEventHandler = async (e) => {
        e.preventDefault();

        const newFitnessPlan: FitnessPlanForm = {
            title: updateInput,
            user: await getUser(token)
        };

        try {
            const updatedFitnessPlan = await updateFitnessPlanById({ id: fitnessPlan.id, fitnessPlan: newFitnessPlan, token: token});
            setFitnessPlan(updatedFitnessPlan);
            console.log('Fitness plan updated successfully:', updatedFitnessPlan.id);
        } catch (err) {
            console.error('Error updating fitness plan:', err);
        }
        onClose()
    }

    return (
        <div>
            <Card className='p-5 w-80 h-60 scale-110 transition hover:-translate-y-1 hover:scale-125'>
                <CardHeader>
                    <p className='font-bold font-custom text-3xl mr-5 overflow-scroll max-h-[75px] items-end'>{fitnessPlan.title}</p>
                    <Button isIconOnly className='bg-transparent self-end' onPress={onOpen}>
                        <RiPencilFill size={22} />
                    </Button>
                </CardHeader>
                <CardBody className='-mt-2 overflow-hidden'>
                    <p className='font-medium text-gray-500 text-lg'>Flex up with FlexTime!</p>
                </CardBody>
                <CardFooter className='justify-end'>
                    <Link href={`/fitness-plan/${fitnessPlan.id}/session-plan`}>
                        <Button color="primary" variant='ghost' className='text-white'>Session Plans</Button>
                    </Link>
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
                            <ModalHeader className="flex flex-col gap-1">Rename Fitness Plan</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(e);
                            }}>
                                <ModalBody>
                                    <Input
                                        name='title'
                                        autoFocus
                                        label="Title"
                                        variant='bordered'
                                        onChange={(e) => setUpdateInput(e.target.value)}
                                        value={updateInput}
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

export default FitnessPlan
