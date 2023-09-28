import mongoose from "mongoose"

type Option = {
	id: string
	name: string
	price?: number
	quantity?: number
	image_url?: string
	created_at: Date
	updated_at: Date
}

export interface VariantDocument extends mongoose.Document {
	id: string
	name: string
	options: Option[]
	created_at: Date
	updated_at: Date
}

const variantModel = new mongoose.Schema(
	{
		name: { type: String, required: true },
		options: [
			{
				name: { type: String, required: true }, // variant name e.g color, size etc
				options: [
					{
						type: new mongoose.Schema(
							{
								name: String, // variant option name e.g red, blue, size xl (if size is used as varinat name) etc
								price: { type: Number, default: 0 },
								quantity: { type: Number, default: 0 },
								image_url: { type: String, default: "" },
							},
							{
								timestamps: {
									createdAt: "created_at",
									updatedAt: "updated_at",
								},
							}
						),
					},
				],
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

const VariantModel = mongoose.model<VariantDocument>("Variant", variantModel)

export default VariantModel
