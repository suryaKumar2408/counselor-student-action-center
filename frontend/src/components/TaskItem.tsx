import React, { useState, useEffect } from 'react';
import type { Task } from '../types';
import { PriorityBadge } from './PriorityBadge';
import { useUpdateTaskStatus } from '../hooks/useUpdateTaskStatus';

interface TaskItemProps {
  task: Task;
  studentId: string;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, studentId }) => {
  const updateTask = useUpdateTaskStatus(studentId);
  const [status, setStatus] = useState<Task['status']>(task.status);
  const [showFeedback, setShowFeedback] = useState(false);

  // Sync state if task status changes from query refetch
  useEffect(() => {
    setStatus(task.status);
  }, [task.status]);

  const handleChangeStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Task['status'];
    setStatus(newStatus);
    
    try {
      await updateTask.mutateAsync({ taskId: task.id, status: newStatus });
      setShowFeedback(true);
      const timer = setTimeout(() => setShowFeedback(false), 2000);
      return () => clearTimeout(timer);
    } catch (err) {
      // Revert status on error
      setStatus(task.status);
      console.error('Failed to update task status:', err);
    }
  };

  const getStatusBorder = () => {
    if (status === 'completed') return 'border-emerald-200 bg-emerald-50/20';
    if (status === 'in_progress') return 'border-amber-200 bg-amber-50/10';
    return 'border-slate-200';
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className={`p-6 bg-white rounded-2xl border shadow-sm transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${getStatusBorder()}`}>
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h4 className={`text-base font-bold text-slate-800 ${status === 'completed' ? 'line-through text-slate-400' : ''}`}>
            {task.title}
          </h4>
          <PriorityBadge priority={task.priority} />
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${
            status === 'completed' 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
              : status === 'in_progress' 
              ? 'bg-amber-50 text-amber-700 border-amber-100' 
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            {status.replace('_', ' ')}
          </span>
        </div>
        <p className={`text-sm text-slate-500 ${status === 'completed' ? 'text-slate-400' : ''}`}>
          {task.description}
        </p>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          Due: {formatDate(task.dueDate)}
        </div>
      </div>

      <div className="flex items-center gap-3 self-end md:self-center">
        {showFeedback && (
          <span className="text-xs font-bold text-emerald-600 animate-fade-in-out flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Saved!
          </span>
        )}
        
        {updateTask.isPending && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-900 border-t-transparent" />
        )}

        <div className="relative">
          <select
            value={status}
            onChange={handleChangeStatus}
            disabled={updateTask.isPending}
            className="appearance-none pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl cursor-pointer transition-all hover:bg-slate-100 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
