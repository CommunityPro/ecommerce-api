import type { NextFunction, Request, Response } from "express"
import { HTTP } from "src/common/constants"
import { z } from "zod"

export const userSchema = z.object({
	id: z.string().optional(),
	name: z
		.string({ required_error: "name is required!!" })
		.trim()
		.min(2, { message: "name must be longer than 2 letters" }),
	email: z.string().email(),
	password: z
		.string({ required_error: "password is required!!" })
		.min(6, { message: '"password" must be more than 6 characters' }),
	apiKey: z.string({ required_error: "apiKey is required" }).min(5),
	avatar: z.string({ required_error: "avatar is required" }),
	created_at: z.date().optional(),
	updated_at: z.date().optional(),
})

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
	const { success, error, data } = userSchema.safeParse(req.body)

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
