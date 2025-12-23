import React, { useState } from 'react';
import {
    Camera, Mail, Globe, Sparkles,
    Share2, Zap, Layout, ArrowUpRight,
    LayoutGrid,
    List,
    ShieldCheck,
    Github,
    Twitter,
    Linkedin
} from 'lucide-react';

const SettingsOverview = () => {
    const [autoSave, setAutoSave] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Reusable Social Icon Button
    const SocialButton = ({ icon }: { icon: React.ReactNode }) => (
        <button className="p-3 bg-white/[0.03] border flex justify-center align-middle border-white/5 rounded-xl text-slate-500 hover:text-white hover:bg-indigo-600 transition-all">
            {icon}
        </button>
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <header>
                <h1 className="text-6xl font-black text-white tracking-tighter mb-2">Settings</h1>
                <p className="text-slate-500 italic">Manage your profile and advanced editor preferences.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* --- LEFT COLUMN: THE PROFILE CARD YOU LIKED --- */}
                <div className="bg-[#0a0c14] border border-white/5 p-8 rounded-[2.5rem] text-center lg:sticky lg:top-12">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="w-full h-full rounded-[2.5rem] bg-indigo-500/10 border-2 border-dashed border-indigo-500/20 flex items-center justify-center text-indigo-400 text-4xl font-black">
                            JD
                        </div>
                         {/* Online Status Dot */}
                        <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-[#0a0c14] rounded-full shadow-lg" />

                        {/* Verified Badge */}
                        <div className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 rounded-xl border-4 border-[#0a0c14] text-white shadow-xl">
                            <ShieldCheck size={16} />
                        </div>
                    </div>

                    <h3 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                        John Doe
                        <div className="p-1 bg-indigo-500/20 rounded-md">
                            <ShieldCheck size={12} className="text-indigo-400" />
                        </div>
                    </h3>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-4">Pro Author</p>

                    {/* Bio Preview - New Option */}
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-8 px-2 italic">
                        "Building the future of technical writing through Lumina. Focused on React and Cloud Architecture."
                    </p>

                    {/* --- SOCIAL LINK GRID (New Option) --- */}
                    <div className="grid grid-cols-4 gap-2 mb-8">
                        <SocialButton icon={<Github size={16} />} />
                        <SocialButton icon={<Twitter size={16} />} />
                        <SocialButton icon={<Linkedin size={16} />} />
                        <SocialButton icon={<Globe size={16} />} />
                    </div>

                    <div className="space-y-3">
                        <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-400 hover:text-white transition-all">
                            Update Profile
                        </button>
                        <button className="w-full py-3 bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all border border-white/5">
                            Public Portfolio
                        </button>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: ADVANCED SETTINGS --- */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Functional Settings Group */}
                    <div className="bg-[#0a0c14] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                                <LayoutGrid size={18} />
                            </div>
                            <h3 className="text-xs font-black text-white uppercase tracking-widest">Workspace</h3>
                        </div>

                        {/* Default View Mode Setting */}
                        <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-3xl">
                            <div>
                                <p className="text-xs font-bold text-white">Default View Mode</p>
                                <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter mt-1">
                                    How your stories appear by default
                                </p>
                            </div>
                            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 px-4 rounded-lg transition-all flex items-center gap-2 ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                                >
                                    <LayoutGrid size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Grid</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 px-4 rounded-lg transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                                >
                                    <List size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">List</span>
                                </button>
                            </div>
                        </div>

                        {/* Auto-Save Toggle */}
                        <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-3xl">
                            <div>
                                <p className="text-xs font-bold text-white">Auto-Save Drafts</p>
                                <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter mt-1">
                                    Cloud backup every 15 seconds
                                </p>
                            </div>
                            <button
                                onClick={() => setAutoSave(!autoSave)}
                                className={`w-12 h-7 rounded-xl transition-all relative ${autoSave ? 'bg-indigo-600' : 'bg-slate-800'}`}
                            >
                                <div className={`absolute top-1.5 w-4 h-4 bg-white rounded-md transition-all ${autoSave ? 'left-6' : 'left-2'}`} />
                            </button>
                        </div>
                    </div>

                    {/* Medium Difficulty - Coming Soon Sections */}
                    <div className="bg-[#0a0c14] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <Sparkles size={18} className="text-indigo-400" />
                            <h3 className="text-xs font-black text-white uppercase tracking-widest">Advanced Features</h3>
                        </div>

                        <div className="space-y-4">
                            {/* Custom SEO Slug - Coming Soon */}
                            <ComingSoonRow
                                icon={<Globe size={18} />}
                                label="Custom SEO Slugs"
                                sub="Manually edit story URLs for better ranking"
                            />

                            {/* Reading Progress - Coming Soon */}
                            <ComingSoonRow
                                icon={<Layout size={18} />}
                                label="Reading Progress Bar"
                                sub="Visual indicator for long-form readers"
                            />

                            {/* Social Sync - Coming Soon */}
                            <ComingSoonRow
                                icon={<Share2 size={18} />}
                                label="Social Auto-Sync"
                                sub="Instantly share to Twitter and LinkedIn"
                            />
                        </div>
                    </div>

                    {/* Account Zone */}
                    <div className="bg-rose-500/5 border border-rose-500/10 rounded-[2.5rem] p-8 flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-black text-rose-500 uppercase tracking-widest">Danger Zone</h4>
                            <p className="text-[10px] text-rose-500/60 font-bold">Permanently delete your account and all stories.</p>
                        </div>
                        <button className="px-6 py-3 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                            Delete Account
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const ToggleRow = ({ label, sub, active, onToggle }: any) => (
    <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-3xl">
        <div>
            <p className="text-xs font-bold text-white">{label}</p>
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter mt-1">{sub}</p>
        </div>
        <button onClick={onToggle} className={`w-12 h-7 rounded-xl transition-all relative ${active ? 'bg-indigo-600' : 'bg-slate-800'}`}>
            <div className={`absolute top-1.5 w-4 h-4 bg-white rounded-md transition-all ${active ? 'left-6' : 'left-2'}`} />
        </button>
    </div>
);

const ComingSoonRow = ({ icon, label, sub }: any) => (
    <div className="flex items-center justify-between p-5 bg-black/20 border border-white/[0.02] rounded-3xl opacity-60">
        <div className="flex items-center gap-4">
            <div className="text-slate-600">{icon}</div>
            <div>
                <p className="text-xs font-bold text-slate-400">{label}</p>
                <p className="text-[9px] text-slate-600 uppercase font-black tracking-tighter mt-1">{sub}</p>
            </div>
        </div>
        <span className="text-[8px] font-black text-indigo-500/50 uppercase border border-indigo-500/20 px-2 py-1 rounded-lg">
            Coming Soon
        </span>
    </div>
);

export default SettingsOverview;