"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = void 0;
const errorResponse = (res, statusCode = 500, error) => res.status(statusCode).json(error);
exports.errorResponse = errorResponse;
const successResponse = (res, statusCode = 200, data) => res.status(statusCode).json(data);
exports.successResponse = successResponse;
