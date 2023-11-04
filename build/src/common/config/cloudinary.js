"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const keys_1 = __importDefault(require("./keys"));
cloudinary_1.v2.config({
    api_key: keys_1.default.cloudinary_key,
    api_secret: keys_1.default.cloudinary_secret,
    cloud_name: keys_1.default.cloudinary_name,
});
exports.default = cloudinary_1.v2;
