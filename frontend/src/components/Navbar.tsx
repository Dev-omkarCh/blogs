import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  PenSquare, 
  Bell, 
  ChevronDown, 
  BookOpen 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    { name: 'Technology', href: '#' },
    { name: 'Design', href: '#' },
    { name: 'AI', href: '#' },
    { name: 'Tutorials', href: '#' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
              <BookOpen size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
              Dev<span className="text-indigo-400">Journal</span>
            </span>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search articles, tags, authors..."
              className="w-full bg-slate-900/50 border border-slate-800 text-slate-200 text-sm rounded-full py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {categories.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              className="p-2 text-slate-400 hover:text-white md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>
            
            <button 
                className="hidden sm:flex p-2 text-slate-400 hover:text-white relative rounded-full 
                bg-slate-900/50 border border-slate-800 outline-none 
                focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all focus:text-white"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-950"></span>
            </button>

            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-md shadow-indigo-500/10">
              <PenSquare size={18} />
              <span className="hidden sm:inline">Write</span>
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="md:hidden p-4 bg-slate-950 border-b border-slate-800">
          <input 
            autoFocus
            type="text" 
            placeholder="Search the blog..."
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg py-2 px-4 outline-none"
          />
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 py-4 px-4 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">Categories</p>
          {categories.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-white block px-3 py-2 text-base font-medium hover:bg-slate-900 rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-900">
            <button className="flex items-center gap-2 text-slate-300 w-full px-3 py-2 font-medium">
              <Bell size={18} /> Notifications
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;