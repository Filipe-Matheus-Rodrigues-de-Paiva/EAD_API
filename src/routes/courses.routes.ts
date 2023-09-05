import { Router } from "express"
import { courseControllers } from "../controllers"
import middlewares from "../middlewares"

const coursesRoutes: Router = Router()

coursesRoutes.post("", middlewares.verifyToken, middlewares.verifyUserPermission, middlewares.verifyCourseNameAlreadyExists, courseControllers.createCourse)
coursesRoutes.get("", middlewares.verifyToken, courseControllers.readCourses)
coursesRoutes.get("/:courseId", middlewares.verifyCourseExists, courseControllers.retrieveCourse)
coursesRoutes.patch("/:courseId", middlewares.verifyToken, middlewares.verifyUserPermission, middlewares.verifyCourseExists, courseControllers.updateCourse)
coursesRoutes.delete("/:courseId", middlewares.verifyToken, middlewares.verifyUserPermission, middlewares.verifyCourseExists, courseControllers.destroyCourse)

export default coursesRoutes