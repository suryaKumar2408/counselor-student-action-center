"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("../services/student.service");
class StudentController {
    studentService;
    constructor() {
        this.studentService = new student_service_1.StudentService();
    }
    /**
     * GET /students/:id/action-center
     * Retrieves action center dashboard information for a student.
     */
    getActionCenter = async (req, res, next) => {
        try {
            const studentId = req.params.id;
            const data = await this.studentService.getActionCenterDetails(studentId);
            res.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    };
    /**
     * GET /students
     * Returns a lightweight list of all students (id + name only).
     */
    listStudents = (_req, res) => {
        res.status(200).json(this.studentService.listStudents());
    };
}
exports.StudentController = StudentController;
