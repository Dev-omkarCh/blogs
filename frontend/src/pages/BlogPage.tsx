import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CodeBlock from '@/components/createBlog/CodeBlock';
import {
  Clock,
  Calendar,
  Send,
  MessageSquare,
  Heart
} from 'lucide-react';
import ShareModal from '@/components/viewBlog/ShareModal';
import toast from 'react-hot-toast';

interface Blog {
  _id: string;
  title: string;
  content: any[];
  stats: any;
  comments: any[];
  createdAt: string;
  updatedAt: string;
  status: string;
  category: string;
  published: boolean;
  tags: string[];
  _v: number;
}

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [likes, setLikes] = useState<string[]>([]); // Array of User IDs
  const [comments, setComments] = useState<any[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const currentUserId = "693c4e935bc2a5acef46c5ba"; // Get this from your Auth context
  const [commentText, setCommentText] = useState("");

  // Dynamic Scroll Progress Logic
  // useEffect(() => {
  //   const updateScroll = () => {
  //     const currentScroll = window.scrollY;
  //     const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  //     if (scrollHeight) setScrollProgress((currentScroll / scrollHeight) * 100);
  //   };
  //   window.addEventListener("scroll", updateScroll);
  //   return () => window.removeEventListener("scroll", updateScroll);
  // }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/blogs/${id}`);
        console.log(response.data.blog);
        setBlog(response.data.blog);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (blog && blog.stats) {
      setLikes(blog.stats?.likes || []);
      // Check if current user has already liked the post
      if(blog.stats?.likes?.length > 0){
        setIsLiked(blog.stats?.likes?.includes(currentUserId));
      }
    }
    if(blog && blog.comments){
      setComments(blog.comments);
    }
  }, [blog]);

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "No date provided";

    const d = new Date(date);
    
    // Check if the date is valid
    if (isNaN(d.getTime())) return "Invalid date";

    return d.toLocaleDateString("en-US", { 
        month: "long", 
        day: "numeric", 
        year: "numeric" 
    });
};

  // 2. Updated Like Handler
  const handleLike = async () => {
    try {

      const response = await axios.post(`http://localhost:4000/api/blogs/${blog._id}/like`, {
        userId: currentUserId
      });

      setBlog(response.data.blog);
    } catch (err: any) {
      console.error("Like failed", err);
      toast.error(err?.message);
      // Rollback to original state on error
      setLikes(blog.stats.likes);
      setIsLiked(blog.stats.likes.includes(currentUserId));
    }
  };

  // 3. Updated Comment Handler
  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await axios.post(`http://localhost:4000/api/blogs/${blog._id}/comment`, {
        userId: currentUserId,
        comment: commentText
      });

      console.log(response.data);

      // The backend should return the newly created comment object
      setBlog((prev: Blog) => ({
        ...prev,
        stats: {
          ...prev.stats,
          comments: [...(prev.stats?.comments || []), response.data.newComment as Comment]
        }
      }));
      setCommentText("");
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!blog) return <div className="min-h-screen bg-slate-950 text-white p-20">Blog not found.</div>;

  return (
    <div className="min-h-screen pb-10 bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">

      {/* DYNAMIC PROGRESS BAR */}
      {/* <div className="fixed top-0 left-0 w-full h-1 bg-slate-900/50 z-60 backdrop-blur-sm">
        <div className="h-full bg-indigo-500 transition-all duration-150 shadow-[0_0_15px_#6366f1]" style={{ width: `${scrollProgress}%` }} />
      </div> */}

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-24">

          {/* --- LEFT / CENTER: MAIN CONTENT (Col 1-8) --- */}
          <main className="lg:col-span-8 pb-40">
            <header className="mb-12">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-8">
                {blog.title}
              </h1>
              {blog.image && (
                <img src={blog.image} className="w-full h-[450px] object-cover rounded-[2.5rem] border border-slate-900 shadow-2xl" alt="Cover" />
              )}
            </header>

            <article className="space-y-10">
              {blog.content.map((block: any) => (
                <div key={block.id}>
                  {block.type === 'text' && (
                    <div className={`text-xl leading-relaxed opacity-90 ${block.color}`} dangerouslySetInnerHTML={{ __html: block.html }} />
                  )}
                  {block.type === 'h2' && <h2 className="text-4xl font-black text-white mt-16 mb-4">{block.data.text}</h2>}
                  {block.type === 'code' && <CodeBlock data={block.data} onDelete={() => { }} />}
                  {/* ... other block types (youtube, divider, etc.) same as before */}
                </div>
              ))}
            </article>
            <section className="mt-20 pt-20 border-t border-slate-900">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-black text-white tracking-tighter flex items-center gap-4">
                  Discussion <span className="text-sm font-mono text-slate-600 bg-slate-900 px-3 py-1 rounded-full">{comments.length}</span>
                </h3>

                {/* LIKE BUTTON TOGGLE */}
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all ${isLiked
                    ? "bg-rose-500/10 border-rose-500 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                    : "border-slate-800 text-slate-400 hover:border-slate-600"
                    }`}
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                  <span className="text-sm font-bold">{likes.length}</span>
                </button>
              </div>

              {/* COMMENT INPUT */}
              <form onSubmit={handleComment} className="mb-16 group">
                <div className="relative">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add to the discussion..."
                    className="w-full bg-slate-900/30 border border-slate-800 rounded-[2rem] p-6 text-white outline-none focus:border-indigo-500 focus:bg-slate-900/50 transition-all min-h-[120px] resize-none"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest opacity-0 group-focus-within:opacity-100 transition-opacity">Press Cmd + Enter</span>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>

              {/* COMMENTS FEED */}
              <div className="space-y-8">
                {comments.length > 0 ? comments.map((comment) => (
                  <div key={Math.random() * 10} className="flex gap-5 group animate-in fade-in slide-in-from-left-4 duration-500">
                    {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                      {c.author[0]}
                    </div> */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        {/* <span className="text-sm font-bold text-white">{c.author}</span> */}
                        <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        {comment?.comment}
                      </p>
                      <div className="flex items-center gap-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-widest flex items-center gap-1.5"><Heart size={12} /> Like</button>
                        <button className="text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-widest flex items-center gap-1.5"><MessageSquare size={12} /> Reply</button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10 border-2 border-dashed border-slate-900 rounded-[3rem]">
                    <MessageSquare size={32} className="mx-auto text-slate-800 mb-4" />
                    <p className="text-slate-600 text-sm font-bold uppercase tracking-widest">No comments yet. Start the conversation!</p>
                  </div>
                )}
              </div>
            </section>
          </main>

          {/* --- RIGHT: STICKY DETAILS SIDEBAR (Col 9-12) --- */}
          <aside className="lg:col-span-4 lg:block">
            <div className="sticky top-24 space-y-8">

              {/* AUTHOR CARD */}
              <div className="p-6 rounded-3xl bg-slate-900/30 border border-slate-800">
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4">Written By</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white uppercase">{blog.author[0]}</div>
                  <div>
                    <p className="text-sm font-bold text-white">{blog.author}</p>
                    <p className="text-xs text-slate-500">Full Stack Developer</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-slate-500">
                  {/* <span className="text-xs flex items-center gap-1.5"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span className="text-xs flex items-center gap-1.5"><Clock size={14} /> {blog.stats?.readTime}</span> */}
                </div>
              </div>

              {/* STATS & ENGAGEMENT */}
              <div className="flex items-center justify-between px-6 py-4 rounded-3xl border border-slate-800 bg-slate-900/10">
                <div className="text-center">
                  <p className="text-[10px] text-slate-600 font-bold uppercase mb-1">Views</p>
                  <p className="text-sm font-black text-white">{blog.stats?.views || 0}</p>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div className="text-center">
                  <p className="text-[10px] text-slate-600 font-bold uppercase mb-1">Likes</p>
                  {/* Use the length of the likes array */}
                  <p className="text-sm font-black text-white">{likes.length}</p>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div className="text-center">
                  <p className="text-[10px] text-slate-600 font-bold uppercase mb-1">Comments</p>
                  {/* Use the length of the comments array */}
                  <p className="text-sm font-black text-white">{comments.length}</p>
                </div>
              </div>

              {/* CATEGORY & TAGS */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Filed Under</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20">{blog.category}</span>
                  {blog.tags?.map((tag: string) => (
                    <span key={tag} className="px-4 py-2 rounded-xl border border-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-400 transition-all cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTIONS */}
              <button
                onClick={() => setIsShareOpen(true)}
                className="w-full py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-indigo-400 transition-colors shadow-xl shadow-white/5"
              >
                <Send size={16} /> Share Post
              </button>

              {/* Add the Modal component at the end of your JSX */}
              <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                blogData={blog}
              />

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default BlogView;