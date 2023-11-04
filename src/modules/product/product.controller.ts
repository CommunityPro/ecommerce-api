import { NextFunction, Response } from "express"

import { CreateProductDto, UpdateProductDto } from "./product.dto"
import { createError, createResponse } from "../../common/helpers"
import { ExpressRequest } from "../../common/interfaces"
import { HTTP, RESPONSE } from "../../common/constants"
import { PaginateDto } from "../../common/interfaces"
import {
	CreateProduct,
	DeleteProduct,
	FetchProduct,
	FetchProducts,
	UpdateProduct,
} from "./product.service"

const createProductController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const payload: CreateProductDto = { ...req.body }
		const { error, message, data } = await CreateProduct(payload)
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

const updateProductController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const payload: UpdateProductDto = { ...req.body }
		const { error, message, data } = await UpdateProduct(payload)
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

const fetchProductsController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const query: PaginateDto = { ...req.query }
		const { error, message, data } = await FetchProducts(query)
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

const fetchProductController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params
		const { error, message, data } = await FetchProduct(id)
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

const deleteProductController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params
		const { error, message, data } = await DeleteProduct(id)
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

export {
	createProductController,
	deleteProductController,
	fetchProductController,
	fetchProductsController,
	updateProductController,
}
