"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
const errors_1 = require("../utils/errors");
class TaskController {
    taskService;
    constructor() {
        this.taskService = new task_service_1.TaskService();
    }
    /**
     * PATCH /tasks/:taskId/status
     * Updates the status of a specific task.
     */
    updateStatus = async (req, res, next) => {
        try {
            const taskId = req.params.taskId;
            const status = req.body.status;
            if (!status) {
                throw new errors_1.BadRequestError("Missing required body parameter 'status'");
            }
            const updatedTask = await this.taskService.updateTaskStatus(taskId, status);
            res.status(200).json(updatedTask);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.TaskController = TaskController;
