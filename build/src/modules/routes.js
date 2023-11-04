"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_route_1 = __importDefault(require("./category/category.route"));
const product_route_1 = __importDefault(require("./product/product.route"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const routes = () => {
    const router = (0, express_1.Router)();
    router.use("/categories", category_route_1.default);
    router.use("/products", product_route_1.default);
    router.use("/auth", auth_route_1.default);
    return router;
};
exports.default = routes;
