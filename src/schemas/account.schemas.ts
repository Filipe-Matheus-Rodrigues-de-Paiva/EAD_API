import { z } from "zod"

const accountSchema = z.object({
    id: z.string(),
    username: z.string().max(150),
    password: z.string().max(128),
    email: z.string().email().max(100),
    is_superuser: z.boolean().default(false).nullish()
})

const payloadSchema = accountSchema.omit({
    id: true
})

const returnAccountSchema = accountSchema.omit({
    password: true
})

export {
    accountSchema,
    payloadSchema,
    returnAccountSchema
}