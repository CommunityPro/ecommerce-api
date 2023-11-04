import { v2 as cloudinary } from "cloudinary"

import KEYS from "./keys"

cloudinary.config({
	api_key: KEYS.cloudinary_key,
	api_secret: KEYS.cloudinary_secret,
	cloud_name: KEYS.cloudinary_name,
})

export default cloudinary
