import { Router } from "express"

import { fetchProductController, fetchProductsController } from "./product.controller"

const router = Router()

router.get("/", fetchProductsController)
router.get("/:id", fetchProductController)

export default router
