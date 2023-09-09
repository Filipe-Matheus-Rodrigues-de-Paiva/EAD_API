import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Content } from "../entities"
import AppError from "../error"

export const isValidUUID = (value: string) => {
    // Implemente a lógica para validar o formato do UUID aqui
    // Por exemplo, você pode usar uma expressão regular para validar o formato
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    return uuidRegex.test(value)
}

const verifyContentExists = async (request: Request, response: Response, next: NextFunction) => {
    const contentId = request.params.contentId
    const courseId = request.params.courseId

    /* Verificar se contentId é valido e existe */
    if (!isValidUUID(contentId)) throw new AppError("No content was found", 404)

    const contentRepo = AppDataSource.getRepository(Content)

    /* Verificar se contentId existe e se pertence ao curso com o id passado */
    const foundContent = await contentRepo.findOne({
        where: { id: contentId, course: { id: courseId } }
    })

    if (!foundContent) throw new AppError("No content was found for the specified course", 404)

    response.locals = {...response.locals, foundContent}

    return next()
}

export default verifyContentExists