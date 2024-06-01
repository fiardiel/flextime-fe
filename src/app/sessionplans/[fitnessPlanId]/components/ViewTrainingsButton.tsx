'use client';

import Link from 'next/link';
import React from 'react'
import { PiBarbellFill } from 'react-icons/pi';

type ViewTrainingsButtonProps = {
  sessionPlanId: number;
}

const ViewTrainingsButton: React.FC<ViewTrainingsButtonProps> = ({ sessionPlanId }) => {
  return (
    <div>
      <Link href={`/trainings/${sessionPlanId}`} className='btn btn-outline btn-sm px-2 py-1 btn-info'>
        <PiBarbellFill size={20}/>
      </Link>
    </div>
  )
}

export default ViewTrainingsButton
