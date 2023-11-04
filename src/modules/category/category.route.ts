import { Router } from "express"

import { fetchCategoriesController, fetchCategoryController } from "./category.controller"

const router = Router()

router.get("/", fetchCategoriesController)
router.get("/:id", fetchCategoryController)

export default router
