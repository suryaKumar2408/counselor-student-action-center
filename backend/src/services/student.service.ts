import { students, tasks, messages } from '../data/mockData';
import { ActionCenterResponse } from '../interfaces/actionCenter.interface';
import { NotFoundError } from '../utils/errors';

export interface StudentSummary {
  id: string;
  name: string;
}

export class StudentService {
  /** Returns id + name for every student in mockData. */
  public listStudents(): StudentSummary[] {
    return students.map(({ id, name }) => ({ id, name }));
  }

  /**
   * Fetches the detailed action center view for a specific student.
   * @param studentId The unique identifier of the student
   * @returns ActionCenterResponse object
   * @throws NotFoundError if student does not exist
   */
  public async getActionCenterDetails(studentId: string): Promise<ActionCenterResponse> {
    const student = students.find((s) => s.id === studentId);
    if (!student) {
      throw new NotFoundError(`Student with ID ${studentId} not found`);
    }

    // Filter tasks and messages for the student
    const studentTasks = tasks.filter((t) => t.studentId === studentId);
    const studentMessages = messages.filter((m) => m.studentId === studentId);

    // Calculate metadata counts
    const unreadMessagesCount = studentMessages.filter((m) => !m.read).length;
    const totalTasksCount = studentTasks.length;
    const completedTasksCount = studentTasks.filter((t) => t.status === 'completed').length;

    // Derive urgency level based on uncompleted task priorities
    const uncompletedTasks = studentTasks.filter((t) => t.status !== 'completed');
    let urgencyLevel: 'low' | 'medium' | 'high' | 'urgent' = 'low';

    const hasUrgent = uncompletedTasks.some((t) => t.priority === 'urgent');
    const hasHigh = uncompletedTasks.some((t) => t.priority === 'high');
    const hasMedium = uncompletedTasks.some((t) => t.priority === 'medium');

    if (hasUrgent) {
      urgencyLevel = 'urgent';
    } else if (hasHigh) {
      urgencyLevel = 'high';
    } else if (hasMedium) {
      urgencyLevel = 'medium';
    } else {
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
