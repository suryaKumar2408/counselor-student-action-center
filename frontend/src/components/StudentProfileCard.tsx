import React from 'react';
import type { Student } from '../types';

interface StudentProfileCardProps {
  student: Student;
}

export const StudentProfileCard: React.FC<StudentProfileCardProps> = ({ student }) => {
  const isAtRisk = student.enrollmentStatus === 'at_risk';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden relative">
      {/* Visual Accent Bar */}
      <div
        className={`absolute top-0 left-0 w-full h-1.5 ${
          isAtRisk ? 'bg-rose-500' : 'bg-emerald-500'
        }`}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{student.name}</h2>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                isAtRisk
                  ? 'bg-rose-50 text-rose-700 border border-rose-100'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isAtRisk ? 'bg-rose-500' : 'bg-emerald-500'}`} />
              {isAtRisk ? 'At Risk' : 'Active'}
            </span>
          </div>
          <a
            href={`mailto:${student.email}`}
            className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5 mt-1 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            {student.email}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 py-4 px-6 bg-slate-50 rounded-xl border border-slate-100 w-full md:w-auto">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Grade</div>
            <div className="text-xl font-bold text-slate-700">{student.grade}th Grade</div>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">GPA</div>
            <div className="text-xl font-bold text-slate-700">{student.gpa.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
