import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  TrendingUp, Users, Heart, MessageCircle, 
  Layers, Star, ArrowUpRight, MousePointer2 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import axiosInstance from '@/lib/utils';

const BlogAnalysis = () => {
  const userId = useSelector((state: RootState) => state.authUser.user?._id);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosInstance.get(`/api/blogs/analytics/${userId}`);
        setData(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchAnalytics();
  }, [userId]);

  if (loading) return <div className="min-h-screen bg-slate-950" />; // Replace with your GlowSpinner

  const stats = [
    { label: 'Total Views', value: data?.summary?.totalViews, icon: TrendingUp, color: 'text-blue-400' },
    { label: 'Likes', value: data?.summary?.totalLikes, icon: Heart, color: 'text-rose-400' },
    { label: 'Comments', value: data?.summary?.totalComments, icon: MessageCircle, color: 'text-emerald-400' },
    { label: 'Guest Reads', value: data?.summary?.totalAnonymous, icon: Users, color: 'text-amber-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="mb-12">
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Content Intelligence</h1>
          <p className="text-slate-500 font-medium">Deep dive into your story performance and audience engagement.</p>
        </header>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900/30 border border-slate-900 p-6 rounded-[2rem] hover:border-indigo-500/30 transition-all">
              <stat.icon size={20} className={`${stat?.color} mb-4`} />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat?.label}</p>
              <h3 className="text-3xl font-black text-white">{stat?.value?.toLocaleString()}</h3>
            </div>
          ))}
        </div>

        {/* --- CHARTS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* Main Traffic Chart */}
          <div className="lg:col-span-2 bg-slate-900/20 border border-slate-900 rounded-[2.5rem] p-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-8">Views Over Time</h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.activityData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#334155" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-slate-900/20 border border-slate-900 rounded-[2.5rem] p-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-8">Category Split</h4>
            <div className="space-y-6">
              {Object.entries(data?.categoryDistribution).map(([cat, count]: any) => (
                <div key={cat}>
                  <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                    <span className="text-slate-400">{cat}</span>
                    <span className="text-white">{count} Posts</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full" 
                      style={{ width: `${(count / data?.summary?.blogCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- TOP PERFORMING BLOG --- */}
        {data.topBlog && (
          <div className="bg-gradient-to-r from-indigo-900/20 to-slate-900/20 border border-indigo-500/20 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center shrink-0">
                <Star size={32} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Star Performance</p>
                <h3 className="text-2xl font-black text-white tracking-tight line-clamp-1">{data?.topBlog?.title}</h3>
                <p className="text-slate-500 text-xs font-medium">This blog is responsible for {Math.round((data?.topBlog?.stats?.views / data?.summary?.totalViews) * 100)}% of your total traffic.</p>
              </div>
            </div>
            <button className="px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-400 hover:text-white transition-all">
              View Stats <ArrowUpRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAnalysis;