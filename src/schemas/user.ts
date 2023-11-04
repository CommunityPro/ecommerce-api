import validator from "validator"
import mongoose from "mongoose"

export interface UserDocument extends mongoose.Document {
	id: string
	name: string
	email: string
	password: string
	avatar: string
	created_at: Date
	updated_at: Date
}

const userModel = new mongoose.Schema<UserDocument>(
	{
		name: { type: String, required: true },
		email: {
			type: String,
			required: true,
			unique: true,
			validate: (value: string) => validator.isEmail(value),
		},
		password: { type: String, validate: (value: string) => validator.isStrongPassword(value) },
		avatar: { type: String },
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
)

const User = mongoose.model<UserDocument>("User", userModel)

export default User
