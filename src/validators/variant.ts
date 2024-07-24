import type { NextFunction, Request, Response } from "express"
import { HTTP } from "src/common/constants"
import { z } from "zod"

const variantOption = z.object({
	id: z.string(),
	name: z.string(),
	price: z.number().optional(),
	quantity: z.number().optional(),
	image_url: z.string().optional(),
	created_at: z.date().optional(),
	updated_at: z.date().optional(),
})

export const variantSchema = z.object({
	id: z.string().optional(),
	name: z
		.string({ required_error: "name is required!!" })
		.trim()
		.min(2, { message: "name must be longer than 2 letters" }),
	options: z.array(variantOption).optional(), // should this be optional ??
	created_at: z.date().optional(),
	updated_at: z.date().optional(),
})

export const validateVariant = (req: Request, res: Response, next: NextFunction) => {
	const { success, error, data } = variantSchema.safeParse(req.body)

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
