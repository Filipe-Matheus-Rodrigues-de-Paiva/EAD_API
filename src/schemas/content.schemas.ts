import { z } from "zod"

const contentSchema = z.object({
    id: z.string(),
    name: z.string().max(150),
    content: z.string(),
    video_url: z.string().max(200).optional().nullish()
})

const contentPayloadSchema = contentSchema.omit({
    id: true
})

const contentUpdateSchema = contentPayloadSchema.partial()

export {
    contentPayloadSchema,
    contentSchema,
    contentUpdateSchema
}