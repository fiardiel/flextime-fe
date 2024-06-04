'use client';

import { Button } from 'flowbite-react';
import React from 'react'
import { PiBarbellFill } from 'react-icons/pi';

type ViewTrainingsButtonProps = {
  sessionPlanId: number;
}

const ViewTrainingsButton: React.FC<ViewTrainingsButtonProps> = ({ sessionPlanId }) => {
  return (
    <div>
      <a href={`/sessiontrainings/${sessionPlanId}`}>
        <Button outline gradientDuoTone={'purpleToBlue'}> <PiBarbellFill size={20} /> </Button>
      </a>
    </div>
  )
}

export default ViewTrainingsButton
