import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import Account from "./account.entity"
import Course from "./course.entity"

@Entity("students_courses")
class StudentCourse {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ enum: ["pending", "accepted"], default: "pending" })
  status: string

  @ManyToOne(() => Account, (account) => account.studentsCourses)
  student: Account

  @ManyToOne(() => Course, (course) => course.studentsCourses)
  course: Course
}

export default StudentCourse