import { Search, SlidersHorizontal } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-800 pb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Explore Articles</h1>
            <p className="text-slate-500">Discover the best technical writing from our community.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group grow md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search articles..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium">
              <SlidersHorizontal size={18} /> Filters
            </button>
          </div>
    </div>
  );
};

export default Header;
