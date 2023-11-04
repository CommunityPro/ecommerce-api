import mongoose from "mongoose"

export interface CategoryDocument extends mongoose.Document {
	id: string
	name: string
	slug: string
	description: string
	noOfProducts: number
	created_at: Date
	updated_at: Date
}

const catgoryModel = new mongoose.Schema(
	{
		name: { type: String, required: true },
		slug: {
			type: String,
			unique: true,
			required: true,
		},
		description: { type: String, required: true },
		noOfProducts: { type: Number, required: true, default: 0 },
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
)

const Category = mongoose.model<CategoryDocument>("Category", catgoryModel)

export default Category
