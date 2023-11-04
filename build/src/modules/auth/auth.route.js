"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.signupController);
router.post("/signin", auth_controller_1.signinController);
exports.default = router;
