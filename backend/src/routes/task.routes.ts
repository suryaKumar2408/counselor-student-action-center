import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router = Router();
const taskController = new TaskController();

router.patch('/:taskId/status', taskController.updateStatus);

export default router;
