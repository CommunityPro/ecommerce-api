"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryController = exports.fetchCategoryController = exports.fetchCategoriesController = exports.deleteCategoryController = exports.createCategoryController = void 0;
const helpers_1 = require("../../common/helpers");
const constants_1 = require("../../common/constants");
const category_service_1 = require("./category.service");
const createCategoryController = async (req, res, next) => {
    try {
        const payload = { ...req.body };
        const { error, message, data } = await (0, category_service_1.CreateCategory)(payload);
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
exports.createCategoryController = createCategoryController;
const updateCategoryController = async (req, res, next) => {
    try {
        const payload = { ...req.body };
        const { error, message, data } = await (0, category_service_1.UpdateCategory)(payload);
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
exports.updateCategoryController = updateCategoryController;
const fetchCategoriesController = async (req, res, next) => {
    try {
        const query = { ...req.query };
        const { error, message, data } = await (0, category_service_1.FetchCategories)(query);
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
exports.fetchCategoriesController = fetchCategoriesController;
const fetchCategoryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error, message, data } = await (0, category_service_1.FetchCategory)(id);
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
exports.fetchCategoryController = fetchCategoryController;
const deleteCategoryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error, message, data } = await (0, category_service_1.DeleteCategory)(id);
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
exports.deleteCategoryController = deleteCategoryController;
