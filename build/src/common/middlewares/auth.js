"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("../constants");
const config_1 = require("../config");
dotenv_1.default.config();
const verifyAuthToken = (req, res, next) => {
    try {
        let token = req.headers["Access-Token"];
        if (!token)
            return res.status(constants_1.HTTP.FORBIDDEN).json({ message: "No access token provided. Access denied!" });
        jsonwebtoken_1.default.verify(token, config_1.KEYS.jwt_secret, (err, decoded) => {
            if (err) {
                return res.status(constants_1.HTTP.UNAUTHORIZED).json({ message: "User is unathorized" });
            }
            ;
            req.userId = decoded.id;
            next();
        });
    }
    catch (error) {
        res.status(constants_1.HTTP.UNAUTHORIZED).json({ message: "User not authenticated.", error });
    }
};
exports.default = verifyAuthToken;
