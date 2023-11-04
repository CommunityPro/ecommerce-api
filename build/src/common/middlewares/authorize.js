"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const schemas_1 = require("../../schemas");
const authorize = async (req, _, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        next((0, helpers_1.createError)(constants_1.HTTP.BAD_REQUEST, [
            {
                status: constants_1.RESPONSE.ERROR,
                message: "Authorization token is missing",
                statusCode: constants_1.HTTP.UNAUTHORIZED,
            },
        ]));
    }
    try {
        const { id } = await helpers_1.JwtHelper.verify(token);
        const user = await schemas_1.User.findById(id);
        if (!user) {
            return next((0, helpers_1.createError)(constants_1.HTTP.UNAUTHORIZED, [
                {
                    status: constants_1.RESPONSE.ERROR,
                    message: "Unauthorized to perform this action",
                    statusCode: constants_1.HTTP.UNAUTHORIZED,
                },
            ]));
        }
        if (user) {
            req.user = user;
            req.token = token;
            next();
        }
        else {
            next((0, helpers_1.createError)(constants_1.HTTP.BAD_REQUEST, [
                {
                    status: constants_1.RESPONSE.ERROR,
                    message: "Invalid auth token.",
                    statusCode: constants_1.HTTP.UNAUTHORIZED,
                },
            ]));
        }
    }
    catch (error) {
        return next((0, helpers_1.createError)(constants_1.HTTP.BAD_REQUEST, [
            {
                status: constants_1.RESPONSE.ERROR,
                message: error.message,
                statusCode: constants_1.HTTP.UNAUTHORIZED,
            },
        ]));
    }
};
const login = async (req, _, next) => {
    let email = req.body.email.toLowerCase();
    try {
        const user = await schemas_1.User.findOne({ email: email });
        if (!user) {
            return next((0, helpers_1.createError)(constants_1.HTTP.NOT_FOUND, [
                {
                    status: constants_1.RESPONSE.ERROR,
                    message: `User does not Exist`,
                    code: constants_1.HTTP.BAD_REQUEST,
                },
            ]));
        }
        else {
            req.user = user;
            return next();
        }
    }
    catch (err) {
        console.error(err);
        return next(helpers_1.createError.InternalServerError(err));
    }
};
exports.default = { authorize, login };
