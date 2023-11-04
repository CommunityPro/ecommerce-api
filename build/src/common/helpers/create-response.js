"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createResponse = (message, data = [], status = "success") => (res, code) => {
    return res.status(code).json({ code, status, message, data });
};
exports.default = createResponse;
