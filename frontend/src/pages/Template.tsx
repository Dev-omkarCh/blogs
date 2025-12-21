import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Type, 
  Hash, 
  Send, 
  Eye, 
  Save, 
  ChevronLeft, 
  MoreHorizontal,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="h-6 w-px bg-slate-800 mx-2" />
          <span className="text-sm font-medium text-slate-400">Draft in <span className="text-white">Personal Blog</span></span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            {isPreview ? <><Type size={16} /> Edit</> : <><Eye size={16} /> Preview</>}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <Save size={16} /> Save Draft
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all">
            Publish <Send size={16} />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x lg:divide-slate-800 min-h-[calc(100-4rem)]">
        
        {/* --- MAIN EDITOR AREA --- */}
        <main className="lg:col-span-8 p-6 md:p-12 lg:p-20 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Cover Image Placeholder */}
            <div className="group relative w-full h-64 md:h-80 bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center transition-all hover:border-indigo-500/50 hover:bg-slate-900/50 cursor-pointer">
              <div className="p-4 bg-slate-950 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon size={32} className="text-slate-600 group-hover:text-indigo-400" />
              </div>
              <p className="text-sm font-medium text-slate-500 group-hover:text-slate-300">Add a high-resolution cover image</p>
              <p className="text-xs text-slate-600 mt-1">1600 x 900px recommended</p>
            </div>

            {/* Title Input */}
            <textarea
              placeholder="Article Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-4xl md:text-5xl font-extrabold text-white placeholder:text-slate-800 outline-none resize-none overflow-hidden h-auto py-4 tracking-tight"
              rows={1}
            />

            {/* Content Area */}
            {isPreview ? (
              <div className="prose prose-invert prose-indigo max-w-none">
                <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                  {content || "Nothing to preview yet..."}
                </p>
              </div>
            ) : (
              <textarea
                placeholder="Start writing your masterpiece..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-transparent text-lg md:text-xl text-slate-300 placeholder:text-slate-800 outline-none resize-none min-h-[400px] leading-relaxed"
              />
            )}
          </div>
        </main>

        {/* --- SETTINGS SIDEBAR --- */}
        <aside className="lg:col-span-4 p-8 bg-slate-950/50">
          <div className="sticky top-24 space-y-10">
            {/* SEO & Categorization */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Layers size={14} className="text-indigo-500" /> Settings
                </h3>
                <button className="text-slate-600 hover:text-white transition-colors"><MoreHorizontal size={18} /></button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 flex items-center gap-2">
                    <Hash size={12} /> Tags (up to 5)
                  </label>
                  <input 
                    type="text" 
                    placeholder="react, typescript, ai..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Category</label>
                  <select className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 outline-none transition-all appearance-none">
                    <option>Engineering</option>
                    <option>Product Design</option>
                    <option>AI Research</option>
                    <option>Career</option>
                  </select>
                </div>
              </div>
            </div>

            {/* AI Assistant Hook */}
            <div className="p-6 rounded-2xl bg-linear-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">AI Assistant</span>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Let AI help you generate an SEO-friendly summary or suggest better titles based on your content.
              </p>
              <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all">
                Improve Article
              </button>
            </div>

            {/* Publish Info */}
            <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <Info size={16} className="text-slate-500 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">
                Your post will be published immediately. You can always edit or unpublish it later from your dashboard.
              </p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default CreateBlog;