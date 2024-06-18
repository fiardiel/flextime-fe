import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { Button } from '@nextui-org/button'
import React from 'react'
import { IoIosAdd } from 'react-icons/io'
import { format } from 'date-fns'
import { Card, CardBody } from '@nextui-org/react'

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

const days = [
    { value: 1, label: 'Mon' },
    { value: 2, label: 'Tue' },
    { value: 3, label: 'Wed' },
    { value: 4, label: 'Thu' },
    { value: 5, label: 'Fri' },
    { value: 6, label: 'Sat' },
    { value: 0, label: 'Sun' },
]

const page = () => {
    const thisDay = today(getLocalTimeZone())
    const todayMonth = months.find(month => month.value === thisDay.month)?.label

    const getDayName = (date: CalendarDate) => {
        const dateObj = date.toDate(getLocalTimeZone())
        return format(dateObj, 'EEE')
    }

    const getMonday = (date: CalendarDate) => {
        const day = thisDay.toDate(getLocalTimeZone()).getDay()
        const diff = day - (day === 0 ? -6 : 1)
        return date.subtract({ days: diff })
    }

    const getWeekDates = (date: CalendarDate) => {
        const weekDates = []
        const monday = getMonday(date)
        weekDates.push(monday)
        for (let i = 1; i < 7; i++) {
            const nextDate = monday.add({ days: i })
            weekDates.push(nextDate)
        }
        return weekDates
    }

    const weekDates = getWeekDates(thisDay)

    return (
        <div className='flex flex-col m-10'>
            <div className='flex flex-row mb-8 ml-5'>
                <h3 className='font-custom text-3xl font-bold mr-4'>
                    {todayMonth}
                </h3>
                <Button className='self-start' radius='full' color='primary' variant='flat' endContent={<IoIosAdd />}> Add Session </Button>
            </div>
            <div className='flex flex-wrap ml-5'>
                {weekDates.map(day => (
                    <>
                        <div className='flex flex-row w-full md:max-w-48 mr-6' key={day.toString()}>
                            <div className='flex flex-col w-full mb-8 md:max-w-48'>
                                <div className="relative flex justify-between font-sans font-bold text-xl pb-2">
                                    <span className={`text-white text-2xl self-end font-extrabold ${today(getLocalTimeZone()).toString() === day.toString() ? 'opactiy-100' : 'opacity-30'}`}> {getDayName(day)} </span>
                                    <span className={`self-end ${today(getLocalTimeZone()).toString() === day.toString() ? 'text-primary font-bold' : 'text-white font-medium opacity-30'}`}> {day.day}/{day.month} </span>
                                    <span className={`block w-full h-1 bg-white rounded-full absolute bottom-0 ${today(getLocalTimeZone()).toString() === day.toString() ? 'opactiy-100' : 'opacity-15'}`}></span>
                                </div>
                                <Card className='mt-3 text-sm w-full mr-8'>
                                    <CardBody>
                                        <p> 9.00 - 11.00 </p>
                                        <p> <span>Test: </span>RPL</p>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default page
