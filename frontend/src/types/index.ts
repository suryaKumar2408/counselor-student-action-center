export interface Student {
  id: string;
  name: string;
  email: string;
  grade: number;
  gpa: number;
  enrollmentStatus: string; // 'at_risk' | 'active'
}

export interface Task {
  id: string;
  studentId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  studentId: string;
  from: string;
  subject: string;
  preview: string;
  read: boolean;
  receivedAt: string;
}

export interface Summary {
  totalTasks: number;
  completedTasks: number;
  unreadMessages: number;
  urgencyLevel: 'low' | 'medium' | 'high' | 'urgent';
}

export interface ActionCenterResponse {
  student: Student;
  summary: Summary;
  tasks: Task[];
  messages: Message[];
}
