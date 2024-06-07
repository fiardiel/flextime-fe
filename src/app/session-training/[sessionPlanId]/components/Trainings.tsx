'use client';

import React, { useState } from 'react'
import { ITraining } from '../../../../../types/fitness_plan/Training';
import { ISessionTraining } from '../../../../../types/fitness_plan/SessionTraining';
import AvailableTraining from './AvailableTraining';
import PickedTraining from './PickedTraining';

interface TrainingsProps {
    availableTrainings: ITraining[];
    initPickedTrainings: ISessionTraining[];
}
``

const Trainings: React.FC<TrainingsProps> = ({ availableTrainings, initPickedTrainings }) => {
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
            <h1 className='text-5xl font-bold font-mono mb-2 col-span-3 text-start px-52 mt-28'>your session trainings:</h1>
            <div className='self-center font-sans'>
                <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-9'>
                    {pickedTrainings.map(training => (
                        <PickedTraining key={training.id} sessionTraining={training} onDelete={handleDeleteTraining} onUpdate={() => null || true} />
                    ))}
                </div>
            </div>
            <h1 className='text-5xl font-bold font-mono mb-2 col-span-3 text-start px-52 mt-28'>available trainings:</h1>
            <div className='self-center font-sans'>
                <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-9'>
                    {availableTrainings.map(training => (
                        <AvailableTraining key={training.id} training={training} onAdd={handleAddTraining} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Trainings
