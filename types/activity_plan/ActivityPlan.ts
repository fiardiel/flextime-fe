import { IAssignmentDeadline } from "../course_plan/AssignmentDeadline";
import { IClassSchedule } from "../course_plan/ClassSchedule";
import { TestSchedule } from "../course_plan/TestSchedule";
import { SessionSchedule } from "./SessionSchedule";

export interface ActivityPlan {
    session_schedules: SessionSchedule[]
    class_schedules: IClassSchedule[]
    test_schedules: TestSchedule[]
    assignment_deadlines: IAssignmentDeadline[]
}