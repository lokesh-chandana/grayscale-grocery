
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';

const Header: React.FC = () => {
  const { tasks } = useTaskContext();
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <header className="py-8 relative animate-fade-in">
      <div className="absolute inset-0 overflow-hidden z-[-1]">
        <div className="w-40 h-40 rounded-full bg-gradient-to-b from-black/5 to-transparent absolute -top-20 -left-20 animate-spin-slow" />
        <div className="w-60 h-60 rounded-full bg-gradient-to-b from-black/5 to-transparent absolute -bottom-40 -right-20 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
      </div>

      <div className="max-w-md mx-auto px-4">
        <div className="flex flex-col gap-2">
          <div className="inline-block">
            <p className="text-xs uppercase tracking-widest text-black/40 font-medium mb-1 animate-slide-in" style={{ animationDelay: '0.1s' }}>Tasks</p>
            <h1 className="text-3xl font-bold tracking-tight animate-slide-in" style={{ animationDelay: '0.2s' }}>Minimalist Todo</h1>
          </div>
          
          <div className="flex items-center mt-4 animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex-1">
              <div className="h-1 bg-black/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-black transition-all duration-700 ease-out rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
            <span className="ml-3 text-xs font-medium">{completedTasks}/{totalTasks}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
