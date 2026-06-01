import { tasks } from '../data/mockData';
import { Task } from '../interfaces/task.interface';
import { NotFoundError, BadRequestError } from '../utils/errors';

export class TaskService {
  /**
   * Updates the status of a specific task and refreshes its updatedAt timestamp.
   * @param taskId The ID of the task to update
   * @param status The new status value (todo, in_progress, completed)
   * @returns The updated Task object
   * @throws NotFoundError if the task does not exist
   * @throws BadRequestError if the status is invalid
   */
  public async updateTaskStatus(taskId: string, status: string): Promise<Task> {
    // Validate status values
    const validStatuses = ['todo', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestError(
        `Invalid status '${status}'. Must be one of: ${validStatuses.join(', ')}`
      );
    }

    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      throw new NotFoundError(`Task with ID ${taskId} not found`);
    }

    // Update state in memory
    task.status = status as 'todo' | 'in_progress' | 'completed';
    task.updatedAt = new Date().toISOString();

    return task;
  }
}
