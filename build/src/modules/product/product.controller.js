"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductController = exports.fetchProductsController = exports.fetchProductController = exports.deleteProductController = exports.createProductController = void 0;
const helpers_1 = require("../../common/helpers");
const constants_1 = require("../../common/constants");
const product_service_1 = require("./product.service");
const createProductController = async (req, res, next) => {
    try {
        const payload = { ...req.body };
        const { error, message, data } = await (0, product_service_1.CreateProduct)(payload);
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
exports.createProductController = createProductController;
const updateProductController = async (req, res, next) => {
    try {
        const payload = { ...req.body };
        const { error, message, data } = await (0, product_service_1.UpdateProduct)(payload);
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
        return (0, helpers_1.createResponse)(message, data)(res, constants_1.HTTP.OK);
    }
    catch (error) {
        console.log(error);
        return next(helpers_1.createError.InternalServerError(error));
    }
};
exports.updateProductController = updateProductController;
const fetchProductsController = async (req, res, next) => {
    try {
        const query = { ...req.query };
        const { error, message, data } = await (0, product_service_1.FetchProducts)(query);
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
        return (0, helpers_1.createResponse)(message, data)(res, constants_1.HTTP.OK);
    }
    catch (error) {
        console.log(error);
        return next(helpers_1.createError.InternalServerError(error));
    }
};
exports.fetchProductsController = fetchProductsController;
const fetchProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error, message, data } = await (0, product_service_1.FetchProduct)(id);
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
        return (0, helpers_1.createResponse)(message, data)(res, constants_1.HTTP.OK);
    }
    catch (error) {
        console.log(error);
        return next(helpers_1.createError.InternalServerError(error));
    }
};
exports.fetchProductController = fetchProductController;
const deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error, message, data } = await (0, product_service_1.DeleteProduct)(id);
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
        return (0, helpers_1.createResponse)(message, data)(res, constants_1.HTTP.OK);
    }
    catch (error) {
        console.log(error);
        return next(helpers_1.createError.InternalServerError(error));
    }
};
exports.deleteProductController = deleteProductController;
