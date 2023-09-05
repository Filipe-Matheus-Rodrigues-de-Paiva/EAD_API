import "express-async-errors"
import express, { Application } from "express"
import routes from './routes'
import middlewares from "./middlewares"

const app: Application = express()
app.use(express.json())

app.use("/api/accounts", routes.accountRoutes)
app.use("/api/login", routes.sessionRoutes)
app.use("/api/courses", routes.coursesRoutes)

app.use(middlewares.handleError)

export default app