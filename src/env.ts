const requiredServerEnvs = [
	"APP_VERSION",
	"CLOUDINARY_NAME",
	"CLOUDINARY_KEY",
	"CLOUDINARY_SECRET",
	"JWT_SECRET",
	"MONGO_URI",
	"NODE_ENV",
	"PORT",
] as const

type RequiredServerEnvKeys = (typeof requiredServerEnvs)[number]

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Record<RequiredServerEnvKeys, string> {}
	}
}

export {}
