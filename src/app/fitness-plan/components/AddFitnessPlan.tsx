'use client'

import React, { FormEventHandler } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea } from "@nextui-org/react";
import { IoIosAdd } from 'react-icons/io';
import { FitnessPlanForm, IFitnessPlan } from '../../../../types/fitness_plan/FitnessPlan';
import { addFitnessPlan } from '../../../../apis/fitness_plan_apis';

interface AddFitnessPlanProps {
    onAdd: (fitnessPlan: IFitnessPlan) => void
}

const AddFitnessPlan: React.FC<AddFitnessPlanProps> = ({ onAdd }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [addInput, setAddInput] = React.useState<FitnessPlanForm>({
        title: '',
        user: '1',
    });
    const handleInputChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
        setAddInput({ ...addInput, [event.target.name]: event.target.value });
    }

    const handleAdd: FormEventHandler = async (e) => {
        e.preventDefault();

        const newFitnessPlan: FitnessPlanForm = {
            title: addInput.title,
            user: addInput.user,
        };

        try {
            const createdFitnessPlan = await addFitnessPlan(newFitnessPlan);
            onAdd(createdFitnessPlan);
            console.log('Fitness Plan added successfully with ID:', createdFitnessPlan.id);
        } catch (err) {
            console.error('Error creating fitness plan:', err);
        }
        onClose()
    }

    return (
        <div>
            <h3 className='text-5xl font-bold font-custom mb-5 w-full'>Want to flex up with FlexTime?</h3>
            <Button onPress={onOpen} color="secondary" variant='flat' endContent={<IoIosAdd size={20} />}>Add Fitness Plan</Button>
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
                                        onChange={handleInputChange}
                                        value={addInput.title}
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
