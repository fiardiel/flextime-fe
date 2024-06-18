import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { Button } from '@nextui-org/button'
import React from 'react'
import { IoIosAdd } from 'react-icons/io'
import { Card, CardBody } from '@nextui-org/react'
import { getDayName, normalizeData, NormalizedSchedule, sortedSchedules } from './utils/Utils'
import { getSchedules } from '../../../apis/activity_plan_apis'
import { ActivityPlan } from '../../../types/activity_plan/ActivityPlan'

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

const page = async () => {
    const thisDay = today(getLocalTimeZone())
    const todayMonth = months.find(month => month.value === thisDay.month)?.label

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

    const getDailyActivityPlan = async (date: CalendarDate): Promise<NormalizedSchedule[]> => { 
        const activityPlanId = 1
        const dateStr = date.toString()
        const activityPlan: ActivityPlan = await getSchedules(activityPlanId, dateStr)
        return sortedSchedules(normalizeData(activityPlan))
    }   

    return (
        <div className='flex flex-col m-10'>
            <div className='flex flex-row mb-8 ml-5'>
                <h3 className='font-custom text-3xl font-bold mr-4'>
                    {todayMonth}
                </h3>
                <Button className='self-start' radius='full' color='primary' variant='flat' endContent={<IoIosAdd />}> Add Session </Button>
            </div>
            <div className='flex flex-wrap ml-5'>
                {weekDates.map(async day => (
                    <div className='flex flex-row w-full md:max-w-48 mr-7' key={day.toString()}>
                        <div className='flex flex-col w-full mb-8 md:max-w-48'>
                            <div className="relative flex justify-between font-sans font-bold text-xl pb-2">
                                <span className={`text-white text-2xl self-end font-extrabold ${today(getLocalTimeZone()).toString() === day.toString() ? 'opactiy-100' : 'opacity-30'}`}> {getDayName(day)} </span>
                                <span className={`self-end ${today(getLocalTimeZone()).toString() === day.toString() ? 'text-primary font-bold' : 'text-white font-medium opacity-30'}`}> {day.day}/{day.month} </span>
                                <span className={`block w-full h-1 bg-white rounded-full absolute bottom-0 ${today(getLocalTimeZone()).toString() === day.toString() ? 'opactiy-100' : 'opacity-15'}`}></span>
                            </div>
                            {(await getDailyActivityPlan(day)).map(sched => (
                                <Card className='mt-3 w-full p-1' key={sched.id}>
                                    <CardBody>
                                        <p className='text-lg font-extrabold mb-3'> {sched.type} </p>
                                        <p className='font-normal text-sm font-sans'> {sched.type === 'Deadline' ? 'Due ' : ''} {sched.start} {`${sched.end === '' ? '' : ' - ' + sched.end }`}</p>
                                        <p className='font-normal text-sm font-sans max-h-5 whitespace-nowrap overflow-hidden overflow-ellipsis'> {sched.name} </p>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page
