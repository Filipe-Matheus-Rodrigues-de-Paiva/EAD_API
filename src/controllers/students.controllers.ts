import { Request, Response } from "express"
import { studentsServices } from "../services"

const create = async (request: Request, response: Response): Promise<Response> => {
    const courseUpdated = await studentsServices.addStudent(request.body, request.params.courseId)
    return response.status(201).json(courseUpdated)
}

const read = async (request: Request, response: Response): Promise<Response> => {
    const students = await studentsServices.readStudents(request.params.courseId)
    return response.status(200).json(students)
}

const destroy = async (request: Request, response: Response): Promise<Response | void> => {
    const studentFound = response.locals.foundStudent
    await studentsServices.deleteStudents(studentFound)
    return response.status(204).json()
}

export default {
    create,
    read,
    destroy
}