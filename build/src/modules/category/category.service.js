"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategory = exports.FetchCategory = exports.FetchCategories = exports.DeleteCategory = exports.CreateCategory = void 0;
const helpers_1 = require("../../common/helpers");
const schemas_1 = require("../../schemas");
const CreateCategory = async (payload) => {
    try {
        const { description, name, slug } = payload;
        let response;
        if (!description || !name || !slug) {
            response = {
                error: true,
                message: "Incomplete fields!",
            };
            return response;
        }
        const isInvalidSlug = await schemas_1.Category.findOne({ slug });
        if (isInvalidSlug) {
            response = {
                error: true,
                message: "This is slug is assigned to a category!",
            };
            return response;
        }
        const category = await schemas_1.Category.create({
            description,
            name,
            slug,
        });
        if (!category) {
            response = {
                error: true,
                message: "Unable to add category!",
            };
            return response;
        }
        response = {
            error: false,
            message: "Category added!",
            data: category,
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to create category!",
        };
        return response;
    }
};
exports.CreateCategory = CreateCategory;
const UpdateCategory = async (payload) => {
    try {
        const { id } = payload;
        let response;
        const category = await schemas_1.Category.findById(id);
        if (!category) {
            response = {
                error: true,
                message: "Category does not exist!",
            };
            return response;
        }
        const updatedCategory = await schemas_1.Category.findByIdAndUpdate(id, {
            ...payload,
        }, { new: true });
        if (!updatedCategory) {
            response = {
                error: true,
                message: "unable to update category!",
            };
            return response;
        }
        response = {
            error: false,
            message: "Category updated!",
            data: updatedCategory,
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to create category!",
        };
        return response;
    }
};
exports.UpdateCategory = UpdateCategory;
const FetchCategories = async (query) => {
    try {
        const { limit, page } = query;
        let response;
        const paginate = {
            model: schemas_1.Category,
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["-_v"],
        };
        const categories = await (0, helpers_1.getPaginatedRecords)(paginate, {});
        response = {
            error: false,
            message: "Categories retrieved!",
            data: categories,
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to create category!",
        };
        return response;
    }
};
exports.FetchCategories = FetchCategories;
const FetchCategory = async (id) => {
    try {
        let response;
        const category = await schemas_1.Category.findById(id);
        if (!category) {
            response = {
                error: true,
                message: "Category does not exist!",
            };
            return response;
        }
        response = {
            error: false,
            message: "Category found!",
            data: category,
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to create category!",
        };
        return response;
    }
};
exports.FetchCategory = FetchCategory;
const DeleteCategory = async (id) => {
    try {
        let response;
        const category = await schemas_1.Category.findById(id);
        if (!category) {
            response = {
                error: true,
                message: "Category does not exist!",
            };
            return response;
        }
        await schemas_1.Category.findByIdAndDelete(id);
        response = {
            error: false,
            message: "Category found!",
            data: category,
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to create category!",
        };
        return response;
    }
};
exports.DeleteCategory = DeleteCategory;
