import React, { useEffect } from 'react'
import { deleteSessionTraining, getCustomizationById, getTrainingById } from '../../../../../api';
import { ISessionTraining } from '../../../../../types/SessionTraining';
import { ITraining } from '../../../../../types/Training';
import Modal from '@/app/components/Modal';
import { FaTrashAlt } from 'react-icons/fa';
import { ICustomization } from '../../../../../types/Customization';
import Link from 'next/link';
import { RiEditBoxFill } from 'react-icons/ri';

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
        <button onClick={confirmDelete} className='btn btn-error btn-outline text-white hover:text-white'>
            Delete
        </button>
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
                        <Link href={`/customization`} className='btn btn-outline btn-info btn-sm px-2 py-1'>
                            <RiEditBoxFill size={17}/>
                        </Link>
                        <button onClick={handleDelete} className='btn btn-outline btn-error btn-sm px-2 py-1'>
                            <FaTrashAlt size={15}/>
                        </button>
                    </div>
                </div>
            </div>
            <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} actions={deleteAction}> 
                <h3 className='text-lg font-mono font-medium'>Delete Session Training #{sessionTraining.id}?</h3>    
            </Modal>
        </div>
    )
}

export default PickedTraining
