'use client';

import React, { useEffect } from 'react'
import { ISessionPlan } from '../../../../../types/fitness_plan/SessionPlan'
import Modal from '../../../components/Modal';
import { deleteSessionPlan, getTotalDuration, getTrainingCountBySessionPlan } from '../../../../../apis/fitness_plan_apis';
import { Button } from 'flowbite-react';
import { PiBarbellFill } from 'react-icons/pi';
import { TbTrashFilled } from 'react-icons/tb';
import Link from 'next/link';

interface SessionPlanProps {
    sessionPlan: ISessionPlan;
    onDelete: (id: number) => void;
}

const SessionPlan: React.FC<SessionPlanProps> = ({ sessionPlan, onDelete }) => {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [totalDuration, setTotalDuration] = React.useState<string | null>(null);
    const [trainingCount, setTrainingCount] = React.useState<number | null>(null);

    const handleDelete = async () => {
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        await deleteSessionPlan({ sessionPlanId: sessionPlan.id });
        console.log(`Session plan ${sessionPlan.id} deleted`);
        setDeleteModalOpen(false);
        onDelete(sessionPlan.id)
    };

    const deleteAction = (
        <div className='items-center'>
            <Button outline gradientMonochrome={'failure'} onClick={confirmDelete}>
                Delete
            </Button>
        </div>
    );

    useEffect(() => {
        const fetchTotalDuration = async () => {
            const fetchedDuration = await getTotalDuration({ sessionPlanId: sessionPlan.id });
            const minutes = Math.floor(fetchedDuration.total_duration / 60);
            const seconds = fetchedDuration.total_duration % 60;
            const formattedDuration = `${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
            setTotalDuration(formattedDuration);
        }
        fetchTotalDuration();
    }, [sessionPlan.id]);

    useEffect(() => {
        const fetchTrainingCount = async () => {
            const fetchedCount = await getTrainingCountBySessionPlan({ sessionPlanId: sessionPlan.id });
            setTrainingCount(fetchedCount);
        }
        fetchTrainingCount();
    }, [sessionPlan.id])

    return (
        <div>
            <div className="hover:-translate-y-2 hover:scale-110 transition card bg-card-bg w-72 shadow-xl">
                <div className="card-body">
                    <div className='card-title -mb-1 font-mono font-extrabold'>
                        <span className='text-white'> {sessionPlan.training_type} </span>
                        <span className='text-gray-600 font-medium'> #{sessionPlan.id} </span>
                    </div>
                    <p className='text-gray-400 text-sm'> {trainingCount} training(s) added </p>
                    <p className='text-blue-800 text-xs px-2 py-1 bg-blue-300 text-center rounded-lg self-start font-semibold mb-4'> {totalDuration || 0} </p>
                    <div className="card-actions justify-end">
                        <div>
                            <Link href={`/session-training/${sessionPlan.id}`}>
                                <Button outline gradientDuoTone={'purpleToBlue'}> <PiBarbellFill size={20} /> </Button>
                            </Link>
                        </div>
                        <Button gradientMonochrome={'failure'} outline onClick={handleDelete}>
                            <TbTrashFilled size={20} />
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
