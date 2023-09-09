import { FindOptionsWhere, Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Account, Course, StudentCourse } from "../entities"
import { TCourseRepository, TStudentAddPayload, TStudentAddReturn } from "../interfaces"
import AppError from "../error"
import { responseSchema } from "../schemas"
import { isValidUUID } from "../middlewares/verifyContentExists.middlewares"

const addStudent = async (payload: TStudentAddPayload, courseId: string): Promise<TStudentAddReturn> => {
    /* Instanciação dos repositórios */
    const accountRepo: Repository<Account> = AppDataSource.getRepository(Account)
    const studentRepo: Repository<StudentCourse> = AppDataSource.getRepository(StudentCourse)
    const courseRepo: TCourseRepository = AppDataSource.getRepository(Course)

    /* Verificar se o courseId é um UUID válido */
    if (!isValidUUID(courseId)) throw new AppError("No course was found", 404)

    /* Lógica para identificar se o curso existe */
    const foundCourse = await courseRepo.findOne({
        where: { id: courseId },
        relations: { studentsCourses: true }
    })

    if (!foundCourse) throw new AppError("No course was found!", 404)

    const foundStudents: StudentCourse[] = []
    const notFoundStudents: string[] = []

    for (const student of payload.students_courses) {
        /* verifica se o estudante consta na database dentro da entidade Account */
        const studentFound = await accountRepo.findOneBy({ email: student.student_email })

        /* Se existir, cria nova instancia de studentCourse */
        if (studentFound) {
            const studentAlreadyEnrolled = await studentRepo.findOneBy({ student: { email: studentFound.email } })

            if (studentAlreadyEnrolled) throw new AppError("Student already enrolled", 409)
            
            const newStudentInstance = studentRepo.create({
                status: "pending",
                student: studentFound,
                course: foundCourse,
            })

            await studentRepo.save(newStudentInstance)
            foundStudents.push(newStudentInstance)
        } else {
            notFoundStudents.push(student.student_email)
        }
    }

    if (notFoundStudents.length === 0) {
        foundCourse.studentsCourses = foundCourse.studentsCourses.concat(foundStudents)
        await courseRepo.save(foundCourse)
    } else {
        throw new AppError(`No active accounts were found: ${notFoundStudents.join(", ")}`, 404)
    }
    
    const newStudent = await courseRepo.save(foundCourse)

    const responseFormat = {
        id: newStudent.id,
        name: newStudent.name,
        students_courses: foundStudents.map(studentCourse => ({
            id: studentCourse.id,
            student_id: studentCourse.student.id,
            student_email: studentCourse.student.email,
            student_username: studentCourse.student.username,
            status: studentCourse.status,
        }))
    }

    return responseSchema.parse(responseFormat)
}

const readStudents = async (courseId: string): Promise<any> => {
    const courseRepo: TCourseRepository = AppDataSource.getRepository(Course)

    if(!isValidUUID(courseId)) throw new AppError("Course not found!", 404)

    const courseFound = await courseRepo.findOne({
        where: { id: courseId },
        relations: { studentsCourses: { student: true } }
    })

    if (!courseFound) throw new AppError("Course not found!", 404)

    const responseFormat = {
        id: courseFound.id,
        name: courseFound.name,
        students_courses: courseFound.studentsCourses.map(student => ({
            id: student.id,
            student_id: student.student.id,
            student_username: student.student.username,
            student_email: student.student.email,
            status: student.status
        }))
    }

    return responseFormat
}

const deleteStudents = async (student: FindOptionsWhere<StudentCourse>): Promise<void> => {
    const studentRepo: Repository<StudentCourse> = AppDataSource.getRepository(StudentCourse)
    await studentRepo.delete(student)
}

export default {
    addStudent,
    readStudents,
    deleteStudents
}