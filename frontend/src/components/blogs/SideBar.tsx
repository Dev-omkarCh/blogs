import { Filter } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const categories = ["All", "Frontend", "Backend", "AI & ML", "DevOps", "Cloud", "Career"];
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();
    return (
        <aside className="lg:col-span-1 space-y-8">
            <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Filter size={14} className="text-indigo-500" /> Categories
                </h3>
                <div className="flex flex-wrap lg:flex-col gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm text-left transition-all ${selectedCategory === cat
                                    ? 'bg-indigo-600 text-white font-semibold'
                                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-linear-to-br from-indigo-600 to-blue-700 text-white">
                <h4 className="font-bold mb-2">Write for us</h4>
                <p className="text-xs text-indigo-100 mb-4 leading-relaxed">Share your knowledge with 100k+ developers and build your brand.</p>
                <button 
                    className="w-full py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors"
                    onClick={() => navigate('/create-blog')}
                >
                    Start Writing
                </button>
            </div>
        </aside>
    );
};

export default SideBar;
