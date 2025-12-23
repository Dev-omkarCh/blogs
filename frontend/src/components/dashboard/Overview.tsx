import React from 'react';
import { Eye, Heart, Globe, Edit3, ArrowUpRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardOverviewProps {
  blogs: any[];
  onViewAll: () => void;
}

const DashboardOverview = ({ blogs, onViewAll }: DashboardOverviewProps) => {
  // Logic: Calculate stats from your existing blog state
  const totalViews = blogs.reduce((acc, b) => acc + (b.stats?.views || 0), 0);
  const totalLikes = blogs.reduce((acc, b) => acc + (b.stats?.likes?.length || 0), 0);
  const publishedCount = blogs.filter(b => b.published).length;
  const draftCount = blogs.length - publishedCount;

  const stats = [
    { label: 'Total Views', value: totalViews, icon: Eye, color: 'text-indigo-400' },
    { label: 'Total Likes', value: totalLikes, icon: Heart, color: 'text-rose-400' },
    { label: 'Published', value: publishedCount, icon: Globe, color: 'text-emerald-400' },
    { label: 'Drafts', value: draftCount, icon: Edit3, color: 'text-amber-400' },
  ];

  const navigate = useNavigate();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* --- LUMINA DARK STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-indigo-600/10 border border-white/5 p-8 rounded-[2.5rem] hover:border-indigo-500/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 bg-white/5 rounded-2xl ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-white tracking-tighter">
              {stat.value.toLocaleString()}
            </h3>
          </div>
        ))}
      </div>

      {/* --- RECENT ACTIVITY (DARK THEME) --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-black text-white tracking-tight">Recent Activity</h2>
          <button 
            onClick={onViewAll} 
            className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2"
          >
            Manage Posts <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="bg-[#0a0c14] border border-white/5 rounded-[2.5rem] overflow-hidden">
          {blogs.slice(0, 3).map((blog) => (
            <div key={blog._id} 
              className="flex items-center gap-6 p-6 border-b border-white/5 last:border-none group 
              hover:bg-white/[0.02] transition-all"
              onClick={() => navigate(`/blog/${blog?._id}`)}
              >
              <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-white/5">
                <img src={blog.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{blog.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{blog.category}</span>
                  <span className="text-slate-800 text-[8px]">•</span>
                  <span className="flex items-center gap-1 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                    <Clock size={10} /> 5 MIN
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="hidden md:flex gap-4 mr-4">
                    <span className="text-[10px] text-slate-600 flex items-center gap-1 font-bold"><Eye size={12}/> {blog.stats?.views}</span>
                    <span className="text-[10px] text-slate-600 flex items-center gap-1 font-bold"><Heart size={12}/> {blog.stats?.likes?.length}</span>
                 </div>
                 <button className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                   <ArrowUpRight size={14} />
                 </button>
              </div>
            </div>
          ))}
          
          {blogs.length === 0 && (
            <div className="p-20 text-center text-slate-600 uppercase text-[10px] font-black tracking-widest">
              No recent activity found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;