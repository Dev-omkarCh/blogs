import React, { useState } from 'react';
import { Mars, Venus, UserPlus, HelpCircle, ChevronDown, Check } from 'lucide-react';
import type { FormData } from '@/types/Signup';

interface GenderDropdownProps {
  formData : FormData,
  setFormData : (value : React.SetStateAction<FormData>) => void;
};

const GenderDropdown = ({  setFormData } : GenderDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");

  const options = [
    { id: 'male', label: 'Male', icon: Mars, color: 'text-blue-400' },
    { id: 'female', label: 'Female', icon: Venus, color: 'text-pink-400' },
    { id: 'non-binary', label: 'Non-binary', icon: UserPlus, color: 'text-indigo-400' },
    { id: 'private', label: 'Prefer not to say', icon: HelpCircle, color: 'text-slate-500' },
  ];

  return (
    <div className="relative w-full">
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between border-zinc-800 gap-3 border text-zinc-500 h-12 rounded-lg px-4 transition-all focus:border-blue-500 outline-none"
      >
        <span className="flex items-center gap-3">
          {selected ? (
            <>
              {React.createElement(options.find(o => o.id === selected)!.icon, { size: 18, className: options.find(o => o.id === selected)!.color })}
              {options.find(o => o.id === selected)!.label}
            </>
          ) : "Select Gender"}
        </span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSelected(option.id);
                setFormData(prev => ({...prev, gender: option.id}));
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
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

export default GenderDropdown;