"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const createError = (status, data) => {
    return {
        status: data[0].status,
        message: data[0].message,
        data: data[0].data,
        stack: new Error().stack,
        statusCode: status,
    };
};
createError.InternalServerError = (data) => createError(constants_1.HTTP.SERVER_ERROR, [
    {
        status: constants_1.RESPONSE.ERROR,
        message: data.message || "Internal Server Error.",
        data,
        stack: process.env.NODE === "development" ? new Error().stack : undefined,
    },
]);
exports.default = createError;
