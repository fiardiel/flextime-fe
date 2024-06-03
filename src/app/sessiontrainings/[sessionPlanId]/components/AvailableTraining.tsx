'use client';

import { ITraining } from '../../../../../types/Training';
import Modal from '@/app/components/Modal';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import { IoIosAdd } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';

interface AvailableTrainingProps {
    training: ITraining;
}

const AvailableTraining: React.FC<AvailableTrainingProps> = ({ training }) => {

    const [addModalOpen, setAddModalOpen] = React.useState<boolean>(false);

    return (
        <div>
            <div className="hover:-translate-y-2 hover:scale-110 transition card bg-card-bg w-72 shadow-xl">
                <div className="card-body">
                    <div className='card-title -mb-1 font-mono font-extrabold'>
                        <span className='text-white'> {training.title} </span>
                        <span className='text-gray-600 font-medium font-mono'>  #{training.id} </span>
                    </div>
                    <p className='text-gray-500 text-md h-12 overflow-scroll'>
                        {training.description}
                    </p>
                    <div className="card-actions justify-end">
                        <button onClick={() => null} className='btn btn-sm btn-outline btn-circle btn-secondary'>
                            <HiPlus size={20}/>
                        </button>
                    </div>
                </div>
            </div>
            <Modal modalOpen={addModalOpen} setModalOpen={setAddModalOpen}> 
            </Modal>
        </div>
    )
}

export default AvailableTraining
