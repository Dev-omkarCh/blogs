import { Youtube, Play, Clock, Trash2, ExternalLink } from 'lucide-react';

const YouTubeBlock = ({ data }: { data: any }) => {
  // Extract Video ID from various YouTube URL formats
  const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeID(data.url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  return (
    <div className="group relative my-12">

      <div className="rounded-[2.5rem] overflow-hidden border border-slate-800 bg-slate-900/30 shadow-2xl transition-all hover:border-red-500/30">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          
          {/* Thumbnail Section */}
          <div className="relative aspect-video rounded-3xl overflow-hidden group/thumb cursor-pointer">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="YouTube Thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110" />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">Invalid Link</div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
              <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/40">
                <a href={data.url} target="_blank" >
                    <Play fill="currentColor" size={24} />
                </a>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase flex items-center gap-1.5">
              <Youtube size={12} className="text-red-500" /> YouTube
            </div>
          </div>

          {/* Description & Timestamps */}
          <div className="flex flex-col justify-center py-2">
            <h4 className="text-xl font-bold text-white mb-3 line-clamp-2">
              {data.description || "Video Resource"}
            </h4>
            
            {data.timestamps && (
              <div className="space-y-2 mt-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Clock size={12} /> Key Timestamps
                </p>
                <div className="grid gap-1">
                  {data.timestamps.split('\n').map((line: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors group/time">
                      <span className="font-mono text-xs text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded">
                        {line.split(' ')[0]}
                      </span>
                      <span className="truncate">{line.split(' ').slice(1).join(' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <a 
              href={data.url} 
              target="_blank" 
              className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors"
            >
              Watch Original Video <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeBlock;