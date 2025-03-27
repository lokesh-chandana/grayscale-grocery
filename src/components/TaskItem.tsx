
import React, { useState, useRef, useEffect } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { Check, Trash, Edit2 } from 'lucide-react';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const { toggleTask, deleteTask, editTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Animation delay based on index
  const delay = `${index * 0.05}s`;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim() !== task.title) {
      editTask(task.id, editedTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleCheckboxClick = () => {
    toggleTask(task.id);
  };

  const handleDeleteClick = () => {
    deleteTask(task.id);
  };

  return (
    <div 
      className="animate-slide-in max-w-md mx-auto"
      style={{ animationDelay: delay }}
    >
      <div className={`p-4 mb-3 rounded-xl transition-all ${
        task.completed 
          ? 'bg-black/5' 
          : 'bg-white shadow-sm border border-black/5'
      }`}>
        <div className="flex items-center gap-3">
          {/* Checkbox */}
          <button
            className={`checkbox-container ${task.completed ? 'checked' : ''}`}
            onClick={handleCheckboxClick}
            aria-checked={task.completed}
            role="checkbox"
            aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          >
            <Check size={12} className="checkbox-check text-white" />
          </button>

          {/* Task title */}
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-b border-black/20 text-sm py-1"
              autoFocus
            />
          ) : (
            <span 
              className={`flex-1 text-sm ${
                task.completed 
                  ? 'text-black/40 line-through' 
                  : 'text-black'
              } transition-all duration-300`}
            >
              {task.title}
            </span>
          )}
          
          {/* Action buttons */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {!isEditing && !task.completed && (
              <button
                onClick={handleEdit}
                className="w-7 h-7 rounded-full flex items-center justify-center text-black/30 hover:text-black/70 hover:bg-black/5 transition-all"
                aria-label={`Edit "${task.title}"`}
              >
                <Edit2 size={14} />
              </button>
            )}
            <button
              onClick={handleDeleteClick}
              className="w-7 h-7 rounded-full flex items-center justify-center text-black/30 hover:text-black/70 hover:bg-black/5 transition-all"
              aria-label={`Delete "${task.title}"`}
            >
              <Trash size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
