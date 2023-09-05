import { z } from "zod"
import { loginSchema } from "../schemas"

type TLogin = z.infer<typeof loginSchema>

type TSessionReturn = {
    token: string
}

export {
    TLogin,
    TSessionReturn
}