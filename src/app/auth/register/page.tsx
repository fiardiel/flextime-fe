import {Card, CardBody, CardHeader } from '@nextui-org/react'
import React from 'react'
import RegisterForm from './RegisterForm'

const page = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='flex font-sans my-10 mx-16 -translate-y-10 w-full justify-center'>
        <Card className='p-4 max-w-lg w-full'>
          <CardHeader className='flex justify-center'>
            <h3 className='text-3xl font-custom font-bold mb-2'>
              Register
            </h3>
          </CardHeader>
          <CardBody>
            <RegisterForm></RegisterForm>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default page
