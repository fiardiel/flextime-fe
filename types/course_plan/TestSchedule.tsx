export interface TestSchedule {
    id: number
    test_date: Date
    test_name: string
    test_start: string
    test_end: string
    course_plan: number
}

export interface TestScheduleForm {
    test_date: Date
    test_name: string
    test_start: string
    test_end: string
    course_plan: number
}