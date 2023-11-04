"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = exports.User = exports.Product = exports.Category = void 0;
const categories_1 = __importDefault(require("./categories"));
exports.Category = categories_1.default;
const variants_1 = __importDefault(require("./variants"));
exports.Variant = variants_1.default;
const product_1 = __importDefault(require("./product"));
exports.Product = product_1.default;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
