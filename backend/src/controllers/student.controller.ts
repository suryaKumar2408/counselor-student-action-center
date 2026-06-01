import { Request, Response, NextFunction } from 'express';
import { StudentService } from '../services/student.service';

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  /**
   * GET /students/:id/action-center
   * Retrieves action center dashboard information for a student.
   */
  public getActionCenter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const studentId = req.params.id as string;
      const data = await this.studentService.getActionCenterDetails(studentId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /students
   * Returns a lightweight list of all students (id + name only).
   */
  public listStudents = (_req: Request, res: Response): void => {
    res.status(200).json(this.studentService.listStudents());
  };
}
