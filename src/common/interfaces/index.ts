import { Document, Model, ObjectId } from "mongoose"
import { JwtPayload } from "jsonwebtoken"
import { Request } from "express"

interface Category {
	id?: ObjectId | string
	name: string
}

interface Product {
	id?: ObjectId | string
	name: string
	price: number
	description: string
	category: Category
	image: string
}

interface DataResponse {
	error: boolean
	message: string
	data?: null | string | Date | boolean | number | object | symbol | Array<any> | Express.Multer.File
}

interface JwtResponse {
	id: string
}

interface PaginateRecord {
	model: Model<any>
	limit: number | 10
	page: number
	selectedFields?: string[]
	data?: {}
}

interface PaginateDto {
	limit?: number
	page?: number
}

interface CustomRequest extends Request {
	token: string | JwtPayload
	userId: string
}

interface ExpressRequest extends Request {
	user?: Document
	token?: string
}

export {
	Category,
	CustomRequest,
	DataResponse,
	JwtResponse,
	PaginateDto,
	PaginateRecord,
	Product,
	ExpressRequest,
}
