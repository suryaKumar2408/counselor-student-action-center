"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const errorHandler = (err, req, res, next) => {
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            statusCode: err.statusCode,
            message: err.message,
        });
        return;
    }
    // Log unexpected errors in development/production
    console.error('Unexpected error:', err);
    res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Internal server error',
    });
};
exports.errorHandler = errorHandler;
