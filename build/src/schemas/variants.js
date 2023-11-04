"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const variantModel = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    options: [
        {
            name: { type: String, required: true },
            options: [
                {
                    type: new mongoose_1.default.Schema({
                        name: String,
                        price: { type: Number, default: 0 },
                        quantity: { type: Number, default: 0 },
                        image_url: { type: String, default: "" },
                    }, {
                        timestamps: {
                            createdAt: "created_at",
                            updatedAt: "updated_at",
                        },
                    }),
                },
            ],
        },
    ],
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
const VariantModel = mongoose_1.default.model("Variant", variantModel);
exports.default = VariantModel;
