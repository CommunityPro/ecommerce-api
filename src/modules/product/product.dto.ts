interface CreateProductDto {
	name: string
	slug: string
	description: string
	quantity: number
	price: number
	assets: Express.Multer.File[]
	category: string
	variants: string[]
}

interface UpdateProductDto {
	id: string
	name: string
	slug: string
	description: string
	quantity: number
	price: number
	assets: Express.Multer.File[]
	categories: string[]
	variants: string[]
}

export { CreateProductDto, UpdateProductDto }
