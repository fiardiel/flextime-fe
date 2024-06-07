export interface IClassSchedule {
    id: number
    start_time: string
    end_time: string
    class_day: string
    course_plan: number
}

export interface ClassScheduleForm {
    start_time: string
    end_time: string
    class_day: string
    course_plan: number
}