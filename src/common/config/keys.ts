import dotenv from "dotenv"

dotenv.config()

const KEYS = {
	app_version: process.env.APP_VERSION as string,
	mongo_uri: process.env.MONGO_URI as string,
	port: process.env.PORT as string,
} as const

export default KEYS
