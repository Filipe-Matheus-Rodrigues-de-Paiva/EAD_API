import { Router } from "express"
import { sessionControllers } from "../controllers"
import middlewares from "../middlewares"
import { loginSchema } from "../schemas"
sessionControllers

const sessionRoutes: Router = Router()

sessionRoutes.post("", middlewares.validateBody(loginSchema), sessionControllers.login)

export default sessionRoutes