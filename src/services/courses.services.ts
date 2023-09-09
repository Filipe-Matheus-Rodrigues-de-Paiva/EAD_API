import { AppDataSource } from "../data-source"
import { Account, Course } from "../entities"
import AppError from "../error"
import { TAccountRepo, TCourseRead, TCourseRepository, TCourseReturn, TCourseUpdate, TCourseUpdateReturn, TCreateCourse } from "../interfaces"
import { courseCreationSchema, courseUpdateReturn } from "../schemas"

const create = async ({instructor, ...payload}: TCreateCourse): Promise<TCourseReturn> => {
    const courseRepo: TCourseRepository = AppDataSource.getRepository(Course)
    const accountRepo: TAccountRepo = AppDataSource.getRepository(Account)

    let newCourse

    if(instructor) {
        const foundInstructor = await accountRepo.findOneBy({ id: instructor })
        
        if (foundInstructor && foundInstructor.id) {
            newCourse = courseRepo.create({...payload, instructor: foundInstructor.id, contents: [], studentsCourses: []})
        } else throw new AppError("instructor não encontrado", 400)
    } else {
        newCourse = courseRepo.create({...payload, instructor: null, contents: [], studentsCourses: []})
    }

    await courseRepo.save(newCourse)

    return courseCreationSchema.parse(newCourse)
}

const read = async (): Promise<TCourseRead> => {
    const courseRepo: TCourseRepository = AppDataSource.getRepository(Course)

    const courses = await courseRepo.find({
        relations: { contents: true, studentsCourses: {student: true} },
        select: { id: true, name: true, status: true, start_date: true, end_date: true, contents: true, studentsCourses: { id: true, student: { id: true, username: true, email: true }, status: true } }
    })
    
    return courses
}

const update = async (payload: TCourseUpdate, course: Course): Promise<TCourseUpdateReturn> => {
    const courseRepo = AppDataSource.getRepository(Course)
    const updatedCourse = await courseRepo.save({...course, ...payload})

    return courseUpdateReturn.parse(updatedCourse)
}

const destroy = async (course: Course): Promise<void> => {
    const courseRepo = AppDataSource.getRepository(Course)
    await courseRepo.softRemove(course)
}

export default {
    create,
    read,
    update,
    destroy
}