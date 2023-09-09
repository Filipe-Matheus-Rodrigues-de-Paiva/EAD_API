import { NextFunction, Request, Response } from "express"
import AppError from "../error"
import { AppDataSource } from "../data-source"
import { Course } from "../entities"
import { Repository } from "typeorm"
import { isValidUUID } from "./verifyContentExists.middlewares"

const verifyIsAdminOrNot = async (request: Request, response: Response, next: NextFunction) => {
    const { admin, sub } = response.locals.decoded
    const { courseId } = request.params
    const courseRepo: Repository<Course> = AppDataSource.getRepository(Course)

    if (!isValidUUID(courseId)) throw new AppError("Course not found!", 404)

    const foundCourse = await courseRepo.findOne({
        where: { id: courseId},
        relations: { studentsCourses: { student: true } }
    })

    if (!foundCourse) throw new AppError("Course not found!", 404)

    if (admin) return next()

    const isUserEnrolled = foundCourse.studentsCourses.some(student => student.student.id === sub)

    if (!isUserEnrolled) throw new AppError("Insufficient permission", 403)

    return next()
}

export default verifyIsAdminOrNot