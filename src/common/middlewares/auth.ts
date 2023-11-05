import { NextFunction } from "express"

import { ExpressRequest } from "../interfaces"
import { HTTP, RESPONSE } from "../constants"
import { createError } from "../helpers"
import { User } from "../../schemas"

const authorize = async (req: ExpressRequest, _: any, next: NextFunction) => {
	const api_key: any = req.headers.authorization && req.headers["api-key"]
	if (!api_key) {
		next(
			createError(HTTP.BAD_REQUEST, [
				{
					status: RESPONSE.ERROR,
					message: "APi key token is missing",
					statusCode: HTTP.UNAUTHORIZED,
				},
			])
		)
	}
	try {
		const user = await User.findOne({ api_key })
		if (!user) {
			return next(
				createError(HTTP.UNAUTHORIZED, [
					{
						status: RESPONSE.ERROR,
						message: "Unauthorized to perform this action",
						statusCode: HTTP.UNAUTHORIZED,
					},
				])
			)
		}
		if (user) {
			req.user = user
			next()
		} else {
			next(
				createError(HTTP.BAD_REQUEST, [
					{
						status: RESPONSE.ERROR,
						message: "Invalid API key token.",
						statusCode: HTTP.UNAUTHORIZED,
					},
				])
			)
		}
	} catch (error: any) {
		return next(
			createError(HTTP.BAD_REQUEST, [
				{
					status: RESPONSE.ERROR,
					message: error.message,
					statusCode: HTTP.UNAUTHORIZED,
				},
			])
		)
	}
}

export default authorize
