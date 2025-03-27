
import React from 'react';
import Header from '@/components/Header';
import NewTaskInput from '@/components/NewTaskInput';
import TaskList from '@/components/TaskList';
import { TaskProvider } from '@/context/TaskContext';

const Index: React.FC = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Background design elements */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.02),transparent_40%)] z-[-1]"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.02),transparent_30%)] z-[-1]"></div>
        
        <div className="max-w-2xl mx-auto pb-20">
          <Header />
          <NewTaskInput />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
};

export default Index;
