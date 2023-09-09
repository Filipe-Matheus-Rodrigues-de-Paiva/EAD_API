import { z } from "zod"
import { contentPayloadSchema, contentSchema, contentUpdateSchema } from "../schemas"
import { DeepPartial, Repository } from "typeorm"
import { Content } from "../entities"

type TContentPayload = z.infer<typeof contentPayloadSchema>

type TContentReturn = z.infer<typeof contentSchema>

type TContentRepository = Repository<Content>

type TContentUpdate = DeepPartial<typeof contentUpdateSchema>

export {
    TContentPayload,
    TContentReturn,
    TContentRepository,
    TContentUpdate
}