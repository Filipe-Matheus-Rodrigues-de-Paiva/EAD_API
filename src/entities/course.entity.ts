import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany, OneToMany, JoinColumn, JoinTable } from "typeorm"
import Account from "./account.entity"
import Content from "./content.entity"
import StudentCourse from "./studentcourse.entity";

@Entity("courses")
class Course {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100, unique: true })
    name: string;

    @Column({ enum: ["not started", "in progress", "finished"], default: "not started", type: "varchar", length: 20 })
    status: string;

    @Column({ type: "varchar" })
    start_date: string;

    @Column({ type: "varchar" })
    end_date: string;

    /* Relação com accounts - professor (1:N) */
    @ManyToOne(() => Account, (account) => account.courses, { nullable: true })
    instructor: Account['id'] | null | undefined

    /* Relação com content - 1:N */
    @OneToMany(() => Content, (content) => content.course)
    contents: Content[]

    @OneToMany(() => StudentCourse, (studentsCourses) => studentsCourses.course)
    studentsCourses: StudentCourse[]
}

export default Course