import React from 'react';
import type { Summary } from '../types';

interface SummaryCardsProps {
  summary: Summary;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const getUrgencyColors = (level: Summary['urgencyLevel']) => {
    switch (level) {
      case 'urgent':
        return {
          bg: 'bg-rose-50 border-rose-100',
          text: 'text-rose-700',
          indicator: 'bg-rose-500',
        };
      case 'high':
        return {
          bg: 'bg-amber-50 border-amber-100',
          text: 'text-amber-700',
          indicator: 'bg-amber-500',
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50 border-yellow-100',
          text: 'text-yellow-700',
          indicator: 'bg-yellow-500',
        };
      case 'low':
      default:
        return {
          bg: 'bg-emerald-50 border-emerald-100',
          text: 'text-emerald-700',
          indicator: 'bg-emerald-500',
        };
    }
  };

  const urgency = getUrgencyColors(summary.urgencyLevel);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Tasks Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between transition-all hover:shadow-md hover:border-slate-300">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Tasks</h3>
          <p className="text-3xl font-extrabold text-slate-800 mt-1">{summary.totalTasks}</p>
        </div>
        <div className="p-3 bg-slate-50 text-slate-500 rounded-xl border border-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.48-1.72-1.72m0 0a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l5.25-5.25a.75.75 0 0 0-1.06-1.06l-4.72 4.72Z" />
          </svg>
        </div>
      </div>

      {/* Completed Tasks Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between transition-all hover:shadow-md hover:border-slate-300">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed Tasks</h3>
          <p className="text-3xl font-extrabold text-slate-800 mt-1">{summary.completedTasks}</p>
        </div>
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
        </div>
      </div>

      {/* Unread Messages Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between transition-all hover:shadow-md hover:border-slate-300">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Unread Messages</h3>
          <p className="text-3xl font-extrabold text-slate-800 mt-1">{summary.unreadMessages}</p>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </div>
      </div>

      {/* Urgency Level Card */}
      <div className={`rounded-2xl border shadow-sm p-6 flex items-center justify-between transition-all hover:shadow-md ${urgency.bg}`}>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Urgency Level</h3>
          <p className={`text-2xl font-black mt-1 uppercase flex items-center gap-1.5 ${urgency.text}`}>
            <span className={`w-2.5 h-2.5 rounded-full inline-block animate-ping ${urgency.indicator}`} />
            {summary.urgencyLevel}
          </p>
        </div>
        <div className={`p-3 rounded-xl border ${urgency.bg} ${urgency.text}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
