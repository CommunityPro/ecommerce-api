"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const KEYS = {
    app_version: process.env.APP_VERSION,
    cloudinary_key: process.env.CLOUDINARY_KEY,
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_secret: process.env.CLOUDINARY_SECRET,
    jwt_secret: process.env.JWT_SECRET,
    mongo_uri: process.env.MONGO_URI,
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
};
exports.default = KEYS;
