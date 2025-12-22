import axios from "axios";
import { Clock, Eye, Flame, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Mock data generator for infinite scroll
const generateBlogs = (page: number) => {

  return Array.from({ length: 6 }).map((_, i) => ({
    id: `blog-${page}-${i}`,
    title: `Scaling ${['React', 'Rust', 'AI', 'Node'][i % 4]} Applications to ${page * 10}k Users`,
    excerpt: "Exploring the deep architectural patterns that modern engineering teams use to maintain high availability and performance...",
    author: { name: "Alex Rivera", avatar: "AR" },
    category: ["Engineering", "Frontend", "Cloud"][i % 3],
    stats: { views: "1.2k", comments: "24", readTime: "8 min" },
    image: `https://picsum.photos/seed/${page * 6 + i}/800/450`,
    isHot: i === 0 && page === 1,
    isPopular: i === 1
  }));
};

const BlogsFeed = () => {
    const [activeTab, setActiveTab] = useState('Latest');
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const observerTarget = useRef(null);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const tabs = [
        { name: 'Latest', icon: Clock },
        { name: 'Popular', icon: TrendingUp },
        { name: 'Hot Topics', icon: Flame },
    ];

    // Infinite Scroll Observer

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //     (entries) => {
    //         if (entries[0].isIntersecting && !loading) {
    //         loadMoreBlogs();
    //         }
    //     },
    //     { threshold: 1.0 }
    //     );

    //     if (observerTarget.current) observer.observe(observerTarget.current);
    //     return () => observer.disconnect();
    // }, [loading]);

    const getBlogs = async() => {
        try {
            const response = await axios.get("/api/blogs/");
            console.log(response.data);
            setBlogs(response.data?.blogs);
        } catch (error : any) {
            console.error(error?.message || "Failed to fetch blogs")
            toast.error(error?.message || "Failed to fetch blogs");
        }
    }
    useEffect(()=>{
        getBlogs();
    },[]);

    const handleBlogClick = (id : string) => {
        navigate(`/blog/${id}`);
    };

    console.log(blogs);

    // const loadMoreBlogs = () => {
    //     setLoading(true);
    //     // Simulate API delay
    //     setTimeout(() => {
    //     const newBlogs = generateBlogs(page);
    //     setBlogs((prev) => [...prev, ...newBlogs]);
    //     setPage((prev) => prev + 1);
    //     setLoading(false);
    //     }, 800);
    // };

    return (
        <main className="lg:col-span-3">

            {/* Tabs Selector */}
            <div className="flex items-center gap-6 mb-8 border-b border-slate-900 pb-px">
                {tabs.map(tab => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center gap-2 pb-4 text-sm font-medium transition-all relative ${activeTab === tab.name ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.name}
                        {activeTab === tab.name && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full animate-in fade-in slide-in-from-left-2" />
                        )}
                    </button>
                ))}
            </div>

            {/* Blogs List */}
            <div className="grid grid-cols-1 gap-6">
                {blogs.map((blog) => (
                    <article
                        key={blog?._id || Math.random() * 10}
                        className="group bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 sm:p-6 hover:bg-slate-900/60 transition-all flex flex-col sm:flex-row gap-6"
                        onClick={() => handleBlogClick(blog?._id)}
                    >
                        <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                            <img src={blog?.image || '/placeholder.png'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                        </div>

                        <div className="grow flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                                        {blog?.category || ""}
                                    </span>
                                    {blog?.isHot && <span className="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded animate-pulse"><Flame size={10} /> HOT</span>}
                                </div>
                                <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-2 leading-snug">
                                    {blog?.title || ""}
                                </h2>
                                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                                    {blog?.content[0]?.content || ""}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-indigo-400 border border-slate-700">
                                        {blog?.author?.avatar || ""}
                                    </div>
                                    <span className="text-xs text-slate-500">{blog?.author || ""}</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-500">
                                    <span className="flex items-center gap-1.5 text-[11px] font-medium"><Eye size={14} /> {0}</span>
                                    <span className="flex items-center gap-1.5 text-[11px] font-medium"><Clock size={14} /> {'5 min'}</span>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Loading State & Observer Target */}
            {/* <div ref={observerTarget} className="py-12 flex justify-center">
                {loading && (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Fetching more stories...</span>
                    </div>
                )}
            </div> */}
        </main>
    );
};

export default BlogsFeed;
