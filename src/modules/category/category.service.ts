import { DataResponse, PaginateDto, PaginateRecord } from "../../common/interfaces"
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto"
import { getPaginatedRecords } from "../../common/helpers"
import { Category } from "../../schemas"

const CreateCategory = async (payload: CreateCategoryDto) => {
	try {
		const { description, name, slug } = payload
		let response: DataResponse
		if (!description || !name || !slug) {
			response = {
				error: true,
				message: "Incomplete fields!",
			}
			return response
		}
		const isInvalidSlug = await Category.findOne({ slug })
		if (isInvalidSlug) {
			response = {
				error: true,
				message: "This is slug is assigned to a category!",
			}
			return response
		}
		const category = await Category.create({
			description,
			name,
			slug,
		})
		if (!category) {
			response = {
				error: true,
				message: "Unable to add category!",
			}
			return response
		}
		response = {
			error: false,
			message: "Category added!",
			data: category,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create category!",
		}
		return response
	}
}

const UpdateCategory = async (payload: UpdateCategoryDto) => {
	try {
		const { id } = payload
		let response: DataResponse
		const category = await Category.findById(id)
		if (!category) {
			response = {
				error: true,
				message: "Category does not exist!",
			}
			return response
		}
		const updatedCategory = await Category.findByIdAndUpdate(
			id,
			{
				...payload,
			},
			{ new: true }
		)
		if (!updatedCategory) {
			response = {
				error: true,
				message: "unable to update category!",
			}
			return response
		}
		response = {
			error: false,
			message: "Category updated!",
			data: updatedCategory,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create category!",
		}
		return response
	}
}

const FetchCategories = async (query: PaginateDto) => {
	try {
		const { limit, page } = query
		let response: DataResponse
		const paginate: PaginateRecord = {
			model: Category,
			limit: Number(limit),
			page: Number(page),
			selectedFields: ["-_v"],
		}
		const categories = await getPaginatedRecords(paginate, { specifiedLimit: Number(limit) })
		response = {
			error: false,
			message: "Categories retrieved!",
			data: categories,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create category!",
		}
		return response
	}
}

const FetchCategory = async (id: string) => {
	try {
		let response: DataResponse
		const category = await Category.findById(id)
		if (!category) {
			response = {
				error: true,
				message: "Category does not exist!",
			}
			return response
		}
		response = {
			error: false,
			message: "Category found!",
			data: category,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create category!",
		}
		return response
	}
}

const DeleteCategory = async (id: string) => {
	try {
		let response: DataResponse
		const category = await Category.findById(id)
		if (!category) {
			response = {
				error: true,
				message: "Category does not exist!",
			}
			return response
		}
		await Category.findByIdAndDelete(id)
		response = {
			error: false,
			message: "Category found!",
			data: category,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create category!",
		}
		return response
	}
}

export { CreateCategory, DeleteCategory, FetchCategories, FetchCategory, UpdateCategory }
