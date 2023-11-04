"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productModel = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    categories: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product must belong to a category"],
    },
    assets: [
        {
            url: String,
        },
    ],
    variants: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Variant",
        },
    ],
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
const Product = mongoose_1.default.model("Product", productModel);
exports.default = Product;
