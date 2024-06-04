import React, { FormEventHandler, useEffect } from 'react'
import { deleteCustomization, deleteSessionTraining, getCustomizationById, getTrainingById, updateCustomization } from '../../../../../api';
import { ISessionTraining } from '../../../../../types/SessionTraining';
import { ITraining } from '../../../../../types/Training';
import Modal from '@/app/components/Modal';
import { FaListUl, FaTrashAlt } from 'react-icons/fa';
import { CustomizationForm, ICustomization } from '../../../../../types/Customization';
import { RiEditBoxFill, RiLoopLeftFill } from 'react-icons/ri';
import { Button, TextInput } from 'flowbite-react';
import { MdOutlineTimer } from 'react-icons/md';

interface PickedTrainingProps {
    sessionTraining: ISessionTraining;
    onDelete: (id: number) => void | boolean;
    onUpdate: (id: number) => void | boolean;
}

const PickedTraining: React.FC<PickedTrainingProps> = ({ sessionTraining, onDelete, onUpdate }) => {

    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [updateModalOpen, setUpdateModalOpen] = React.useState<boolean>(false);
    const [training, setTraining] = React.useState<ITraining | null>(null);
    const [customization, setCustomization] = React.useState<ICustomization | null>(null);
    const [inputCustomization, setInputCustomization] = React.useState<CustomizationForm>({
        sets: 0,
        reps: 0,
        duration: 0
    });

    useEffect(() => {
        const fetchTraining = async () => {
            const fetchedTraining = await getTrainingById({id: sessionTraining.training});
            setTraining(fetchedTraining);
        };
    
        fetchTraining();
    }, [sessionTraining.id]);

    

    useEffect(() => {
        const fetchCustomization = async () => {
            const fetchedCustomization = await getCustomizationById({id: sessionTraining.customization});
            setCustomization(fetchedCustomization);
            setInputCustomization({
                sets: fetchedCustomization.sets,
                reps: fetchedCustomization.reps,
                duration: fetchedCustomization.duration
            });
        };

        fetchCustomization();
    }, [sessionTraining.id]);

    const handleDelete = async () => {
        setDeleteModalOpen(true);
    };

    const confirmDelete = async() => {
        await deleteSessionTraining({ id: sessionTraining.id })
        await deleteCustomization({ id: sessionTraining.customization })
        console.log(`Session training ${sessionTraining.id} deleted`);
        setDeleteModalOpen(false);
        onDelete(sessionTraining.id)
    };

    const deleteAction = (
        <Button outline onClick={confirmDelete} gradientMonochrome="failure">Delete</Button>
    );

    const handleUpdate = async() => {
        setUpdateModalOpen(true);
    }

    const handleSubmitCustomization: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const newCustomization: CustomizationForm = {
            sets: inputCustomization.sets || 0,
            reps: inputCustomization.reps || 0,
            duration: inputCustomization.duration || 0
        };

        try {
            const updatedCustomization = await updateCustomization({ id: sessionTraining.customization, customization: newCustomization});
            onUpdate(updatedCustomization.id);
            setCustomization(updatedCustomization)
            
            console.log('Customization updated successfully with ID:', updatedCustomization.id);
        } catch (err) {
            console.error('Error updating custom training:', err);
        }

        setUpdateModalOpen(false);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCustomization({ ...inputCustomization, [event.target.name]: event.target.value });
    }

    const submitForm = () => {
        const form = document.getElementById(`form-${customization?.id}`) as HTMLFormElement;
        if (form) {
            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
    };

    return (
        <div>
            <div className="hover:-translate-y-2 hover:scale-110 transition card bg-card-bg w-72 shadow-xl">
                <div className="card-body">
                    <div className='card-title -mb-1 font-mono font-extrabold'>
                        <span className='text-white'> {training?.title} </span>
                        <span className='text-gray-600 font-medium font-mono'>   #{sessionTraining.id} </span>
                    </div>
                    <p className='text-gray-500 text-md mb-4 flex'>
                        <span className='self-end mr-3'>Sets: {customization?.sets}, Reps: {customization?.reps}</span>
                        <span className=' bg-blue-300 px-2 py-1 rounded-lg text-blue-800 text-xs font-semibold self-center'>{customization?.duration}s</span>
                    </p>
                    <div className="card-actions justify-end">
                        <Button outline size='sm' onClick={handleUpdate} gradientDuoTone="purpleToBlue"><RiEditBoxFill size={17}/></Button>
                        <Button outline size='sm' onClick={handleDelete} gradientMonochrome="failure"><FaTrashAlt size={15}/></Button>
                    </div>
                </div>
            </div>
            <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} actions={deleteAction}> 
                <h3 className='text-lg font-mono font-medium'>Delete {training?.title} #{sessionTraining.id}?</h3>    
            </Modal>
            <Modal modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen} actions={<Button outline onClick={submitForm} gradientDuoTone="greenToBlue">Update</Button>}> 
                <h3 className='text-xl font-mono font-semibold'>Customize {training?.title} #{sessionTraining.id}?</h3>  
                <p className='mb-4 text-gray-500 font-sans font-normal'> {training?.description } </p>
                <form id={`form-${customization?.id}`} onSubmit={handleSubmitCustomization}>
                    <div className='mb-3'>
                        <TextInput name="sets" value={inputCustomization.sets} onChange={handleInputChange} type="number" placeholder="Sets" icon={() => <FaListUl size={15} color='gray' />} required shadow />
                    </div>
                    <div className='mb-3'>
                        <TextInput name='reps' value={inputCustomization.reps} onChange={handleInputChange} type="number" placeholder="Repetitions" icon={RiLoopLeftFill} required shadow />
                    </div>
                    <div className='mb-3'>
                        <TextInput name='duration' value={inputCustomization.duration} onChange={handleInputChange} type="number" placeholder="Duration (seconds)" icon={MdOutlineTimer} required shadow />
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default PickedTraining
