import { NextFunction, Request, Response } from "express"
import { Course } from "../entities"
import { AppDataSource } from "../data-source"
import AppError from "../error"

const verifyCourseExists = async (request: Request, response: Response, next: NextFunction) => {
    const courseId = request.params.courseId

    const courseRepo = AppDataSource.getRepository(Course)

    const courseFound = await courseRepo.find({
        where: { id: courseId },
        relations: {contents: true, studentsCourses: true}
    })

    if (!courseFound) throw new AppError("Course not found", 404)

    response.locals = {...response.locals, courseFound}

    return next()
}

export default verifyCourseExists