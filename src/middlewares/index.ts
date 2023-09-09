import validateBody from "./validateBody.middlewares"
import handleError from "./handleError.middlewares"
import verifyEmailorUsernameExists from "./verifyEmailorUsernameExists.middlewares"
import verifyToken from "./verifyToken.middlewares"
import verifyUserPermission from "./verifyUserPermission.middlewares"
import verifyCourseNameAlreadyExists from "./verifyCourseNameAlreadyExists.middlewares"
import verifyCourseExists from "./verifyCourseExists.middlewares"
import verifyContentExists from "./verifyContentExists.middlewares"
import verifyEnrolledStudent from "./verifyEnrolledStudent.middleware"
import pagination from "./pagination.middleware"
import verifyIsAdminOrNot from "./isAdminOrStudent.middleware"

export default{
    validateBody,
    handleError,
    verifyEmailorUsernameExists,
    verifyToken,
    verifyUserPermission,
    verifyCourseNameAlreadyExists,
    verifyCourseExists,
    verifyContentExists,
    verifyEnrolledStudent,
    pagination,
    verifyIsAdminOrNot
}