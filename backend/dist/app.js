"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const errors_1 = require("./utils/errors");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/students', student_routes_1.default);
app.use('/tasks', task_routes_1.default);
// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(new errors_1.NotFoundError(`Path not found: ${req.originalUrl}`));
});
// Global Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
