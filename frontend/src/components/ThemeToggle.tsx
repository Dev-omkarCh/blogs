import React, { useState, useEffect } from 'react';
import { Moon, Sun, Monitor, Check } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialization logic: check local storage first
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lumina-theme') as Theme) || 'system';
    }
    return 'system';
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Logic to determine the actual theme to apply
    const applyTheme = (targetTheme: Theme) => {
      root.classList.remove('light', 'dark');
      
      let themeToSet = targetTheme;
      if (targetTheme === 'system') {
        themeToSet = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      root.classList.add(themeToSet);
      localStorage.setItem('lumina-theme', targetTheme);
    };

    applyTheme(theme);

    // Listener for system changes if 'system' is selected
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <div className="relative">
      {/* The Sidebar Item Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 px-4 py-3 rounded-xl w-full text-gray-500 hover:bg-white/5 transition-all"
      >
        {theme === 'light' ? <Sun size={18} /> : theme === 'dark' ? <Moon size={18} /> : <Monitor size={18} />}
        <span className="text-xs font-bold tracking-widest uppercase">Theme</span>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute left-full ml-2 bottom-0 w-40 bg-[#0a0c14] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-left-2">
          {(['light', 'dark', 'system'] as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTheme(t);
                setIsOpen(false);
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white/5 text-gray-400 hover:text-white"
            >
              <div className="flex items-center gap-2">
                {t === 'light' && <Sun size={14} />}
                {t === 'dark' && <Moon size={14} />}
                {t === 'system' && <Monitor size={14} />}
                {t}
              </div>
              {theme === t && <Check size={12} className="text-indigo-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}