"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../common/middlewares");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
router.post("/", middlewares_1.upload.array("assets"), middlewares_1.authorization.authorize, product_controller_1.createProductController);
router.patch("/", middlewares_1.upload.array("assets"), middlewares_1.authorization.authorize, product_controller_1.updateProductController);
router.get("/", product_controller_1.fetchProductsController);
router.get("/:id", product_controller_1.fetchProductController);
router.delete("/:id", middlewares_1.authorization.authorize, product_controller_1.deleteProductController);
exports.default = router;
