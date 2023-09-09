import { Request, Response } from "express"
import { contentServices } from "../services"

const create = async (request: Request, response: Response): Promise<Response> => {
    const { courseId } = request.params
    const newContent = await contentServices.create(request.body, courseId)
    return response.status(201).json(newContent)
}

const retrieve = async (request: Request, response: Response): Promise<Response> => {
    const contentFound = await response.locals.foundContent
    return response.status(200).json(contentFound)
}

const update = async (request: Request, response: Response): Promise<Response> => {
    const contentFound = response.locals.foundContent
    const updatedContent = await contentServices.update(request.body, contentFound)
    return response.status(200).json(updatedContent)
}

const destroy = async (request: Request, response: Response): Promise<Response | void> => {
    const contentFound = response.locals.foundContent
    await contentServices.destroy(contentFound)
    return response.status(204).json()
}

export default {
    create,
    retrieve,
    update,
    destroy
}