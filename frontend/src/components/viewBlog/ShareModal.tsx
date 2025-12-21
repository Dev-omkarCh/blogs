import { Send, Twitter, Linkedin, Link as LinkIcon, Facebook } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from 'react';

const ShareModal = ({ isOpen, onClose }: any) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { name: 'X', icon: <Twitter size={24} />, color: 'bg-white/10', link: `https://twitter.com/intent/tweet?url=${shareUrl}` },
    { name: 'LinkedIn', icon: <Linkedin size={24} />, color: 'bg-[#0077b5]', link: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}` },
    { name: 'Facebook', icon: <Facebook size={24} />, color: 'bg-[#1877f2]', link: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { name: 'WhatsApp', icon: <Send size={24} />, color: 'bg-[#25d366]', link: `https://wa.me/?text=${shareUrl}` },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#121212] border-none text-white max-w-[400px] rounded-3xl p-0 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <span className="text-sm font-bold tracking-tight">Share</span>
          {/* <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button> */}
        </div>

        <div className="p-6">
          {/* Social Icons Row (Instagram Style) */}
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
            {socials.map((social) => (
              <a 
                key={social.name} 
                href={social.link} 
                target="_blank" 
                rel="noreferrer"
                className="flex flex-col items-center gap-2 min-w-[70px] group"
              >
                <div className={`w-14 h-14 rounded-full ${social.color} flex items-center justify-center transition-transform group-active:scale-90`}>
                  {social.icon}
                </div>
                <span className="text-[10px] font-medium text-slate-400">{social.name}</span>
              </a>
            ))}
          </div>

          {/* Copy Link Section */}
          <div className="mt-4 flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2 pl-4">
            <LinkIcon size={16} className="text-slate-500" />
            <input 
              readOnly 
              value={shareUrl} 
              className="bg-transparent text-xs text-slate-300 outline-none flex-1 truncate font-mono"
            />
            <button 
              onClick={handleCopy}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                copied ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-slate-200'
              }`}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;