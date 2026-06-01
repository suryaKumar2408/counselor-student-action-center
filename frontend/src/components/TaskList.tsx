import React from 'react';
import type { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  studentId: string;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, studentId }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 border-dashed rounded-2xl text-center">
        <div className="p-3 bg-slate-100 text-slate-400 rounded-full mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.48-1.72-1.72m0 0a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l5.25-5.25a.75.75 0 0 0-1.06-1.06l-4.72 4.72Z" />
          </svg>
        </div>
        <h4 className="text-sm font-bold text-slate-700">No Tasks Assigned</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-[200px]">There are no action tasks set up for this student.</p>
      </div>
    );
  }

  // Sort tasks: put uncompleted tasks first, completed tasks last
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    // Secondary sort: urgency priority
    const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 };
    return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
  });

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} studentId={studentId} />
      ))}
    </div>
  );
};
