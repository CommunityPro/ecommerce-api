interface CreateCategoryDto {
	name: string
	slug: string
	description: string
}

interface UpdateCategoryDto {
	id: string
	name: string
	slug: string
	description: string
}

export { CreateCategoryDto, UpdateCategoryDto }
