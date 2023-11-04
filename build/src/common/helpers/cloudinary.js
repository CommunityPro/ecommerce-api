"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const uploader = async (file, folder) => {
    const { secure_url } = await cloudinary_1.default.uploader.upload(file, {
        folder,
        transformation: [{ width: 300, height: 300, crop: "scale" }, { fetch_format: "webp" }],
        secure: true,
    });
    return secure_url;
};
exports.default = uploader;
