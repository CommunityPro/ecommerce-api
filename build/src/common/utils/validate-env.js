"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("../constants");
dotenv_1.default.config();
const EnvVariables = process.env;
const validateEnvs = () => {
    constants_1.requiredServerEnvs.forEach((env) => {
        if (!EnvVariables[env]) {
            throw new Error("Missing required env variable: " + env);
        }
    });
};
exports.default = validateEnvs;
