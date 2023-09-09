import { AppDataSource } from "../data-source"
import { Content, Course } from "../entities"
import AppError from "../error"
import { TContentPayload, TContentRepository, TContentReturn, TContentUpdate, TCourseRepository } from "../interfaces"
import { contentSchema } from "../schemas"

const create = async (payload: TContentPayload, courseId: string): Promise<TContentReturn> => {
    const contentRepo: TContentRepository = AppDataSource.getRepository(Content)
    const courseRepo: TCourseRepository = AppDataSource.getRepository(Course)

    const foundCourse = await courseRepo.findOneBy({ id: courseId })

    if (!foundCourse) throw new AppError("Not found", 404)

    const newCourseContent = contentRepo.create({
        ...payload,
        course: foundCourse
    })

    await contentRepo.save(newCourseContent)

    return contentSchema.parse(newCourseContent)
}

const update = async (payload: TContentUpdate, content: Content): Promise<TContentReturn> => {
    const contentRepo: TContentRepository = AppDataSource.getRepository(Content)

    const updatedContent = await contentRepo.save({...content, ...payload})

    return contentSchema.parse(updatedContent)
}

const destroy = async (content: Content): Promise<void> => {
    const contentRepo: TContentRepository = AppDataSource.getRepository(Content)
    await contentRepo.softRemove(content)
}

export default {
    create,
    update,
    destroy
}