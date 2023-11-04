import jwt from "jsonwebtoken"

import { KEYS } from "../config"

const sign = (userId: string) => {
	try {
		const id: any = jwt.verify(userId, KEYS.jwt_secret)
		return id
	} catch (error: any) {
		console.log(error)
		return {}
	}
}

const verify = (token: string) => {
	try {
		const id: any = jwt.verify(token, KEYS.jwt_secret)
		return id
	} catch (error: any) {
		console.log(error)
		return {}
	}
}

const decode = (token: string) => {
	try {
		return jwt.decode(token)
	} catch (error: any) {
		console.log(error)
		return {}
	}
}

export default { decode, sign, verify }
