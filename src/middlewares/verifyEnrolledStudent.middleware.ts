import { NextFunction, Request, Response } from "express"
import { Repository } from "typeorm"
import { Course, StudentCourse } from "../entities"
import { AppDataSource } from "../data-source"
import AppError from "../error"
import { isValidUUID } from "./verifyContentExists.middlewares"

const verifyEnrolledStudent = async (request: Request, response: Response, next: NextFunction) => {
    const studentRepo: Repository<StudentCourse> = AppDataSource.getRepository(StudentCourse)
    const studentId = request.params.studentId
    const courseId = request.params.courseId

    if (!isValidUUID(courseId) || !isValidUUID(studentId)) throw new AppError("Invalid course or student Id", 400)

    const foundStudent = await studentRepo.findOne({
        where: { student: { id: studentId }, course: { id: courseId } }
    })

    if (!foundStudent) throw new AppError("this id is not associated with this course.", 404)

    response.locals = {...response.locals, foundStudent}

    return next()
}

export default verifyEnrolledStudent