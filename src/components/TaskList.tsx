
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();
  
  // Separate completed and incomplete tasks
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (tasks.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-10 text-center animate-fade-in">
        <div className="border border-black/10 rounded-xl p-8 bg-white/50 backdrop-blur-sm">
          <p className="text-black/50 text-sm">No tasks yet. Add one to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="max-w-md mx-auto px-4">
        {/* Incomplete tasks */}
        {incompleteTasks.length > 0 && (
          <div className="mb-8">
            {incompleteTasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
          </div>
        )}
        
        {/* Completed tasks (if any) */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-widest text-black/40 font-medium mb-4 pl-2">
              Completed ({completedTasks.length})
            </h2>
            {completedTasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index + incompleteTasks.length} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
