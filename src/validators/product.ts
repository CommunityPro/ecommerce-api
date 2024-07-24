import type { NextFunction, Request, Response } from "express"
import { HTTP } from "src/common/constants"
import { z } from "zod"

export const customerSchema = z.object({
	id: z.string().optional(),
	name: z
		.string({ required_error: "name is required!!" })
		.trim()
		.min(2, { message: "name must be longer than 2 letters" }),
	slug: z.string().optional(),
	description: z
		.string({ required_error: "description is required!!" })
		.trim()
		.min(5, { message: '"description" image must be more than 5 letters long' }),
	price: z.number({ coerce: true }).min(0.1),
	quantity: z.number({ coerce: true }).default(0),
	assets: z.array(z.string(), {
		invalid_type_error: "assets must be an array of string",
		required_error: "assets is required",
	}),
	categories: z
		.string({ required_error: "product must belong to a category, category id is required" })
		.min(7),
	variants: z.string().optional(),
	created_at: z.date().optional(),
	updated_at: z.date().optional(),
})

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
	const { success, error, data } = customerSchema.safeParse(req.body)

	if (!success) {
		const errors = error.flatten().fieldErrors
		// it's not a bad request if we can't process the data.
		// or should we use "400" (BAD_REQUEST) instead ??
		return res.status(HTTP.UNPROCESSABLE_ENTITY).json({
			status: success,
			// only send one error at a time,
			// should we send a list of errors ??
			message: Object.values(errors).flat()[0],
		})
	}

	req.body = data
	next()
}
