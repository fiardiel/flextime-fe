'use client';

import React, { useState } from 'react'
import { ITraining } from '../../../../types/fitness_plan/Training';
import { ISessionTraining } from '../../../../types/fitness_plan/SessionTraining';
import AvailableTraining from './AvailableTraining';
import PickedTraining from './PickedTraining';

interface TrainingsProps {
    availableTrainings: ITraining[];
    initPickedTrainings: ISessionTraining[];
    trainingType: string;
}

const Trainings: React.FC<TrainingsProps> = ({ availableTrainings, initPickedTrainings, trainingType }) => {
    const [pickedTrainings, setPickedTrainings] = useState<ISessionTraining[]>(initPickedTrainings);

    const handleDeleteTraining = (id: number) => { 
        setPickedTrainings(prevPickedTrainings => prevPickedTrainings.filter(training => training.id !== id))
      }

    const handleAddTraining = (newTraining: ISessionTraining) => {
        console.log('handleAddTraining called with:', newTraining);
        setPickedTrainings(prevPickedTrainings => [...prevPickedTrainings, newTraining]);
    }

    return (
        <div>
            <h1 className='text-5xl font-bold font-custom mb-2 col-span-3 text-start px-10 mt-10 sm:max-w-16 lg:max-w-4xl'>your {trainingType} trainings:</h1>
            <div className='self-center font-sans'>
                <div className='grid lg:grid-cols-3 sm:grid-cols-1 content-start justify-items-start p-10 gap-9'>
                    {pickedTrainings.map(training => (
                        <PickedTraining key={training.id} sessionTraining={training} onDelete={handleDeleteTraining} onUpdate={() => null || true} />
                    ))}
                </div>
            </div>
            <h1 className='text-5xl font-bold font-custom mb-2 col-span-3 text-start px-10 mt-28 sm:max-w-16 lg:max-w-4xl'>available {trainingType} trainings:</h1>
            <div className='self-center font-sans'>
                <div className='grid lg:grid-cols-3 sm:grid-cols-1 content-center justify-items-start p-10 gap-9'>
                    {availableTrainings.map(training => (
                        <AvailableTraining key={training.id} training={training} onAdd={handleAddTraining} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Trainings
