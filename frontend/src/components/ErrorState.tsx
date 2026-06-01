import React from 'react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Unable to load student data. Please try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-md mx-auto px-4 text-center">
      <div className="p-4 bg-red-50 text-red-500 rounded-full mb-4 border border-red-100 shadow-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">Data Load Failure</h2>
      <p className="text-sm text-slate-500 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-md transition-all active:scale-[0.98] border border-slate-700"
      >
        Retry Connection
      </button>
    </div>
  );
};
