import { Student } from './student.interface';
import { Task } from './task.interface';
import { Message } from './message.interface';

export interface Summary {
  totalTasks: number;
  completedTasks: number;
  unreadMessages: number;
  urgencyLevel: 'low' | 'medium' | 'high' | 'urgent';
}

export interface ActionCenterResponse {
  student: Student;
  tasks: Task[];
  messages: Message[];
  unreadMessagesCount: number;
  totalTasksCount: number;
  completedTasksCount: number;
  urgencyLevel: string;
  summary: Summary;
}
