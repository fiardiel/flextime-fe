export interface IClassSchedule {
    id: number
    class_name: string
    start_time: string
    end_time: string
    class_day: string
    course_plan: number
}

export interface ClassScheduleForm {
    class_name: string
    start_time: string
    end_time: string
    class_day: string
}