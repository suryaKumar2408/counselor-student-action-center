"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const mockData_1 = require("../data/mockData");
const errors_1 = require("../utils/errors");
class StudentService {
    /** Returns id + name for every student in mockData. */
    listStudents() {
        return mockData_1.students.map(({ id, name }) => ({ id, name }));
    }
    /**
     * Fetches the detailed action center view for a specific student.
     * @param studentId The unique identifier of the student
     * @returns ActionCenterResponse object
     * @throws NotFoundError if student does not exist
     */
    async getActionCenterDetails(studentId) {
        const student = mockData_1.students.find((s) => s.id === studentId);
        if (!student) {
            throw new errors_1.NotFoundError(`Student with ID ${studentId} not found`);
        }
        // Filter tasks and messages for the student
        const studentTasks = mockData_1.tasks.filter((t) => t.studentId === studentId);
        const studentMessages = mockData_1.messages.filter((m) => m.studentId === studentId);
        // Calculate metadata counts
        const unreadMessagesCount = studentMessages.filter((m) => !m.read).length;
        const totalTasksCount = studentTasks.length;
        const completedTasksCount = studentTasks.filter((t) => t.status === 'completed').length;
        // Derive urgency level based on uncompleted task priorities
        const uncompletedTasks = studentTasks.filter((t) => t.status !== 'completed');
        let urgencyLevel = 'low';
        const hasUrgent = uncompletedTasks.some((t) => t.priority === 'urgent');
        const hasHigh = uncompletedTasks.some((t) => t.priority === 'high');
        const hasMedium = uncompletedTasks.some((t) => t.priority === 'medium');
        if (hasUrgent) {
            urgencyLevel = 'urgent';
        }
        else if (hasHigh) {
            urgencyLevel = 'high';
        }
        else if (hasMedium) {
            urgencyLevel = 'medium';
        }
        else {
            urgencyLevel = 'low';
        }
        return {
            student,
            tasks: studentTasks,
            messages: studentMessages,
            unreadMessagesCount,
            totalTasksCount,
            completedTasksCount,
            urgencyLevel,
            summary: {
                totalTasks: totalTasksCount,
                completedTasks: completedTasksCount,
                unreadMessages: unreadMessagesCount,
                urgencyLevel,
            },
        };
    }
}
exports.StudentService = StudentService;
