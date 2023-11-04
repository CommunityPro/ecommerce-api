import dotenv from "dotenv"

import { requiredServerEnvs } from "../constants"

dotenv.config()

const EnvVariables = process.env

const validateEnvs = () => {
	requiredServerEnvs.forEach((env) => {
		if (!EnvVariables[env]) {
			throw new Error("Missing required env variable: " + env)
		}
	})
}

export default validateEnvs
