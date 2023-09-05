import { z } from "zod"
import { courseCreationSchema, coursePayloadSchema, courseUpdateSchema } from "../schemas"
import { DeepPartial, Repository } from "typeorm"
import { Course } from "../entities"

type TCreateCourse = z.infer<typeof coursePayloadSchema>

type TCourseReturn = z.infer<typeof courseCreationSchema>

type TCourseRepository = Repository<Course>

type TCourseRead = Array<Course>

type TCourseUpdate = DeepPartial<typeof courseUpdateSchema>

export {
    TCourseReturn,
    TCreateCourse,
    TCourseRepository,
    TCourseRead,
    TCourseUpdate
}