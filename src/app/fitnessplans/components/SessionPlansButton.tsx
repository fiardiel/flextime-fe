'use client';

import Link from 'next/link';
import React from 'react'
import { FaCalendar } from "react-icons/fa";

interface SessionPlansButtonProps {
  fitnessPlanId: number;
}

const SessionPlansButton: React.FC<SessionPlansButtonProps> = ({ fitnessPlanId }) => {
  return (
    <div>
      <Link href={`sessionplans/${fitnessPlanId}`} className='btn btn-sm text-xs px-3 py-1 btn-accent'>
        Session Plans<FaCalendar/>
      </Link>
    </div>
  )
}

export default SessionPlansButton
