import React, { useEffect } from 'react'
import { deleteSessionTraining, getCustomizationById, getTrainingById } from '../../../../../api';
import { ISessionTraining } from '../../../../../types/SessionTraining';
import { ITraining } from '../../../../../types/Training';
import Modal from '@/app/components/Modal';
import { FaTrashAlt } from 'react-icons/fa';
import { ICustomization } from '../../../../../types/Customization';
import Link from 'next/link';
import { RiEditBoxFill } from 'react-icons/ri';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';

interface PickedTrainingProps {
    sessionTraining: ISessionTraining;
    onDelete: (id: number) => void | boolean;
}

const PickedTraining: React.FC<PickedTrainingProps> = ({ sessionTraining, onDelete }) => {

    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [updateModalOpen, setUpdateModalOpen] = React.useState<boolean>(false);
    const [training, setTraining] = React.useState<ITraining | null>(null);
    const [customization, setCustomization] = React.useState<ICustomization | null>(null);

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
        };
    
        fetchCustomization();
    }, [sessionTraining.id]);

    const handleDelete = async () => {
        setDeleteModalOpen(true);
    };

    const confirmDelete = async() => {
        await deleteSessionTraining({id: sessionTraining.id})
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

    const updateAction = (
        <Button outline onClick={confirmDelete} gradientMonochrome="failure">Delete</Button>
    );

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
                <h3 className='text-lg font-mono font-medium'>Delete Session Training #{sessionTraining.id}?</h3>    
            </Modal>
            <Modal modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen} actions={updateAction}> 
                <h3 className='text-lg font-mono font-medium'>Customize #{sessionTraining.id}?</h3>    
            </Modal>
        </div>
    )
}

export default PickedTraining
