import { z } from "zod"

const loginSchema = z.object({
    username: z.string().max(150),
    password: z.string().max(128)
})

export {
    loginSchema
}