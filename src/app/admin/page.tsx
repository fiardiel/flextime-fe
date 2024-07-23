import { cookies } from 'next/headers'
import React from 'react'
import TrainingTable from './TrainingTable'
import { fetchTrainings } from '@/apis/admin_apis'
import { Button, Input } from '@nextui-org/react'
import { FiSearch } from 'react-icons/fi'
import { IoIosAdd } from 'react-icons/io'

const Page = async () => {
    const trainings = await fetchTrainings(cookies().get('userToken')?.value)
    console.log('trainings', trainings)
    return (
        <div className='m-16 flex flex-col'>
            <h3 className='font-custom font-bold text-3xl'> Manage Training </h3>
            <TrainingTable trainings={trainings}></TrainingTable>
        </div>
    )
}

export default Page