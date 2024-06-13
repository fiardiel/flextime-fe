import { getLocalTimeZone, today } from '@internationalized/date'
import { Button } from '@nextui-org/button'
import React from 'react'
import { IoIosAdd } from 'react-icons/io'

const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
]

const page = () => {
    const localDate = today(getLocalTimeZone())
    const todayMonth = months.find(month => month.value === localDate.month)?.label

    return (
        <div className='flex flex-col m-10'>
            <div className='flex flex-row mb-8'>
                <h3 className='font-custom text-3xl font-bold mr-4'>
                    {todayMonth}
                </h3>
                <Button className='self-start' radius='full' color='primary' variant='flat' endContent={<IoIosAdd/>}> Add Session </Button>
            </div>
            <div className='sm:grid md:grid-cols-7 sm:grid-cols-1'>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="relative flex justify-between font-sans font-bold text-xl mr-10 pb-2">
                        <span className='font-medium self-end'>01.06</span>
                        <span className="text-white text-2xl opacity-30 self-end font-extrabold">{day}</span>
                        <span className="block w-full h-1 bg-white opacity-15 rounded-full absolute bottom-0"></span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page
