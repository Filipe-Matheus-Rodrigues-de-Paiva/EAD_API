import { NextFunction, Request, Response } from "express"
import { Course } from "../entities"
import { AppDataSource } from "../data-source"
import AppError from "../error"

const verifyCourseNameAlreadyExists = async (request: Request, response: Response, next: NextFunction) => {
    const courseName = request.body.name

    const foundCourse: Course | null = await AppDataSource.getRepository(Course).findOneBy({ name: courseName })

    if (foundCourse) throw new AppError("This course already exists!", 409)

    return next()
}

export default verifyCourseNameAlreadyExists