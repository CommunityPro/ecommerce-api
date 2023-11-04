import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import { HTTP } from "../constants"
import { CustomRequest } from "../interfaces"
import { KEYS } from "../config"

dotenv.config()

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		let token = <string>req.headers["Access-Token"]
		if (!token)
			return res.status(HTTP.FORBIDDEN).json({ message: "No access token provided. Access denied!" })
		jwt.verify(token, KEYS.jwt_secret, (err: any, decoded: any) => {
			if (err) {
				return res.status(HTTP.UNAUTHORIZED).json({ message: "User is unathorized" })
			}
			;(req as CustomRequest).userId = decoded.id
			next()
		})
	} catch (error) {
		res.status(HTTP.UNAUTHORIZED).json({ message: "User not authenticated.", error })
	}
}

export default verifyAuthToken
