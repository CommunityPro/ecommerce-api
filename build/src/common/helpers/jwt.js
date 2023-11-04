"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const sign = (userId) => {
    try {
        const id = jsonwebtoken_1.default.verify(userId, config_1.KEYS.jwt_secret);
        return id;
    }
    catch (error) {
        console.log(error);
        return {};
    }
};
const verify = (token) => {
    try {
        const id = jsonwebtoken_1.default.verify(token, config_1.KEYS.jwt_secret);
        return id;
    }
    catch (error) {
        console.log(error);
        return {};
    }
};
const decode = (token) => {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch (error) {
        console.log(error);
        return {};
    }
};
exports.default = { decode, sign, verify };
