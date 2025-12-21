import React, { useState } from 'react';
import { ChevronDown, Check, Brain, Notebook, Cpu, Scroll } from 'lucide-react';

interface Blog{
    title: string;
    author: string;
    category: string;
}

interface CategoryDropdownProps {
  blog : Blog,
  setBlog : (value : React.SetStateAction<Blog>) => void;
};

const CategoryDropdown = ({ setBlog } : CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");

  const options = [
    { id: 'Tech', label: 'Tech', icon: Cpu, color: 'text-blue-400' },
    { id: 'Career', label: 'Career', icon: Notebook, color: 'text-pink-400' },
    { id: 'Ai', label: 'Ai', icon: Brain, color: 'text-indigo-400' },
    { id: 'Other', label: 'Other', icon: Scroll, color: 'text-slate-500' },
  ];

  return (
    <div className="relative w-full">
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 border bg-slate-900 border-slate-800 h-12 rounded-lg px-4
        focus-within:ring-1 focus-within:ring-blue-500 outline-none transition-all"
      >
        <span className="flex items-center gap-3">
          {selected ? (
            <>
              {React.createElement(options.find(o => o.id === selected)!.icon, { size: 18, className: options.find(o => o.id === selected)!.color })}
              {options.find(o => o.id === selected)!.label}
            </>
          ) : "Select Category"}
        </span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSelected(option.id);
                setBlog(prev => ({...prev, category: option.id}));
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-950
               text-slate-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3 ">
                <option.icon size={18} className={option.color} />
                <span>{option.label}</span>
              </div>
              {selected === option.id && <Check size={16} className="text-indigo-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;