import { NextFunction, Response } from "express"

import { createError, createResponse } from "../../common/helpers"
import { ExpressRequest } from "../../common/interfaces"
import { HTTP, RESPONSE } from "../../common/constants"
import { SigninDto, SignupDto } from "./auth.dto"
import { Signin, Signup } from "./auth.service"

const signupController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const payload: SignupDto = { ...req.body }
		const { error, message, data } = await Signup(payload)
		if (error) {
			return next(
				createError(HTTP.BAD_REQUEST, [
					{
						status: RESPONSE.ERROR,
						message,
						statusCode: data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
						data,
					},
				])
			)
		}
		return createResponse(message, data)(res, HTTP.CREATED)
	} catch (error: any) {
		console.log(error)
		return next(createError.InternalServerError(error))
	}
}

const signinController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const payload: SigninDto = { ...req.body }
		const { error, message, data } = await Signin(payload)
		if (error) {
			return next(
				createError(HTTP.BAD_REQUEST, [
					{
						status: RESPONSE.ERROR,
						message,
						statusCode: data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
						data,
					},
				])
			)
		}
		return createResponse(message, data)(res, HTTP.CREATED)
	} catch (error: any) {
		console.log(error)
		return next(createError.InternalServerError(error))
	}
}

export { signinController, signupController }
