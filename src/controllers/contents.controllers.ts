import { Request, Response } from "express"

const create = async (request: Request, response: Response): Promise<Response> => {
    return response.status(201).json()
}

const retrieve = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json()
}

const update = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json()
}

const destroy = async (request: Request, response: Response): Promise<Response> => {
    return response.status(204).json()
}

export default {
    create,
    retrieve,
    update,
    destroy
}