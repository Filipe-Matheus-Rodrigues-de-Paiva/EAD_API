import { z } from "zod"

const studentCourseSchema = z.object({
    student_email: z.string().email().max(100),
})

const requestPayloadSchema = z.object({
    students_courses: z.array(studentCourseSchema),
}) // payload

const studentCourseResponseSchema = z.object({
    id: z.string(),
    student_id: z.string(),
    student_username: z.string(),
    student_email: z.string().email().max(100),
    status: z.enum(["pending", "accepted"]).default("pending"),
})

const responseSchema = z.object({
    id: z.string(),
    name: z.string(),
    students_courses: z.array(studentCourseResponseSchema),
}) // Retorno tipado

export {
    requestPayloadSchema, responseSchema
}