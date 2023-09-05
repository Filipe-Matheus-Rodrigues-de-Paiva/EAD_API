import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Course from "./course.entity"
import { getRounds, hashSync } from "bcryptjs"
import StudentCourse from "./studentcourse.entity";

@Entity("accounts")
class Account {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 150, unique: true })
    username: string;

    @Column({ type: "varchar", length: 128 })
    password: string;

    @Column({ type: "varchar", unique: true, length: 100 })
    email: string;

    @Column({ type: "boolean", default: false })
    is_superuser: boolean | null | undefined;

    @OneToMany(() => Course, (course) => course.instructor)
    courses: Course[];

    @OneToMany(() => StudentCourse, (studentsCourses) => studentsCourses.student)
    studentsCourses: StudentCourse[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const hasRounds: number = getRounds(this.password)
        if (!hasRounds) {
            this.password = hashSync(this.password, 10)
        }
    }
}

export default Account