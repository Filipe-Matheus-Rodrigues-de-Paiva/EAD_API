import { Request, Response } from "express"
import { accountsServices } from "../services"

const create = async (request: Request, response: Response): Promise<Response> => {
    const newAccount = await accountsServices.create(request.body)
    return response.status(201).json(newAccount)
}

export default {
    create
}