import { NextFunction, Request, Response } from "express"
import { Course } from "../entities"
import { AppDataSource } from "../data-source"
import AppError from "../error"

const isValidUUID = (value: string) => {
    // Implemente a lógica para validar o formato do UUID aqui
    // Por exemplo, você pode usar uma expressão regular para validar o formato
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    return uuidRegex.test(value)
}

const verifyCourseExists = async (request: Request, response: Response, next: NextFunction) => {
    const courseId = request.params.courseId
    
    if (!isValidUUID(courseId)) throw new AppError("Course not found!", 404)

    const courseRepo = AppDataSource.getRepository(Course)

    const courseFound = await courseRepo.find({
        where: { id: courseId },
        relations: {contents: true, studentsCourses: { student: true }},
        select: { id: true, name: true, status: true, start_date: true, end_date: true, contents: true, studentsCourses: { id: true, student: { id: true, username: true, email: true }, status: true } }
    })

    if (!courseFound) throw new AppError("Course not found", 404)

    response.locals = {...response.locals, courseFound}

    return next()
}

export default verifyCourseExists