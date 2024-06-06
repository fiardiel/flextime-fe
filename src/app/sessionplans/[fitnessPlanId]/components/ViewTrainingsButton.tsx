'use client';

import { Button } from 'flowbite-react';
import Link from 'next/link';
import React from 'react'
import { PiBarbellFill } from 'react-icons/pi';

type ViewTrainingsButtonProps = {
  sessionPlanId: number;
}

const ViewTrainingsButton: React.FC<ViewTrainingsButtonProps> = ({ sessionPlanId }) => {
  return (
    <div>
      <Link href={`/sessiontrainings/${sessionPlanId}`}>
        <Button outline gradientDuoTone={'purpleToBlue'}> <PiBarbellFill size={20} /> </Button>
      </Link>
    </div>
  )
}

export default ViewTrainingsButton
