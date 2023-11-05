import { Router } from "express"

import { fetchProductController, fetchProductsController } from "./product.controller"
import { authorize } from "src/common/middlewares"

const router = Router()

router.get("/", authorize, fetchProductsController)
router.get("/:id", authorize, fetchProductController)

export default router
