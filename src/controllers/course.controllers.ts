import { Request, Response } from "express"
import { coursesServices } from "../services"

const createCourse = async (request: Request, response: Response): Promise<Response> => {
    const newCourse = await coursesServices.create(request.body)
    return response.status(201).json(newCourse)
}

const readCourses = async (request: Request, response: Response): Promise<Response> => {
    const courses = await coursesServices.read()
    return response.status(200).json(courses)
}

const retrieveCourse = async (request: Request, response: Response): Promise<Response> => {
    const course = response.locals.courseFound
    return response.status(200).json(course)
}

const updateCourse = async (request: Request, response: Response): Promise<Response> => {
    const course = response.locals.courseFound
    const updatedCourse = await coursesServices.update(request.body, course)
    return response.status(200).json(updatedCourse)
}

const destroyCourse = async (request: Request, response: Response): Promise<Response | void> => {
    const courseToDelete = response.locals.courseFound
    await coursesServices.destroy(courseToDelete)
    return response.status(204).json()
}

export default {
    createCourse,
    readCourses,
    retrieveCourse,
    updateCourse,
    destroyCourse
}