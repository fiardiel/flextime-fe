'use client';

import Link from 'next/link';
import React from 'react'

interface SessionPlansButtonProps {
  fitnessPlanId: number;
}

const SessionPlansButton: React.FC<SessionPlansButtonProps> = ({ fitnessPlanId }) => {
  return (
    <div>
      <Link href={`sessionplans/${fitnessPlanId}`} className='btn btn-sm btn-outline text-xs px-3 py-1 btn-accent'>
        Session Plans
      </Link>
    </div>
  )
}

export default SessionPlansButton
