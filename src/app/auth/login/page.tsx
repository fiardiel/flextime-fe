import {Card, CardBody, CardHeader } from '@nextui-org/react'
import React from 'react'
import LoginForm from './LoginForm'

const page = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='flex font-sans my-10 mx-16 w-full justify-center'>
        <Card className='p-4 w-full max-w-lg'>
          <CardHeader className='flex justify-center'>
            <h3 className='text-3xl font-extrabold text-center font-custom mb-2'>
              Login
            </h3>
          </CardHeader>
          <CardBody>
            <LoginForm></LoginForm>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default page

// http only yes, secure, samesite strict, 
