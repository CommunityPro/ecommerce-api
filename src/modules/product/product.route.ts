import { Router } from "express"

import { authorization, upload } from "../../common/middlewares"
import {
	createProductController,
	deleteProductController,
	fetchProductController,
	fetchProductsController,
	updateProductController,
} from "./product.controller"

const router = Router()

router.post("/", upload.array("assets"), authorization.authorize, createProductController)
router.patch("/", upload.array("assets"), authorization.authorize, updateProductController)
router.get("/", fetchProductsController)
router.get("/:id", fetchProductController)
router.delete("/:id", authorization.authorize, deleteProductController)

export default router
