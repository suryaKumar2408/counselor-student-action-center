import axios from 'axios';
import type { ActionCenterResponse, Task } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : 'https://counselor-student-action-center-2.onrender.com');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getStudentActionCenter = async (studentId: string): Promise<ActionCenterResponse> => {
  const { data } = await apiClient.get<ActionCenterResponse>(`/students/${studentId}/action-center`);
  return data;
};

export interface StudentSummary {
  id: string;
  name: string;
}

export const getStudentList = async (): Promise<StudentSummary[]> => {
  const { data } = await apiClient.get<StudentSummary[]>('/students');
  return data;
};

export const updateTaskStatus = async (taskId: string, status: Task['status']): Promise<Task> => {
  const { data } = await apiClient.patch<Task>(`/tasks/${taskId}/status`, { status });
  return data;
};
