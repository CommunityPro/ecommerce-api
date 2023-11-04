import { NextFunction, Response } from "express"

import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto"
import { createError, createResponse } from "../../common/helpers"
import { ExpressRequest } from "../../common/interfaces"
import { HTTP, RESPONSE } from "../../common/constants"
import { PaginateDto } from "../../common/interfaces"
import {
	CreateCategory,
	DeleteCategory,
	FetchCategories,
	FetchCategory,
	UpdateCategory,
} from "./category.service"

const createCategoryController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const payload: CreateCategoryDto = { ...req.body }
		const { error, message, data } = await CreateCategory(payload)
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

const updateCategoryController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const payload: UpdateCategoryDto = { ...req.body }
		const { error, message, data } = await UpdateCategory(payload)
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

const fetchCategoriesController = async (
	req: ExpressRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const query: PaginateDto = { ...req.query }
		const { error, message, data } = await FetchCategories(query)
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

const fetchCategoryController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params
		const { error, message, data } = await FetchCategory(id)
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

const deleteCategoryController = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params
		const { error, message, data } = await DeleteCategory(id)
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
	createCategoryController,
	deleteCategoryController,
	fetchCategoriesController,
	fetchCategoryController,
	updateCategoryController,
}
