import { NextFunction } from "express"

import { JwtHelper, createError } from "../helpers"
import { ExpressRequest } from "../interfaces"
import { HTTP, RESPONSE } from "../constants"
import { User } from "../../schemas"

const authorize = async (req: ExpressRequest, _: any, next: NextFunction) => {
	const token: any = req.headers.authorization && req.headers.authorization.split(" ")[1]
	if (!token) {
		next(
			createError(HTTP.BAD_REQUEST, [
				{
					status: RESPONSE.ERROR,
					message: "Authorization token is missing",
					statusCode: HTTP.UNAUTHORIZED,
				},
			])
		)
	}
	try {
		const { id } = await JwtHelper.verify(token)
		const user = await User.findById(id)
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
			req.token = token
			next()
		} else {
			next(
				createError(HTTP.BAD_REQUEST, [
					{
						status: RESPONSE.ERROR,
						message: "Invalid auth token.",
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

const login = async (req: ExpressRequest, _: any, next: NextFunction) => {
	let email = <string>req.body.email.toLowerCase()
	try {
		const user = await User.findOne({ email: email })
		if (!user) {
			return next(
				createError(HTTP.NOT_FOUND, [
					{
						status: RESPONSE.ERROR,
						message: `User does not Exist`,
						code: HTTP.BAD_REQUEST,
					},
				])
			)
		} else {
			req.user = user
			return next()
		}
	} catch (err) {
		console.error(err)
		return next(createError.InternalServerError(err))
	}
}

export default { authorize, login }
