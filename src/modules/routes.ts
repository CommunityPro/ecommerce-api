import { Router } from "express"

import categories from "./category/category.route"
import customers from "./customer/customer.route"
import products from "./product/product.route"
import auth from "./auth/auth.route"

const routes = () => {
	const router = Router()

	router.use("/categories", categories)
	router.use("/customers", customers)
	router.use("/products", products)
	router.use("/auth", auth)

	return router
}

export default routes
