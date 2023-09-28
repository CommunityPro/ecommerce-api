import mongoose from "mongoose"
import { CategoryDocument } from "./categories"
import { VariantDocument } from "./variants"

type Assets = {
	url: string
}

export interface ProductDocument extends mongoose.Document {
	id: string
	name: string
	slug: string
	description: string
	quantity: number
	price: number
	assets: Assets[]
	categories: CategoryDocument["id"][] // one product may fall under more than one category.
	variants: VariantDocument["_id"][]
	created_at: Date
	updated_at: Date
}

const productModel = new mongoose.Schema(
	{
		name: { type: String, required: true },
		slug: {
			type: String,
			unique: true,
			required: true,
		},
		description: { type: String, default: "" },
		price: { type: Number, required: true },
		quantity: { type: Number, default: 0 },
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Category",
				required: [true, "Product must belong to a category"],
			},
		],
		assets: [
			{
				url: String,
			},
		],
		variants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Variant",
			},
		],
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
)

const ProductModel = mongoose.model<ProductDocument>("Product", productModel)

export default ProductModel
