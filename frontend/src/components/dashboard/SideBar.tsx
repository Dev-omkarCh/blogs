import React, { useEffect, useState } from 'react';
import { 
  Settings, User, Plus, 
  Menu, X, LayoutGrid, LogOut, Sparkles,
  FileText,
  BarChart3
} from 'lucide-react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  useEffect(() => {
    if(localStorage.getItem('activeDashboardItem')) {
      if(activeItem !== localStorage.getItem('activeDashboardItem')) {
        localStorage.setItem('activeDashboardItem', activeItem);
        return;
      }
    } else {
      localStorage.setItem('activeDashboardItem', activeItem);
    }

    return () => {
      localStorage.setItem('lastActiveItem', activeItem);
    };
  },[activeItem]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'posts', label: 'My Posts', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeItem, setActiveItem } as any);
    }
    return child;
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-950 text-slate-200">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-110 w-64 bg-slate-950 border-r border-slate-900 
        flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* 1. BRANDING & COMPACT MENU */}
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between lg:px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-sm font-black text-white tracking-tighter uppercase">Lumina</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-slate-500">
              <X size={20} />
            </button>
          </div>

          {/* COMPACT MENU ITEMS - Lower height, no extra padding */}
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveItem(item.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  activeItem === item.id 
                  ? 'bg-indigo-600/10 text-indigo-400' 
                  : 'text-slate-600 hover:text-slate-400 hover:bg-white/2'
                }`}
              >
                <item.icon size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* 2. FLEXIBLE SPACE (This keeps the top and bottom sections separated) */}
        <div className="flex-1" />

        {/* 3. BOTTOM UTILITIES (Compact Coffee & Profile) */}
        <div className="p-4 space-y-4">
          
          {/* Coffee Widget (Hidden on very small screens if needed) */}
          <div className="mt-auto mb-6 p-6 rounded-4xl bg-amber-500/5 border border-amber-500/10">
            <p className="text-[8px] font-black text-amber-500 uppercase tracking-widest mb-1 italic">Support</p>
            <h4 className="text-xs font-bold text-white mb-3">Buy me a coffee</h4>
            <button className="w-full py-2.5 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest rounded-xl">Donate</button>
          </div>

          {/* SLIM PROFILE CARD */}
          <div className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 text-xs uppercase">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-white truncate">John Doe</p>
              <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest leading-none">Pro Plan</p>
            </div>
            <button className="text-slate-700 hover:text-rose-500 transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* --- MOBILE TOP HEADER --- */}
      <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-slate-900 bg-slate-950 sticky top-0 z-100">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-indigo-500" />
          <span className="text-xs font-black text-white uppercase tracking-tighter">Lumina</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-400">
          <Menu size={20} />
        </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 w-full lg:h-screen lg:overflow-y-auto">
        {childrenWithProps}
      </main>

      {/* Mobile Bottom Bar Overlay */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-slate-950/80 backdrop-blur-xl border-t border-slate-900 px-10 py-3 flex items-center justify-between z-100">
        <button className="text-indigo-500"><LayoutGrid size={20} /></button>
        <button className="relative -top-6 w-12 h-12 bg-white text-black rounded-xl shadow-2xl flex items-center justify-center">
          <Plus size={20} strokeWidth={3} />
        </button>
        <button className="text-slate-500"><User size={20} /></button>
      </div>
    </div>
  );
};

// Sub-component helper
// const ArrowUpRight = ({ size, className }: { size: number, className?: string }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <line x1="7" y1="17" x2="17" y2="7"></line>
//     <polyline points="7 7 17 7 17 17"></polyline>
//   </svg>
// );

export default DashboardLayout;