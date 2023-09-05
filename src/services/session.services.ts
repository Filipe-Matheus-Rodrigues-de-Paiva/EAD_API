import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppDataSource } from "../data-source"
import { Account } from "../entities"
import AppError from "../error"
import { TLogin, TSessionReturn } from "../interfaces"

const loginService = async ({ username, password }: TLogin): Promise<TSessionReturn> => {
    const accountRepo = AppDataSource.getRepository(Account)

    const account: Account | null = await accountRepo.findOneBy({ username })

    if(!account) throw new AppError("Invalid Credentials", 401)

    const passwordMatch: Boolean = await compare(password, account.password)

    if (!passwordMatch) throw new AppError("Invalid Credentials", 401)

    const token = sign(
        {username: account.username, admin: account.is_superuser},
        process.env.SECRET_KEY!,
        { subject: account.id, expiresIn: process.env.EXPIRES_IN! }
    )

    return { token }
}

export default {
    loginService
}