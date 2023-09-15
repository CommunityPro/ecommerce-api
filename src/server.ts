import express, { Express, Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"

import { KEYS } from "./common/config"

const App = () => {
	const app: Express = express()

	app.use(express.static("/public"))
	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())
	app.use(cors())
	app.use(morgan("dev"))

	app.set("view engine", "ejs")
	app.set("views", "./common/views")

	// !TODO: handle syntax error here
	// !TODO: add routes here
	// !TODO: handle unknown routes here

	app.get("/", async (_req: Request, res: Response) =>
		// !TODO: serve home" page here
		res.status(200).json({ message: "Hello CommunityPro!" })
	)

	// !TODO: handle server errorss here

	const API_URL = "api" + KEYS.app_version

	app.get(API_URL, async (_req: Request, res: Response) =>
		res.send(200).json({ message: "API routes" })
	)

	return app
}

export default App
