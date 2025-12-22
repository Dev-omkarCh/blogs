import { Flag } from 'lucide-react'

const EndBlog = (block : any) => {
    return (
        <div className="group relative mt-20 mb-10 p-10 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10 text-center overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[80px] rounded-full" />

            <Flag className="mx-auto mb-4 text-indigo-500" size={32} />
            <h3 className="text-2xl font-black text-white mb-2">{block.data.title || "Thanks for reading!"}</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-6 text-sm">{block.data.subtitle || "If you enjoyed this article, feel free to share it with your network."}</p>

            <div className="flex justify-center gap-4">
                <div className="px-6 py-2 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/20">Share Post</div>
                <div className="px-6 py-2 rounded-full border border-slate-800 text-slate-400 text-xs font-bold">Follow Author</div>
            </div>
        </div>
    );
};

export default EndBlog;