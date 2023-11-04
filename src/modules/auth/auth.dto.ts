interface SignupDto {
	email: string
	name: string
	password: string
	image?: Express.Multer.File
}

interface SigninDto {
	email: string
	password: string
}

export { SigninDto, SignupDto }
