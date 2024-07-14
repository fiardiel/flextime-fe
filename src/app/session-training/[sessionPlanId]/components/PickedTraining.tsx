import React, { FormEventHandler, useEffect } from 'react'
import { deleteCustomization, getCustomizationById, getTrainingById, updateCustomization } from '../../../../apis/fitness_plan_apis';
import { ISessionTraining } from '../../../../types/fitness_plan/SessionTraining';
import { ITraining } from '../../../../types/fitness_plan/Training';
import { FaListUl } from 'react-icons/fa';
import { CustomizationForm, ICustomization } from '../../../../types/fitness_plan/Customization';
import { RiEditBoxFill, RiLoopLeftFill } from 'react-icons/ri';
import { MdOutlineTimer } from 'react-icons/md';
import { TbTrashFilled } from 'react-icons/tb';
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import Cookies from 'js-cookie';

interface PickedTrainingProps {
    sessionTraining: ISessionTraining;
    onDelete: (id: number) => void | boolean;
    onUpdate: (id: number) => void | boolean;
}

const PickedTraining: React.FC<PickedTrainingProps> = ({ sessionTraining, onDelete, onUpdate }) => {
    const token = Cookies.get('userToken');
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange, onClose: onDeleteClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange, onClose: onEditClose } = useDisclosure();
    const [training, setTraining] = React.useState<ITraining | null>(null);
    const [customization, setCustomization] = React.useState<ICustomization | null>(null);
    const [inputCustomization, setInputCustomization] = React.useState<CustomizationForm>({
        sets: 0,
        reps: 0,
        duration: 0
    });

    useEffect(() => {
        const fetchTraining = async () => {
            const fetchedTraining = await getTrainingById(sessionTraining.training, token);
            setTraining(fetchedTraining);
        };

        fetchTraining();
    }, [sessionTraining.id, sessionTraining.training]);


    useEffect(() => {
        const fetchCustomization = async () => {
            const fetchedCustomization = await getCustomizationById(sessionTraining.customization, token);
            setCustomization(fetchedCustomization);
            setInputCustomization({
                sets: fetchedCustomization.sets,
                reps: fetchedCustomization.reps,
                duration: fetchedCustomization.duration
            });
        };

        fetchCustomization();
    }, [sessionTraining.id, sessionTraining.customization]);


    const confirmDelete = async () => {
        await deleteCustomization(sessionTraining.customization, token)
        onDelete(sessionTraining.id)
        onDeleteClose()
    };

    const handleSubmitCustomization: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const newCustomization: CustomizationForm = {
            sets: inputCustomization.sets || 0,
            reps: inputCustomization.reps || 0,
            duration: inputCustomization.duration || 0
        };

        try {
            const updatedCustomization = await updateCustomization(sessionTraining.customization, newCustomization, token);
            onUpdate(updatedCustomization.id);
            setCustomization(updatedCustomization)

            console.log('Customization updated successfully with ID:', updatedCustomization.id);
        } catch (err) {
            console.error('Error updating custom training:', err);
        }

        onEditClose()
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCustomization({ ...inputCustomization, [event.target.name]: event.target.value });
    }

    const handleCloseEditModal = () => {
        onEditClose();
        setInputCustomization({
            sets: customization?.sets || 0,
            reps: customization?.reps || 0,
            duration: customization?.duration || 0
        });
    }

    return (
        <div>
            <Card className='p-5 w-72 h-60 hover:-translate-y-2 hover:scale-110 transition'>
                <CardHeader>
                    <p className='font-bold font-custom text-3xl mr-5'>
                        <span>{training?.title}</span>
                        <span className='text-gray-600 font-medium'> #{sessionTraining.id} </span>
                    </p>
                </CardHeader>
                <CardBody className='py-0'>
                    <p className='text-gray-500 text-md h-12 overflow-scroll'>
                        <span>Sets: {customization?.sets}, Reps: {customization?.reps}</span>
                        <span className=' bg-blue-300 px-2 py-1 rounded-lg text-blue-800 text-xs font-semibold self-center ml-3'>{customization?.duration}s</span>
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
                            <ModalHeader className="flex flex-col gap-1">Delete Session Training</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                confirmDelete();
                            }}>
                                <ModalBody>
                                    Are you sure you want to remove this training?
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
                            <ModalHeader className="flex flex-col gap-1">Customize {training?.title} #{ sessionTraining.id }</ModalHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmitCustomization(e);
                            }}>
                                <ModalBody>
                                    <Input
                                        name='sets'
                                        type='number'
                                        autoFocus
                                        label="Sets"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={inputCustomization.sets.toString()}
                                        startContent={<FaListUl />}
                                    />
                                    <Input
                                        name='reps'
                                        autoFocus
                                        label="Reps"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        value={inputCustomization.reps.toString()}
                                        startContent={<RiLoopLeftFill />}
                                    />
                                    <Input
                                        name='duration'
                                        autoFocus
                                        label="Duration (in seconds)"
                                        variant='bordered'
                                        onChange={handleInputChange}
                                        type='number'
                                        value={inputCustomization.duration.toString()}
                                        startContent={<MdOutlineTimer />}
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

export default PickedTraining
