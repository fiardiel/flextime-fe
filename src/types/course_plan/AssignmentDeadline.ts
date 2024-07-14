export interface IAssignmentDeadline {
    id: number
    assignment_name: string
    assignment_due_date: string
    assignment_due_time: string
    course_plan: number
}

export interface AssignmentDeadlineForm {
    assignment_name: string
    assignment_due_date: string
    assignment_due_time: string 
}