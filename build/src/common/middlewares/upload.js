"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.memoryStorage();
const limits = { fileSize: 5 * 1024 * 1024 };
const checkFileType = (file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|svg|webp/i;
    const validExt = fileTypes.test(path_1.default.extname(file.originalname));
    const validMimeType = fileTypes.test(file.mimetype);
    if (validExt && validMimeType) {
        return cb(null, true);
    }
    cb("Error: Only images are allowed!");
};
const fileFilter = (_req, file, cb) => {
    checkFileType(file, cb);
};
const upload = (0, multer_1.default)({ storage, limits, fileFilter });
exports.default = upload;
