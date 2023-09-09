import { Router } from "express"
import { courseControllers } from "../controllers"
import middlewares from "../middlewares"
import contentsControllers from "../controllers/contents.controllers"
import { contentPayloadSchema, coursePayloadSchema, requestPayloadSchema } from "../schemas"
import studentsControllers from "../controllers/students.controllers"

const coursesRoutes: Router = Router()

/* Rotas de Curso */
coursesRoutes.post("", middlewares.verifyToken, middlewares.verifyUserPermission, middlewares.validateBody(coursePayloadSchema), middlewares.verifyCourseNameAlreadyExists, courseControllers.createCourse)
coursesRoutes.get("", middlewares.verifyToken, middlewares.pagination, courseControllers.readCourses)

coursesRoutes.get("/:courseId",  middlewares.verifyCourseExists, middlewares.verifyToken, middlewares.verifyIsAdminOrNot, courseControllers.retrieveCourse)
coursesRoutes.patch("/:courseId", middlewares.verifyCourseExists, middlewares.verifyToken, middlewares.verifyUserPermission, middlewares.verifyCourseExists, courseControllers.updateCourse)
coursesRoutes.delete("/:courseId", middlewares.verifyCourseExists, middlewares.verifyToken, middlewares.verifyUserPermission, middlewares.verifyCourseExists, courseControllers.destroyCourse)

/* Rotas de Conteúdo */
coursesRoutes.use("/:courseId/contents", middlewares.verifyCourseExists)
coursesRoutes.post("/:courseId/contents", middlewares.verifyToken, middlewares.verifyUserPermission, middlewares.validateBody(contentPayloadSchema), contentsControllers.create)

coursesRoutes.get("/:courseId/contents/:contentId", middlewares.verifyContentExists, middlewares.verifyToken, middlewares.verifyIsAdminOrNot, contentsControllers.retrieve) // alterar permissão*
coursesRoutes.patch("/:courseId/contents/:contentId", middlewares.verifyContentExists, middlewares.verifyToken, middlewares.verifyUserPermission, contentsControllers.update)
coursesRoutes.delete("/:courseId/contents/:contentId", middlewares.verifyContentExists, middlewares.verifyToken, middlewares.verifyUserPermission, contentsControllers.destroy)

/* Rotas de Estudantes */
coursesRoutes.put("/:courseId/students/", middlewares.validateBody(requestPayloadSchema), middlewares.verifyToken, middlewares.verifyUserPermission, studentsControllers.create)
coursesRoutes.get("/:courseId/students/", middlewares.verifyToken, middlewares.verifyUserPermission, studentsControllers.read)
coursesRoutes.delete("/:courseId/students/:studentId", middlewares.verifyEnrolledStudent, middlewares.verifyToken, middlewares.verifyUserPermission, studentsControllers.destroy)

export default coursesRoutes