
import React, { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { Plus } from 'lucide-react';

const NewTaskInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { addTask } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle('');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 mb-8 animate-slide-in" style={{ animationDelay: '0.4s' }}>
      <form 
        onSubmit={handleSubmit}
        className={`flex items-center gap-2 p-4 border ${isFocused ? 'border-black' : 'border-black/10'} rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 shadow-sm`}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Add a new task..."
          className="flex-1 bg-transparent outline-none placeholder:text-black/30 text-sm"
          aria-label="New task title"
        />
        <button
          type="submit"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            title.trim() 
              ? 'bg-black text-white hover:bg-black/90 active:scale-95' 
              : 'bg-black/5 text-black/30 cursor-not-allowed'
          }`}
          disabled={!title.trim()}
          aria-label="Add task"
        >
          <Plus size={18} />
        </button>
      </form>
    </div>
  );
};

export default NewTaskInput;
