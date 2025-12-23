import React, { useEffect, useState } from 'react';
import { 
  LayoutGrid, 
  Settings, 
  Moon, 
  Search, 
  Plus, 
  List, 
  Hash, 
  Clock, 
  Eye, 
  Heart, 
  Edit3, 
  ArrowUpRight, 
  LogOut 
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  views: number;
  likes: number;
}

export default function LuminaDashboard() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  // Logic to apply classes to the HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen bg-[#02040a] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#05070f] flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <LayoutGrid size={18} fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">Lumina</span>
        </div>

        <nav className="flex-1 space-y-1 mt-4 relative">
          <SidebarItem icon={<LayoutGrid size={18} />} label="HOME" active />
          <SidebarItem icon={<Settings size={18} />} label="SETTINGS" />
          <button 
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl w-full transition-all ${
              showThemeMenu ? 'bg-indigo-600/10 text-indigo-400' : 'text-gray-500'
            }`}
          >
            <Moon size={18} />
            <span className="text-xs font-bold tracking-widest uppercase">Theme</span>
          </button>
          {/* FLOATING MENU: How it appears on click */}
          {showThemeMenu && (
            <div className="absolute left-full ml-2 bottom-0 w-36 bg-white dark:bg-[#0a0c14] border border-black/10 dark:border-white/10 rounded-xl shadow-xl p-1 z-50">
              {['light', 'dark', 'system'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setTheme(mode as any);
                    setShowThemeMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase rounded-lg hover:bg-indigo-600/10 hover:text-indigo-400 transition-colors"
                >
                  {mode}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* Support Card */}
        <div className="bg-[#0a0c14] rounded-2xl p-4 border border-white/5">
          <p className="text-[10px] font-bold text-orange-400 mb-1 uppercase tracking-wider">Support</p>
          <p className="text-sm font-semibold mb-4">Buy me a coffee</p>
          <button className="w-full bg-[#ff9d00] hover:bg-[#e68a00] text-black font-bold py-3 rounded-xl text-xs transition-colors">
            DONATE
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-between bg-[#0a0c14] p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 font-bold text-xs">JD</div>
            <div>
              <p className="text-xs font-bold">John Doe</p>
              <p className="text-[10px] text-gray-500 uppercase">Pro Plan</p>
            </div>
          </div>
          <LogOut size={14} className="text-gray-600 cursor-pointer" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-6xl font-black mb-2 tracking-tighter">Your Stories</h1>
            <p className="text-gray-500 italic">Manage and track your technical content.</p>
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-gray-200 transition-all uppercase tracking-widest">
            <Plus size={18} strokeWidth={3} /> Write Article
          </button>
        </header>

        {/* Filters and Search Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center bg-[#0a0c14] p-1 rounded-2xl border border-white/5">
            {['ALL', 'PUBLISHED', 'DRAFT'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab ? 'bg-[#1e2230] text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="h-6 w-[1px] bg-white/10 mx-2" />
            <div className="flex gap-1 px-2">
              <div className="p-2 bg-indigo-600 rounded-lg"><LayoutGrid size={16} /></div>
              <div className="p-2 text-gray-600"><List size={16} /></div>
            </div>
          </div>

          <div className="relative w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="text" 
              placeholder="Filter stories..." 
              className="w-full bg-[#02040a] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-white/20 transition-all"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ArticleCard 
            title="Black Clover New Trailer" 
            category="TECH" 
            image="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80" 
          />
          <ArticleCard 
            title="Demo Blog" 
            category="OTHER" 
            image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" 
          />
          <ArticleCard 
            title="Hello world" 
            category="CAREER" 
            image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80" 
          />
        </div>
      </main>
    </div>
  );
}

// Sub-components for clean usage
function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'text-gray-500 hover:text-gray-300'
    }`}>
      {icon}
      <span className="text-xs font-bold tracking-widest">{label}</span>
    </div>
  );
}

function ArticleCard({ title, category, image }: { title: string, category: string, image: string }) {
  return (
    <div className="bg-[#0a0c14] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-500 tracking-tighter">LIVE</span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-xl font-black mb-6 line-clamp-2">{title}</h3>
        
        <div className="flex items-center gap-6 text-gray-500 mb-8">
          <div className="flex items-center gap-2">
            <Hash size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{category}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">5 MIN</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-gray-600 text-[10px] font-bold">
              <Eye size={14} /> 0
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-[10px] font-bold">
              <Heart size={14} /> 0
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-600 hover:text-white transition-colors"><Edit3 size={16} /></button>
            <button className="p-2 bg-indigo-600 rounded-lg text-white"><ArrowUpRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}