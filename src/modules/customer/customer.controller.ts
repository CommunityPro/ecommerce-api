import { NextFunction, Response } from "express"

import { createError, createResponse } from "../../common/helpers"
import { FetchCustomer, FetchCustomers } from "./customer.service"
import { ExpressRequest } from "../../common/interfaces"
import { HTTP, RESPONSE } from "../../common/constants"
import { PaginateDto } from "../../common/interfaces"

const fetchCustomersController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const query: PaginateDto = { ...req.query }
		const { error, message, data } = await FetchCustomers(query)
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
		return createResponse(message, data)(res, HTTP.OK)
	} catch (error: any) {
		console.log(error)
		return next(createError.InternalServerError(error))
	}
}

const fetchCustomerController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params
		const { error, message, data } = await FetchCustomer(id)
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
		return createResponse(message, data)(res, HTTP.OK)
	} catch (error: any) {
		console.log(error)
		return next(createError.InternalServerError(error))
	}
}

export { fetchCustomerController, fetchCustomersController }
