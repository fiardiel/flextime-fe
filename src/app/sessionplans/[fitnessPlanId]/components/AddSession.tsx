'use client';

import Modal from '@/app/components/Modal';
import { Button } from 'flowbite-react'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { addSessionPlan } from '../../../../../api';
import { useParams, useRouter } from 'next/navigation';
import { ISessionPlan } from '../../../../../types/SessionPlan';

interface AddSessionProps {
    onAdd: (newSessionPlan: ISessionPlan) => void;        
}

const AddSession: React.FC<AddSessionProps> = ({ onAdd }) => {
    const router = useRouter()

    const { fitnessPlanId } = useParams();

    const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);

    const openAddModalHandler = () => {
        setOpenAddModal(true);
    }

    const handleSubmit = async (trainingType: string) => { 
        const sessionPlan = await addSessionPlan({
            training_type: trainingType,
            fitness_plan: parseInt(fitnessPlanId as unknown as string) 
        })
        console.log('Session Plan added successfully with ID: ', sessionPlan.id);
        onAdd(sessionPlan);
        setOpenAddModal(false);
        router.push(`/sessiontrainings/${sessionPlan.id}`)
    }

    return (
        <div className='flex justify-center mt-4 col-span-3'>
            <Button onClick={openAddModalHandler} outline gradientDuoTone={'cyanToBlue'}>
                <span>Add Session </span>
                <FaPlus className='self-center ml-2'></FaPlus>
            </Button>
            <Modal modalOpen={openAddModal} setModalOpen={setOpenAddModal}>
                <h3 className='font-mono font-bold text-center mb-5 mt-3'>Select Training Type</h3>
                <div className='flex flex-row justify-center'>
                    <Button onClick={() => handleSubmit('HIIT')} size={'xl'} className='mx-2 mb-3' outline gradientDuoTone={'purpleToPink'}>
                        HIIT
                    </Button>
                    <Button onClick={() => handleSubmit('Strength')} size={'xl'} className='mx-2 mb-3' outline gradientDuoTone={'purpleToPink'}>
                        Strength
                    </Button>   
                    <Button onClick={() => handleSubmit('Cardio')} size={'xl'} className='mx-2 mb-3' outline gradientDuoTone={'purpleToPink'}>
                        Cardio
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default AddSession
