'use client';

import React from 'react'
import { ISessionPlan } from '../../../../../types/SessionPlan'
import ViewTrainingsButton from './ViewTrainingsButton';
import Modal from '../../../components/Modal';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteSessionPlan } from '../../../../../api';
import { Button } from 'flowbite-react';

interface SessionPlanProps {
    sessionPlan: ISessionPlan;
    onDelete: (id: number) => void;
}

const SessionPlan: React.FC<SessionPlanProps> = ( { sessionPlan, onDelete } ) => {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);

    const handleDelete = async () => {
        setDeleteModalOpen(true);
    };

    const confirmDelete = async() => {
        await deleteSessionPlan({sessionPlanId: sessionPlan.id});
        console.log(`Session plan ${sessionPlan.id} deleted`);
        setDeleteModalOpen(false);
        onDelete(sessionPlan.id)
    };

    const deleteAction = (
        <Button outline gradientMonochrome={'failure'} onClick={confirmDelete}>
            Delete
        </Button>
    );

    return (
        <div>
            <div className="hover:-translate-y-2 hover:scale-110 transition card bg-card-bg w-72 shadow-xl">
                <div className="card-body">
                    <div className='card-title -mb-1 font-mono font-extrabold'>
                        <span className='text-white'> {sessionPlan.training_type} </span>
                        <span className='text-gray-600 font-medium'> #{sessionPlan.id} </span>
                    </div>
                    <p className='text-gray-400 text-sm mb-4'>Flex up with FlexTime!</p>
                    <div className="card-actions justify-end">
                        <ViewTrainingsButton sessionPlanId={sessionPlan.id}></ViewTrainingsButton>
                        <Button gradientMonochrome={'failure'} outline onClick={handleDelete}>
                            <FaTrashAlt size={17}/>
                        </Button>
                    </div>
                </div>
            </div>
            <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} actions={deleteAction}> 
                <h3 className='text-lg font-mono font-medium'>Delete Session Plan #{sessionPlan.id}?</h3>    
            </Modal>
        </div>
    )
}

export default SessionPlan
