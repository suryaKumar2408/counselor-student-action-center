import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';

const router = Router();
const studentController = new StudentController();

router.get('/', studentController.listStudents);
router.get('/:id/action-center', studentController.getActionCenter);

export default router;
