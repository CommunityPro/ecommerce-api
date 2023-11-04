import express, { Express, NextFunction, Request, Response, Router } from "express"
import morgan from "morgan"
import cors from "cors"
import path from "path"

import { HTTP, RESPONSE } from "./common/constants"
import { createError } from "./common/helpers"
import { KEYS } from "./common/config"
import routes from "./modules/routes"

const App = () => {
	const app: Express = express()

	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())
	app.use(cors())
	app.use(morgan("dev"))

	app.use(function (_err: any, _req: any, _res: any, _: any) {
		if (_err instanceof SyntaxError) {
			return _res.status(HTTP.BAD_REQUEST).json({
				code: HTTP.UNPROCESSABLE_ENTITY,
				status: RESPONSE.ERROR,
				message: "Invalid JSON payload passed.",
				data: null,
			})
		}
	})

	const router = Router()
	router.use(routes())

	router.use((_req, _res, next) => {
		next(
			createError(HTTP.NOT_FOUND, [
				{
					code: HTTP.NOT_FOUND,
					status: RESPONSE.ERROR,
					message: "Route not found.",
					data: null,
				},
			])
		)
	})

	router.use((error: any, _req: any, res: Response, _next: NextFunction) => {
		console.log(error)
		const initialError = error
		if (!error.statusCode) {
			error = createError(HTTP.SERVER_ERROR, [
				{
					code: HTTP.SERVER_ERROR,
					status: RESPONSE.ERROR,
					message: initialError.message || "Internal Server Error.",
					data: error.data,
					stack: error.stack,
				},
			])
		}

		return res.status(error.statusCode).json({
			code: error.code,
			status: error.status,
			message: error.message,
			data: error.data || null,
			...(process.env.NODE_ENV === "development" && { stack: error.stack }),
		})
	})

	app.use("/", express.static(path.join(__dirname, "../../docs/.vitepress/dist/")))

	const API_URL = `/api/${KEYS.app_version}`

	app.get(API_URL, async (_req: Request, res: Response) =>
		res.send({ message: "Welcome to eCommerce API" })
	)

	return app
}

export default App
