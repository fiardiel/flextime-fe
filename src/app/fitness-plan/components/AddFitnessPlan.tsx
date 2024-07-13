'use client'

import React, { FormEventHandler } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { IoIosAdd } from 'react-icons/io';
import { FitnessPlanForm, IFitnessPlan } from '../../../types/fitness_plan/FitnessPlan';
import { addFitnessPlan } from '../../../apis/fitness_plan_apis';
import Cookies from 'js-cookie'
import { getUser } from '../../../apis/user_apis';


const AddFitnessPlan = () => {
    const token = Cookies.get('userToken') ?? '';
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [addInput, setAddInput] = React.useState<string>('')

    const handleAdd: FormEventHandler = async (e) => {
        e.preventDefault();

        const newFitnessPlan: FitnessPlanForm = {
            title: addInput,
            user: await getUser(token)
        };

        try {
            const createdFitnessPlan = await addFitnessPlan(newFitnessPlan, token);
            console.log('Fitness Plan added successfully with ID:', createdFitnessPlan.id);
        } catch (err) {
            console.error('Error creating fitness plan:', err);
        }
        onClose()
    }

    return (
        <div>
            <h3 className='text-5xl font-bold font-custom mb-5 w-full'>Want to flex up with FlexTime?</h3>
            <Button onPress={onOpen} color="secondary" variant='ghost' endContent={<IoIosAdd size={20} />}>Add Fitness Plan</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1">Create Fitness Plan</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleAdd(e);
                            }}>
                                <ModalBody>
                                    <Input
                                        name='title'
                                        autoFocus
                                        label="Fitness Plan Name"
                                        variant='bordered'
                                        onChange={(e) => setAddInput(e.target.value)}
                                        value={addInput}
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

export default AddFitnessPlan
