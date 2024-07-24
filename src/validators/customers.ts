import type { NextFunction, Request, Response } from "express"
import { HTTP } from "src/common/constants"
import { z } from "zod"

export const customerSchema = z.object({
	id: z.string().optional(),
	name: z
		.string({ required_error: "name is required!!" })
		.trim()
		.min(2, { message: "name must be longer than 2 letters" }),
	email: z.string().email(),
	avatar: z
		.string({ required_error: "avatar is required!!" })
		.trim()
		.min(5, { message: '"avatar" image must be more than 5 letters long' }),
	created_at: z.date().optional(),
})

export const validateCustomer = (req: Request, res: Response, next: NextFunction) => {
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
