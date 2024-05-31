'use client';

import Link from 'next/link';
import React from 'react'

interface SessionPlansButtonProps {
  fitnessPlanId: number;
}

interface SessionPlan {
  id: number;
  trainingType: string;
  fitnessPlan: string;
  trainings: number[];
}

const SessionPlansButton: React.FC<SessionPlansButtonProps> = ({ fitnessPlanId }) => {
  return (
    <div>
      <Link href={`sessionplans/${fitnessPlanId}`} className='btn btn-outline btn-accent'>
        Session Plans
      </Link>
    </div>
  )
}

export default SessionPlansButton
