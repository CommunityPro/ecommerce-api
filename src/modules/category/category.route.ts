import { Router } from "express"

import { authorization } from "../../common/middlewares"
import {
	createCategoryController,
	deleteCategoryController,
	fetchCategoriesController,
	fetchCategoryController,
	updateCategoryController,
} from "./category.controller"

const router = Router()

router.post("/", authorization.authorize, createCategoryController)
router.patch("/", authorization.authorize, updateCategoryController)
router.get("/", fetchCategoriesController)
router.get("/", fetchCategoryController)
router.delete("/", authorization.authorize, deleteCategoryController)

export default router
