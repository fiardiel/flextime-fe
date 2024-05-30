'use client';

import Link from 'next/link';
import React from 'react'

const SessionPlansButton = () => {
  return (
    <div>
      <Link href='/sessionplans' className='btn btn-outline btn-accent'>
        Session Plans
      </Link>
    </div>
  )
}

export default SessionPlansButton
