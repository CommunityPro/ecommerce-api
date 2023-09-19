interface Category {
	id?: number
	name: string
}

interface Product {
	id?: number
	name: string
	price: number
	description: string
	category: Category
	image: string
}

export { Category, Product }
