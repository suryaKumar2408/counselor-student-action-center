import React from 'react';
import type { Message } from '../types';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUnread = !message.read;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className={`p-5 bg-white rounded-2xl border shadow-sm transition-all duration-300 relative overflow-hidden ${
      isUnread 
        ? 'border-blue-200 bg-blue-50/10 shadow-blue-50/50' 
        : 'border-slate-200 hover:border-slate-300'
    }`}>
      {/* Accent strip for unread messages */}
      {isUnread && (
        <div className="absolute top-0 left-0 h-full w-1 bg-blue-500" />
      )}

      <div className="space-y-1.5">
        <div className="flex justify-between items-start gap-4">
          <span className={`text-sm font-bold text-slate-800 ${isUnread ? 'text-blue-900 font-extrabold' : ''}`}>
            {message.from}
          </span>
          <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
            {formatDate(message.receivedAt)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <h5 className={`text-xs font-bold text-slate-700 truncate flex-1 ${isUnread ? 'text-slate-900 font-extrabold' : ''}`}>
            {message.subject}
          </h5>
          {isUnread && (
            <span className="flex-shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-blue-100 text-blue-700 border border-blue-200">
              New
            </span>
          )}
        </div>

        <p className={`text-xs text-slate-500 line-clamp-2 ${isUnread ? 'text-slate-600' : ''}`}>
          {message.preview}
        </p>
      </div>
    </div>
  );
};
