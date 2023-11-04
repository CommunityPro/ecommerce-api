import { Router } from "express"

import { fetchCustomerController, fetchCustomersController } from "./customer.controller"

const router = Router()

router.get("/", fetchCustomersController)
router.get("/:id", fetchCustomerController)

export default router
