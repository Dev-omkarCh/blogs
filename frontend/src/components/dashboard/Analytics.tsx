import React, { useEffect, useState } from 'react';
import {
  BarChart3, TrendingUp, Zap,
  Map as MapIcon, Laptop, Smartphone,
  Layers, ChevronRight
} from 'lucide-react';
import axios from 'axios';
import axiosInstance from '@/lib/utils';
import toast from 'react-hot-toast';

const AnalyticsOverview = ({ blogs = [] }: { blogs: any[] }) => {
  // Logic: Calculate Category Performance
  const categoryStats = blogs.reduce((acc: any, blog) => {
    const cat = blog.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + (blog.stats?.views || 0);
    return acc;
  }, {});

  const topCategories = Object.entries(categoryStats)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 4);
  
  // Inside your Analytics Tab
  const [weeklyData, setWeeklyData] = useState([{
    day: 'Mon', views: 1200
  }]);

  // Logic: Calculate max views to scale the bars correctly
  const maxViews = Math.max(...weeklyData.map(d => d.views), 1);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await axiosInstance.get('/api/blogs/weekly');
        const data = await response.data;
        setWeeklyData(data);
        console.log(data);

      } catch (error : any) {
        console.error(error?.message || "Failed to fetch blogs");
        toast.error(error?.message || "Failed to fetch blogs");
      }
    };
    fetchWeeklyData();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-black text-white tracking-tighter mb-2">Analytics</h1>
          <p className="text-slate-500 italic">Data-driven insights for your content.</p>
        </div>
        <div className="hidden md:block pb-2">
          <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-widest">
            System Live
          </span>
        </div>
      </header>

      {/* --- GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* 1. MAIN PERFORMANCE CHART (Already implemented, keep logic here) */}
        <div className="lg:col-span-2 bg-[#0a0c14] border border-white/5 p-8 rounded-[3rem]">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8">Weekly Engagement</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {/* Simplified bars using CSS heights */}
            {[40, 70, 45, 90, 65, 55, 80].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-500/10 rounded-t-xl relative group overflow-hidden">
                <div
                  className="absolute bottom-0 w-full bg-indigo-500 transition-all duration-1000 group-hover:bg-indigo-400"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[8px] font-black text-slate-600 uppercase tracking-widest px-1">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* 2. CATEGORY BREAKDOWN (Easy Implementation) */}
        <div className="flex items-end justify-between h-40 gap-2">
          {weeklyData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-indigo-500/10 rounded-t-xl relative group h-full">
                <div
                  className="absolute bottom-0 w-full bg-indigo-500 rounded-t-xl transition-all duration-1000"
                  style={{ height: `${(data.views / maxViews) * 100}%` }}
                />
                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.views}
                </div>
              </div>
              <span className="text-[8px] font-black text-slate-600 uppercase">{data.day}</span>
            </div>
          ))}
        </div>

        {/* 3. DEVICE & REACH (Medium Difficulty UI) */}
        <div className="lg:col-span-1 bg-[#0a0c14] border border-white/5 p-8 rounded-[3rem] space-y-8">
          <h3 className="text-xs font-black text-white uppercase tracking-widest">Device Distribution</h3>
          <div className="flex items-center gap-6">
            <div className="flex-1 bg-white/[0.02] p-4 rounded-2xl border border-white/5 flex flex-col items-center">
              <Laptop size={20} className="text-indigo-400 mb-2" />
              <span className="text-xl font-black text-white">64%</span>
              <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Desktop</span>
            </div>
            <div className="flex-1 bg-white/[0.02] p-4 rounded-2xl border border-white/5 flex flex-col items-center">
              <Smartphone size={20} className="text-emerald-400 mb-2" />
              <span className="text-xl font-black text-white">36%</span>
              <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Mobile</span>
            </div>
          </div>
        </div>

        {/* 4. RECENT MILESTONES (Easy Implementation) */}
        <div className="lg:col-span-2 bg-[#0a0c14] border border-white/5 p-8 rounded-[3rem]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Recent Milestones</h3>
            <Zap size={16} className="text-amber-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MilestoneCard title="10k Total Views" date="Achieved 2 days ago" />
            <MilestoneCard title="Top Author Badge" date="Achieved this morning" />
          </div>
        </div>

      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const MilestoneCard = ({ title, date }: any) => (
  <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-indigo-500/30 transition-all cursor-default group">
    <div>
      <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">{title}</p>
      <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">{date}</p>
    </div>
    <ChevronRight size={14} className="text-slate-800" />
  </div>
);

export default AnalyticsOverview;