import { Router } from "express"

import { signinController, signupController } from "./auth.controller"

const router = Router()

router.post("/signup", signupController)

router.post("/signin", signinController)

export default router
