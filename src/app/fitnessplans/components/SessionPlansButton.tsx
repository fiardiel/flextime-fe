'use client';

import { Button } from 'flowbite-react';
import Link from 'next/link';
import React from 'react'
import { FaClock } from "react-icons/fa";

interface SessionPlansButtonProps {
  fitnessPlanId: number;
}

const SessionPlansButton: React.FC<SessionPlansButtonProps> = ({ fitnessPlanId }) => {
  return (
    <div>
      <a href={`sessionplans/${fitnessPlanId}`}>
        <Button outline gradientDuoTone={'pinkToOrange'} className='flex items-center'>
          <span className='mr-2'> Session Plans </span>
          <span className='self-center'> <FaClock /> </span>
        </Button>
      </a>
    </div>
  )
}

export default SessionPlansButton
