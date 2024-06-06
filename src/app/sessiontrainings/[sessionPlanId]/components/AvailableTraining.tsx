'use client';

import { useParams } from 'next/navigation';
import { ITraining } from '../../../../../types/Training';
import Modal from '@/app/components/Modal';
import React, { FormEventHandler } from 'react';
import { HiPlus } from 'react-icons/hi';
import { MdOutlineTimer } from 'react-icons/md';
import { addCustomization, addSessionTraining } from '../../../../../api';
import { Button, TextInput } from "flowbite-react";
import { FaListUl } from 'react-icons/fa';
import { RiLoopLeftFill } from 'react-icons/ri';
import { ISessionTraining } from '../../../../../types/SessionTraining';

interface AvailableTrainingProps {
    training: ITraining;
    onAdd: (newTraining: ISessionTraining) => void;
}

const AvailableTraining: React.FC<AvailableTrainingProps> = ({ training, onAdd }) => {
    const { sessionPlanId } = useParams()

    const [addModalOpen, setAddModalOpen] = React.useState<boolean>(false);

    const handleSubmitCustomization: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const newCustomization = {
            sets: parseInt(customization.set),
            reps: parseInt(customization.repetition),
            duration: parseInt(customization.duration)
        };

        try {
            const createdCustomization = await addCustomization(newCustomization);
            const createdSessionTraining = await addSessionTraining({
                training: training.id,
                customization: createdCustomization.id,
                session_plan: parseInt(sessionPlanId as unknown as string)
            });
            onAdd(createdSessionTraining);
            
            console.log('Customization added successfully with ID:', createdCustomization.id,
                '\nSession Training added successfully with ID:', createdSessionTraining.id,
            );
        } catch (err) {
            console.error('Error creating custom training:', err);
        }

        setCustomization({
            set: '',
            repetition: '',
            duration: ''
        });

        setAddModalOpen(false);
    }

    const [customization, setCustomization] = React.useState({
        set: '',
        repetition: '',
        duration: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomization({ ...customization, [event.target.name]: event.target.value });
    };

    const submitForm = () => {
        const form = document.getElementById(`form-${training.id}`) as HTMLFormElement;
        if (form) {
            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
    };

    return (
        <div>
            <div className="hover:-translate-y-2 hover:scale-110 transition card bg-card-bg w-72 shadow-xl">
                <div className="card-body">
                    <div className='card-title -mb-1 font-mono font-extrabold'>
                        <span className='text-white'> {training.title} </span>
                    </div>
                    <p className='text-gray-500 text-md h-12 overflow-scroll'>
                        {training.description}
                    </p>
                    <div className="card-actions justify-end">
                        <Button outline pill gradientDuoTone="purpleToBlue" onClick={() => setAddModalOpen(true)}>  <HiPlus size={20} /> </Button>
                    </div>
                </div>
            </div>
            <Modal 
                modalOpen={addModalOpen} 
                setModalOpen={setAddModalOpen} 
                actions={
                    <Button onClick={submitForm} outline gradientDuoTone="purpleToBlue">
                        <span className='self-center'> Submit </span>
                    </Button>
            }>
                <h3 className='text-lg font-mono font-semibold mb-4'>Customize {training.title}</h3>
                <form id={`form-${training.id}`} onSubmit={handleSubmitCustomization}>
                    <div className='mb-3'>
                        <TextInput name="set" value={customization.set} onChange={handleInputChange} type="number" placeholder="Sets" icon={() => <FaListUl size={15} color='gray' />} required shadow />
                    </div>
                    <div className='mb-3'>
                        <TextInput name='repetition' value={customization.repetition} onChange={handleInputChange} type="number" placeholder="Repetitions" icon={RiLoopLeftFill} required shadow />
                    </div>
                    <div className='mb-3'>
                        <TextInput name='duration' value={customization.duration} onChange={handleInputChange} type="number" placeholder="Duration (seconds)" icon={MdOutlineTimer} required shadow />
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AvailableTraining
