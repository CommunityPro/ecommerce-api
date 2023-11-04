import { Request } from "express"
import multer from "multer"
import path from "path"

const storage = multer.memoryStorage()

const limits = { fileSize: 5 * 1024 * 1024 }

const checkFileType = (file: any, cb: Function) => {
	const fileTypes: RegExp = /jpeg|jpg|png|gif|svg|webp/i

	const validExt = fileTypes.test(path.extname(file.originalname))
	const validMimeType = fileTypes.test(file.mimetype)
	if (validExt && validMimeType) {
		return cb(null, true)
	}
	cb("Error: Only images are allowed!")
}

const fileFilter = (_req: Request, file: any, cb: Function) => {
	checkFileType(file, cb)
}

const upload = multer({ storage, limits, fileFilter })

export default upload
