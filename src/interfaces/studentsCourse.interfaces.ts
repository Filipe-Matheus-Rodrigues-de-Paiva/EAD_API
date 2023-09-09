import { z } from "zod"
import { requestPayloadSchema, responseSchema } from "../schemas"

type TStudentAddPayload = z.infer<typeof requestPayloadSchema>

type TStudentAddReturn = z.infer<typeof responseSchema>

export {
    TStudentAddPayload,
    TStudentAddReturn
}