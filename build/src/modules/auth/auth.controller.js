"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = exports.signinController = void 0;
const helpers_1 = require("../../common/helpers");
const constants_1 = require("../../common/constants");
const auth_service_1 = require("./auth.service");
const signupController = async (req, res, next) => {
    try {
        const payload = { ...req.body };
        const { error, message, data } = await (0, auth_service_1.Signup)(payload);
        if (error) {
            return next((0, helpers_1.createError)(constants_1.HTTP.BAD_REQUEST, [
                {
                    status: constants_1.RESPONSE.ERROR,
                    message,
                    statusCode: data instanceof Error ? constants_1.HTTP.SERVER_ERROR : constants_1.HTTP.BAD_REQUEST,
                    data,
                },
            ]));
        }
        return (0, helpers_1.createResponse)(message, data)(res, constants_1.HTTP.CREATED);
    }
    catch (error) {
        console.log(error);
        return next(helpers_1.createError.InternalServerError(error));
    }
};
exports.signupController = signupController;
const signinController = async (req, res, next) => {
    try {
        const payload = { ...req.body };
        const { error, message, data } = await (0, auth_service_1.Signin)(payload);
        if (error) {
            return next((0, helpers_1.createError)(constants_1.HTTP.BAD_REQUEST, [
                {
                    status: constants_1.RESPONSE.ERROR,
                    message,
                    statusCode: data instanceof Error ? constants_1.HTTP.SERVER_ERROR : constants_1.HTTP.BAD_REQUEST,
                    data,
                },
            ]));
        }
        return (0, helpers_1.createResponse)(message, data)(res, constants_1.HTTP.CREATED);
    }
    catch (error) {
        console.log(error);
        return next(helpers_1.createError.InternalServerError(error));
    }
};
exports.signinController = signinController;
