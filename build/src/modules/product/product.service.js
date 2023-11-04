"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = exports.FetchProducts = exports.FetchProduct = exports.DeleteProduct = exports.CreateProduct = void 0;
const helpers_1 = require("../../common/helpers");
const schemas_1 = require("../../schemas");
const CreateProduct = async (payload) => {
    try {
        const { assets, category, description, name, price, quantity, slug, variants } = payload;
        let response;
        if (!assets || !category || !description || !name || !price || !quantity || !slug) {
            response = {
                error: true,
                message: "Incomplete fields!",
            };
            return response;
        }
        const isInvalidSlug = await schemas_1.Product.findOne({ slug });
        if (isInvalidSlug) {
            response = {
                error: true,
                message: "This is slug is assigned to a product!",
            };
            return response;
        }
        const intendedCategory = await schemas_1.Category.findById(category);
        if (!intendedCategory) {
            response = {
                error: true,
                message: "A valid category is required!",
            };
            return response;
        }
        const image_urls = [];
        assets.forEach(async (asset) => {
            const url = await (0, helpers_1.uploader)(asset.path, "products");
            image_urls.push({ url });
        });
        const product = await schemas_1.Product.create({
            name,
            slug,
            category: intendedCategory._id,
            description,
            price,
            quantity,
            variants,
            assets: image_urls,
        });
        if (!product) {
            response = {
                error: true,
                message: "Unable to add produc!",
            };
            return response;
        }
        response = {
            error: false,
            message: "Product added!",
            data: product,
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to create product!",
        };
        return response;
    }
};
exports.CreateProduct = CreateProduct;
const UpdateProduct = async (payload) => {
    try {
        const { assets, id } = payload;
        let response;
        const product = await schemas_1.Product.findById(id);
        if (!product) {
            response = {
                error: true,
                message: "Product does not exist!",
            };
            return response;
        }
        const image_urls = [];
        assets.forEach(async (asset) => {
            const url = await (0, helpers_1.uploader)(asset.path, "products");
            image_urls.push({ url });
        });
        const updatedProduct = await schemas_1.Product.findByIdAndUpdate(id, {
            ...payload,
            assets: image_urls,
        }, { new: true });
        if (!updatedProduct) {
            response = {
                error: true,
                message: "unable to update product!",
            };
            return response;
        }
        response = {
            error: false,
            message: "Product updated!",
            data: updatedProduct,
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to update product!",
        };
        return response;
    }
};
exports.UpdateProduct = UpdateProduct;
const FetchProducts = async (query) => {
    try {
        const { limit, page } = query;
        let response;
        const paginate = {
            model: schemas_1.Product,
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["-_v"],
        };
        const products = await (0, helpers_1.getPaginatedRecords)(paginate, {});
        response = {
            error: false,
            message: "Products retrieved!",
            data: products,
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to fetch products!",
        };
        return response;
    }
};
exports.FetchProducts = FetchProducts;
const FetchProduct = async (id) => {
    try {
        let response;
        const product = await schemas_1.Product.findById(id);
        if (!product) {
            response = {
                error: true,
                message: "Product does not exist!",
            };
            return response;
        }
        response = {
            error: false,
            message: "Product found!",
            data: product,
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to fetch product!",
        };
        return response;
    }
};
exports.FetchProduct = FetchProduct;
const DeleteProduct = async (id) => {
    try {
        let response;
        const product = await schemas_1.Product.findById(id);
        if (!product) {
            response = {
                error: true,
                message: "Product does not exist!",
            };
            return response;
        }
        await schemas_1.Product.findByIdAndDelete(id);
        response = {
            error: false,
            message: "Product found!",
            data: product,
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to delete product!",
        };
        return response;
    }
};
exports.DeleteProduct = DeleteProduct;
