const requiredServerEnvs = ["PORT", "MONGO_URI", "APP_VERSION"] as const

type RequiredServerEnvKeys = (typeof requiredServerEnvs)[number]

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Record<RequiredServerEnvKeys, string> {}
	}
}

export {}
