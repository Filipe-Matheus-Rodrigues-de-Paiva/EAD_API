import { Router } from "express"
import middlewares from "../middlewares"
import { payloadSchema } from "../schemas"
import { accountsControllers } from "../controllers"

const accountRoutes: Router = Router()

/* Rotas obrigatórias na atividade */
accountRoutes.post("", middlewares.verifyEmailorUsernameExists, middlewares.validateBody(payloadSchema), accountsControllers.create)

/* Rotas não obrigatórias */

export default accountRoutes