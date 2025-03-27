
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../types/task';
import { toast } from '@/components/ui/use-toast';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
      } catch (e) {
        console.error('Failed to parse saved tasks', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    if (!title.trim()) return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    };
    
    setTasks(prev => [newTask, ...prev]);
    
    toast({
      description: "Task added",
      duration: 2000,
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    
    toast({
      description: "Task deleted",
      duration: 2000,
    });
  };

  const editTask = (id: string, title: string) => {
    if (!title.trim()) return;
    
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, title: title.trim() } : task
      )
    );
    
    toast({
      description: "Task updated",
      duration: 2000,
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};
