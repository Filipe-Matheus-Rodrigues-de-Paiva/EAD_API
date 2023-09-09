import { z } from "zod"

const courseStatusEnum = z.enum(["not started", "in progress", "finished"]).default("not started")

const courseCreationSchema = z.object({
    id: z.string(),
    name: z.string().max(100),
    status: courseStatusEnum,
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    instructor: z.string().nullish().optional(),
    contents: z.array(z.unknown()).optional(),
    studentsCourses: z.array(z.unknown()).optional(),
})

const coursePayloadSchema = courseCreationSchema.omit({
    id: true,
    status: true 
})

const courseUpdateSchema = courseCreationSchema.omit({
    id: true,
    contents: true,
    studentsCourses: true
}).partial()

const courseUpdateReturn = z.object({
    id: z.string(),
    name: z.string().max(100),
    status: courseStatusEnum,
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    instructor: z.string().nullish().optional()
})

export { courseCreationSchema, coursePayloadSchema, courseUpdateSchema, courseUpdateReturn }