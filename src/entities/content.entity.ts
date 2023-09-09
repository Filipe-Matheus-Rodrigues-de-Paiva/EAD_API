import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import Course from "./course.entity"

@Entity("contents")
class Content {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 150 })
    name: string;

    @Column({ type: "text" })
    content: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    video_url: string | null | undefined

    @ManyToOne(() => Course, (course) => course.contents)
    course: Course;
}

export default Content

// Um curso pode ter vários conteudos (one-to-many)
// um conteudo só pode ter um curso (Many-to-one)