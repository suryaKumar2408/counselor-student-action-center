import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { BadRequestError } from '../utils/errors';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  /**
   * PATCH /tasks/:taskId/status
   * Updates the status of a specific task.
   */
  public updateStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const taskId = req.params.taskId as string;
      const status = req.body.status as string;

      if (!status) {
        throw new BadRequestError("Missing required body parameter 'status'");
      }

      const updatedTask = await this.taskService.updateTaskStatus(taskId, status);
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  };
}
