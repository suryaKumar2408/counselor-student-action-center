import React, { useState } from 'react';
import { useStudentActionCenter } from '../hooks/useStudentActionCenter';
import { useStudentList } from '../hooks/useStudentList';
import { StudentProfileCard } from '../components/StudentProfileCard';
import { SummaryCards } from '../components/SummaryCards';
import { TaskList } from '../components/TaskList';
import { MessageList } from '../components/MessageList';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

export const ActionCenterPage: React.FC = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('stu_001');

  const { data: studentList = [] } = useStudentList();
  const { data, isLoading, isError, error, refetch } = useStudentActionCenter(selectedStudentId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Premium Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-900 text-white rounded-xl shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M12 13.489v8.012m0 0h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 leading-none">Aura</h1>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Counselor Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline-block">Select Student:</span>
            <div className="relative">
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-slate-100 hover:bg-slate-200 border border-transparent hover:border-slate-300 text-slate-800 text-sm font-bold rounded-xl cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {studentList.map((stu) => (
                  <option key={stu.id} value={stu.id}>
                    {stu.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Panel */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {isLoading && <LoadingState />}

        {isError && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 flex items-center justify-center">
            <ErrorState 
              message={error instanceof Error ? error.message : 'Unable to connect to the Action Center service.'} 
              onRetry={refetch} 
            />
          </div>
        )}

        {!isLoading && !isError && data && (
          <div className="space-y-8">
            {/* Dashboard Title & Meta */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Action Center</h2>
                <p className="text-slate-500 text-sm mt-1">Review urgent priorities, tasks progress, and incoming counselor messages.</p>
              </div>
              <button 
                onClick={() => refetch()}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Sync Data
              </button>
            </div>

            {/* Profile Card */}
            <StudentProfileCard student={data.student} />

            {/* Summary Counters */}
            <SummaryCards summary={data.summary} />

            {/* Content Split: Tasks and Messages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tasks Board */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.48-1.72-1.72m0 0a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l5.25-5.25a.75.75 0 0 0-1.06-1.06l-4.72 4.72Z" />
                    </svg>
                    Action Checklist
                  </h3>
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-100 border border-slate-200 text-slate-600 rounded-full">
                    {data.tasks.filter((t) => t.status !== 'completed').length} Pending
                  </span>
                </div>
                <TaskList tasks={data.tasks} studentId={selectedStudentId} />
              </div>

              {/* Messages Inbox */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    Inbox
                  </h3>
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-50 border border-blue-100 text-blue-700 rounded-full">
                    {data.summary.unreadMessages} New
                  </span>
                </div>
                <MessageList messages={data.messages} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
