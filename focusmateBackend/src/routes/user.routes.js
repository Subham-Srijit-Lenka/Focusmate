import { Router } from "express"
import { logOutUser, loginUser, refereshAccessToken, registerUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logOutUser)
router.route("/refresh-token").post(refereshAccessToken)

export default router