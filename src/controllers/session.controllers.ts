import { Request, Response } from "express"
import { sessionServices } from "../services"

const login = async (request: Request, response: Response): Promise<Response> => {
    const token = await sessionServices.loginService(request.body)
    return response.status(200).json(token)
}

export default {
    login
}