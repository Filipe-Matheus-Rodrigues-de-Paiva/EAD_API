import { Repository } from "typeorm"
import { Account } from "../entities"
import { z } from "zod"
import { payloadSchema, returnAccountSchema } from "../schemas"

type TAccountRepo = Repository<Account>

type TAccountPayload = z.infer<typeof payloadSchema>

type TAccountReturn = z.infer<typeof returnAccountSchema>

export {
    TAccountRepo,
    TAccountPayload,
    TAccountReturn
}