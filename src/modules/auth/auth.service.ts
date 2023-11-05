import { v4 as uuidv4 } from "uuid"
import validator from "validator"
import bcrypt from "bcrypt"

import { JwtHelper, uploader } from "../../common/helpers"
import { DataResponse } from "../../common/interfaces"
import { SigninDto, SignupDto } from "./auth.dto"
import { User } from "../../schemas"

const Signup = async (payload: SignupDto) => {
	try {
		const { email, name, password, image } = payload
		let response: DataResponse
		if (!email || !name || !password) {
			response = {
				error: true,
				message: "Incomplete fields!",
			}
			return response
		}
		if (!validator.isEmail(email)) {
			response = {
				error: true,
				message: "Invalid email!",
			}
			return response
		}
		if (!validator.isStrongPassword(password)) {
			response = {
				error: true,
				message: "Invalid password!",
			}
			return response
		}
		const isEmailInUse = await User.findOne({ email: email })
		if (isEmailInUse) {
			response = {
				error: true,
				message: "Email is in use!",
				data: null,
			}
			return response
		}
		const url = image ? await uploader(image.path, "user") : ""
		const saltRounds = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, saltRounds)
		const user = await User.create({
			email,
			name,
			password: hashedPassword,
			avatar: url,
			api_key: uuidv4(),
		})
		if (!user) {
			response = {
				error: true,
				message: "Unable to create account!",
			}
			return response
		}
		response = {
			error: false,
			message: "Account created!",
			data: user,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create account!",
		}
		return response
	}
}

const Signin = async (payload: SigninDto) => {
	try {
		const { email, password } = payload
		let response: DataResponse
		if (!email || !password) {
			response = {
				error: true,
				message: "Incomplete credentials.",
			}
			return response
		}
		const user = await User.findOne({ email })
		if (!user) {
			response = {
				error: true,
				message: "User not found!",
			}
			return response
		}
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			response = {
				error: true,
				message: "Password does not match!",
			}
			return response
		}
		const token = await JwtHelper.sign(user._id)
		response = {
			error: false,
			message: "User signed in!",
			data: { user, token },
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to sign user in!",
		}
		return response
	}
}

export { Signin, Signup }
