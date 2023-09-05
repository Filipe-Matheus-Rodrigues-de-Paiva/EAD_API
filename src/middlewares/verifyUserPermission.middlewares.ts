import { NextFunction, Request, Response } from "express"
import AppError from "../error"

const verifyUserPermission = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const { admin } = response.locals.decoded

    if (!admin) throw new AppError("Insufficient permission", 403)

    return next()
}

export default verifyUserPermission