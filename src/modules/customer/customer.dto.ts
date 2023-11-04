interface CreateUserDto {
	name: string
	email: string
	image?: Express.Multer.File
}

interface UpdateUserDto {
	name: string
	email: string
	image?: Express.Multer.File
}

export { CreateUserDto, UpdateUserDto }
