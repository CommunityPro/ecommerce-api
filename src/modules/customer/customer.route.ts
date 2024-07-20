import { Router } from "express"

import { fetchCustomerController, fetchCustomersController } from "./customer.controller"
import { authorize } from "../../common/middlewares"

const router = Router()

router.get("/", authorize, fetchCustomersController)
router.get("/:id", authorize, fetchCustomerController)

export default router
