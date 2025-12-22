import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { 
  Plus, Search, Eye, Heart, MessageSquare, Edit3, 
  Trash2, ExternalLink, Globe, LayoutGrid, List,
  MoreHorizontal, ArrowUpRight, Loader2, Clock, Calendar
} from 'lucide-react';
import type { RootState } from '@/app/store';

const BlogDashboard = () => {
  const userId = useSelector((state: RootState) => state.authUser.user?._id);
  
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchMyBlogs = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await axios.get(`/api/blogs/user/${userId}`);
        setBlogs(response.data.blogs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, [userId]);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'published') return matchesSearch && blog.published;
    if (activeTab === 'draft') return matchesSearch && !blog.published;
    return matchesSearch;
  });

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="text-indigo-500 animate-spin" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="space-y-2">
            <h1 className="text-6xl font-black text-white tracking-tighter">Your Stories</h1>
            <p className="text-slate-500 text-sm italic">Manage and track your technical content.</p>
          </div>
          <button className="bg-white text-black hover:bg-indigo-400 hover:text-white transition-all px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl">
            <Plus size={18} /> Write Article
          </button>
        </div>

        {/* --- CONTROLS BAR --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-slate-900/10 p-4 rounded-3xl border border-slate-900">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Tab Switcher */}
            <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
              {['all', 'published', 'draft'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab ? 'bg-slate-800 text-white' : 'text-slate-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
            <input 
              type="text" 
              placeholder="Filter stories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        {viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="group flex flex-col bg-slate-900/20 border border-slate-900 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 transition-all duration-500">
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                  {blog.image ? (
                    <img src={blog.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={blog.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700 font-black italic text-4xl uppercase select-none">No Cover</div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest backdrop-blur-md border ${
                      blog.published ? 'border-emerald-500/50 text-emerald-400 bg-emerald-950/30' : 'border-amber-500/50 text-amber-400 bg-amber-950/30'
                    }`}>
                      {blog.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-white tracking-tight mb-4 line-clamp-2 min-h-[56px]">{blog.title}</h3>
                  
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">
                    <span className="flex items-center gap-1.5"><Globe size={12}/> {blog.category}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12}/> {blog.stats?.readTime}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-800/50">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1 text-xs text-slate-400"><Eye size={14}/> {blog.stats?.views}</div>
                      <div className="flex items-center gap-1 text-xs text-slate-400"><Heart size={14}/> {blog.stats?.likes?.length}</div>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-500 hover:text-white"><Edit3 size={14}/></button>
                       <button className="p-2 rounded-lg bg-indigo-600 text-white"><ArrowUpRight size={14}/></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="group flex items-center gap-6 bg-slate-900/20 border border-slate-900 p-4 rounded-3xl hover:bg-white/[0.02] transition-all">
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-800">
                  <img src={blog.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate group-hover:text-indigo-400 transition-colors">{blog.title}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{blog.category}</span>
                    <span className={`text-[9px] font-black uppercase ${blog.published ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="hidden lg:flex items-center gap-8 px-8 text-slate-500 border-x border-slate-900">
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase">{blog.stats?.views}</p>
                    <p className="text-[8px] text-slate-700 uppercase">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase">{blog.stats?.likes?.length}</p>
                    <p className="text-[8px] text-slate-700 uppercase">Likes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 hover:text-white transition-all"><Edit3 size={16}/></button>
                  <button className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 hover:text-rose-500 transition-all"><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State Logic */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-slate-900 rounded-[3rem]">
            <p className="text-slate-600 font-bold uppercase tracking-widest text-sm">No blogs found in this view</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDashboard;