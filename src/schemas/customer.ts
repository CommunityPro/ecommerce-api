import mongoose from "mongoose"

export interface CustomerDocument extends mongoose.Document {
	id: string
	name: string
	email: string
	avatar: string
	created_at: Date
}

const customerModel = new mongoose.Schema<CustomerDocument>(
	{
		name: { type: String, required: true },
		email: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: { type: String },
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
)

const Customer = mongoose.model<CustomerDocument>("Customer", customerModel)

export default Customer
