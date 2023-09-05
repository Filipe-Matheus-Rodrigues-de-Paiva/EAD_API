import { NextFunction, Request, Response } from "express"
import { Account } from "../entities"
import { AppDataSource } from "../data-source"
import AppError from "../error"

const verifyEmailorUsernameExists = async (request: Request, response: Response, next: NextFunction) => {
    const username = request.body.username
    const email = request.body.email

    if (!username || !email) return next()

    const foundAccount: Account | null = await AppDataSource.getRepository(Account).findOneBy({ username, email})

    if (foundAccount) throw new AppError("user with such credentials already exists", 409)

    return next()
}

export default verifyEmailorUsernameExists