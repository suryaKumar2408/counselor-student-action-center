import React from 'react';
import type { Task } from '../types';

interface PriorityBadgeProps {
  priority: Task['priority'];
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getColors = () => {
    switch (priority) {
      case 'urgent':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'high':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'medium':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'low':
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${getColors()}`}>
      {priority}
    </span>
  );
};
