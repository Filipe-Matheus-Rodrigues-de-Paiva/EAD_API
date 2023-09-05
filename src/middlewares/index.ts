import validateBody from "./validateBody.middlewares"
import handleError from "./handleError.middlewares"
import verifyEmailorUsernameExists from "./verifyEmailorUsernameExists.middlewares"
import verifyToken from "./verifyToken.middlewares"
import verifyUserPermission from "./verifyUserPermission.middlewares"
import verifyCourseNameAlreadyExists from "./verifyCourseNameAlreadyExists.middlewares"
import verifyCourseExists from "./verifyCourseExists.middlewares"

export default{
    validateBody,
    handleError,
    verifyEmailorUsernameExists,
    verifyToken,
    verifyUserPermission,
    verifyCourseNameAlreadyExists,
    verifyCourseExists
}