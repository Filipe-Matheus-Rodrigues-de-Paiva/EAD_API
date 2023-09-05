import { AppDataSource } from "../data-source"
import Account from "../entities/account.entity"
import { TAccountPayload, TAccountRepo, TAccountReturn } from "../interfaces"
import { returnAccountSchema } from "../schemas"

const create = async (payload: TAccountPayload): Promise<TAccountReturn> => {
    const accountRepo: TAccountRepo = AppDataSource.getRepository(Account)
    const newAccount = accountRepo.create(payload)

    await accountRepo.save(newAccount)

    return returnAccountSchema.parse(newAccount)
}

export default {
    create
}