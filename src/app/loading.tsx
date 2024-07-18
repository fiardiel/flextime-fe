import { Spinner } from '@nextui-org/spinner'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-black opacity-25'>
      <Spinner/>
    </div>
  )
}

export default Loading
