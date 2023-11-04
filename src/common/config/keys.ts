import dotenv from "dotenv"

dotenv.config()

const KEYS = {
	app_version: process.env.APP_VERSION as string,
	cloudinary_key: process.env.CLOUDINARY_KEY as string,
	cloudinary_name: process.env.CLOUDINARY_NAME as string,
	cloudinary_secret: process.env.CLOUDINARY_SECRET as string,
	jwt_secret: process.env.JWT_SECRET as string,
	mongo_uri: process.env.MONGO_URI as string,
	node_env: process.env.NODE_ENV as string,
	port: process.env.PORT as string,
} as const

export default KEYS
