"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const mockData_1 = require("../data/mockData");
const errors_1 = require("../utils/errors");
class TaskService {
    /**
     * Updates the status of a specific task and refreshes its updatedAt timestamp.
     * @param taskId The ID of the task to update
     * @param status The new status value (todo, in_progress, completed)
     * @returns The updated Task object
     * @throws NotFoundError if the task does not exist
     * @throws BadRequestError if the status is invalid
     */
    async updateTaskStatus(taskId, status) {
        // Validate status values
        const validStatuses = ['todo', 'in_progress', 'completed'];
        if (!validStatuses.includes(status)) {
            throw new errors_1.BadRequestError(`Invalid status '${status}'. Must be one of: ${validStatuses.join(', ')}`);
        }
        const task = mockData_1.tasks.find((t) => t.id === taskId);
        if (!task) {
            throw new errors_1.NotFoundError(`Task with ID ${taskId} not found`);
        }
        // Update state in memory
        task.status = status;
        task.updatedAt = new Date().toISOString();
        return task;
    }
}
exports.TaskService = TaskService;
