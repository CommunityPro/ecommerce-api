"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./common/constants");
const helpers_1 = require("./common/helpers");
const config_1 = require("./common/config");
const routes_1 = __importDefault(require("./modules/routes"));
const App = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use(function (_err, _req, _res, _) {
        if (_err instanceof SyntaxError) {
            return _res.status(constants_1.HTTP.BAD_REQUEST).json({
                code: constants_1.HTTP.UNPROCESSABLE_ENTITY,
                status: constants_1.RESPONSE.ERROR,
                message: "Invalid JSON payload passed.",
                data: null,
            });
        }
    });
    const router = (0, express_1.Router)();
    router.use((0, routes_1.default)());
    router.use((_req, _res, next) => {
        next((0, helpers_1.createError)(constants_1.HTTP.NOT_FOUND, [
            {
                code: constants_1.HTTP.NOT_FOUND,
                status: constants_1.RESPONSE.ERROR,
                message: "Route not found.",
                data: null,
            },
        ]));
    });
    router.use((error, _req, res, _next) => {
        console.log(error);
        const initialError = error;
        if (!error.statusCode) {
            error = (0, helpers_1.createError)(constants_1.HTTP.SERVER_ERROR, [
                {
                    code: constants_1.HTTP.SERVER_ERROR,
                    status: constants_1.RESPONSE.ERROR,
                    message: initialError.message || "Internal Server Error.",
                    data: error.data,
                    stack: error.stack,
                },
            ]);
        }
        return res.status(error.statusCode).json({
            code: error.code,
            status: error.status,
            message: error.message,
            data: error.data || null,
            ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
        });
    });
    app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../docs/.vitepress/dist/")));
    const API_URL = `/api/${config_1.KEYS.app_version}`;
    app.get(API_URL, async (_req, res) => res.send({ message: "Welcome to eCommerce API" }));
    return app;
};
exports.default = App;
