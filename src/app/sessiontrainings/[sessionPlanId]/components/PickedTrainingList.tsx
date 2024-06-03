'use client';

import React, { useState } from 'react'
import { ISessionTraining } from '../../../../../types/SessionTraining'
import PickedTraining from './PickedTraining';

interface PickedTrainingProps {
    initPickedTrainings: ISessionTraining[];
}

const PickedTrainingList: React.FC<PickedTrainingProps> = ( {initPickedTrainings} ) => {
  const [pickedTrainings, setPickedTrainings] = useState<ISessionTraining[]>(initPickedTrainings);
  
  const handleDeleteTraining = (id: number) => { 
    setPickedTrainings(prevPickedTrainings => prevPickedTrainings.filter(training => training.id !== id))
  }

  return (
    <div> 
      <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-9'>
          {pickedTrainings.map(training => (
            <PickedTraining key={training.id} sessionTraining={training} onDelete={handleDeleteTraining} />
          ))}
      </div>
    </div>
  )
}

export default PickedTrainingList
