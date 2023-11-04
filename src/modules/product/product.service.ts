import { DataResponse, PaginateDto, PaginateRecord } from "../../common/interfaces"
import { getPaginatedRecords, uploader } from "../../common/helpers"
import { CreateProductDto, UpdateProductDto } from "./product.dto"
import { Category, Product } from "../../schemas"

const CreateProduct = async (payload: CreateProductDto) => {
	try {
		const { assets, category, description, name, price, quantity, slug, variants } = payload
		let response: DataResponse
		if (!assets || !category || !description || !name || !price || !quantity || !slug) {
			response = {
				error: true,
				message: "Incomplete fields!",
			}
			return response
		}
		const isInvalidSlug = await Product.findOne({ slug })
		if (isInvalidSlug) {
			response = {
				error: true,
				message: "This is slug is assigned to a product!",
			}
			return response
		}
		const intendedCategory = await Category.findById(category)
		if (!intendedCategory) {
			response = {
				error: true,
				message: "A valid category is required!",
			}
			return response
		}
		const image_urls: { url: string }[] = []
		assets.forEach(async (asset) => {
			const url = await uploader(asset.path, "products")
			image_urls.push({ url })
		})
		const product = await Product.create({
			name,
			slug,
			category: intendedCategory._id,
			description,
			price,
			quantity,
			variants,
			assets: image_urls,
		})
		if (!product) {
			response = {
				error: true,
				message: "Unable to add produc!",
			}
			return response
		}
		response = {
			error: false,
			message: "Product added!",
			data: product,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create product!",
		}
		return response
	}
}

const UpdateProduct = async (payload: UpdateProductDto) => {
	try {
		const { assets, id } = payload
		let response: DataResponse
		const product = await Product.findById(id)
		if (!product) {
			response = {
				error: true,
				message: "Product does not exist!",
			}
			return response
		}
		const image_urls: { url: string }[] = []
		assets.forEach(async (asset) => {
			const url = await uploader(asset.path, "products")
			image_urls.push({ url })
		})
		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{
				...payload,
				assets: image_urls,
			},
			{ new: true }
		)
		if (!updatedProduct) {
			response = {
				error: true,
				message: "unable to update product!",
			}
			return response
		}
		response = {
			error: false,
			message: "Product updated!",
			data: updatedProduct,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to update product!",
		}
		return response
	}
}

const FetchProducts = async (query: PaginateDto) => {
	try {
		const { limit, page } = query
		let response: DataResponse
		const paginate: PaginateRecord = {
			model: Product,
			limit: Number(limit),
			page: Number(page),
			selectedFields: ["-_v"],
		}
		const products = await getPaginatedRecords(paginate, { specifiedLimit: Number(limit) })
		response = {
			error: false,
			message: "Products retrieved!",
			data: products,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to fetch products!",
		}
		return response
	}
}

const FetchProduct = async (id: string) => {
	try {
		let response: DataResponse
		const product = await Product.findById(id)
		if (!product) {
			response = {
				error: true,
				message: "Product does not exist!",
			}
			return response
		}
		response = {
			error: false,
			message: "Product found!",
			data: product,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to fetch product!",
		}
		return response
	}
}

const DeleteProduct = async (id: string) => {
	try {
		let response: DataResponse
		const product = await Product.findById(id)
		if (!product) {
			response = {
				error: true,
				message: "Product does not exist!",
			}
			return response
		}
		await Product.findByIdAndDelete(id)
		response = {
			error: false,
			message: "Product found!",
			data: product,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to delete product!",
		}
		return response
	}
}

export { CreateProduct, DeleteProduct, FetchProduct, FetchProducts, UpdateProduct }
