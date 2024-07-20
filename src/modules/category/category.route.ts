import { Router } from "express"

import { fetchCategoriesController, fetchCategoryController } from "./category.controller"
import { authorize } from "../../common/middlewares"

const router = Router()

router.get("/", authorize, fetchCategoriesController)
router.get("/:id", authorize, fetchCategoryController)

export default router
