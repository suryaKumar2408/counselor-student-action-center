import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-pulse space-y-8">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center pb-6 border-b border-slate-200">
        <div className="h-8 w-64 bg-slate-300 rounded-md"></div>
        <div className="h-10 w-48 bg-slate-300 rounded-md"></div>
      </div>

      {/* Profile Card Skeleton */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-7 w-48 bg-slate-300 rounded"></div>
            <div className="h-4 w-36 bg-slate-200 rounded"></div>
          </div>
          <div className="h-6 w-24 bg-slate-300 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-16 bg-slate-200 rounded"></div>
              <div className="h-5 w-24 bg-slate-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="h-4 w-24 bg-slate-200 rounded"></div>
            <div className="h-8 w-16 bg-slate-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Two Column Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tasks Section Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-6 w-32 bg-slate-300 rounded"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 w-48 bg-slate-300 rounded"></div>
                  <div className="h-5 w-20 bg-slate-200 rounded"></div>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded"></div>
                <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                  <div className="h-8 w-28 bg-slate-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Section Skeleton */}
        <div className="space-y-6">
          <div className="h-6 w-40 bg-slate-300 rounded"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-slate-300 rounded"></div>
                  <div className="h-3 w-16 bg-slate-200 rounded"></div>
                </div>
                <div className="h-4 w-36 bg-slate-200 rounded"></div>
                <div className="h-3 w-full bg-slate-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
