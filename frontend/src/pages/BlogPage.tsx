import { useState} from 'react';
import { 
  Plus, Code, Quote, AlertCircle, 
  ChevronLeft, Trash2, Heading1, List, 
  Columns, MousePointer2 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const VisualBlogEditor = () => {
  const [blocks, setBlocks] = useState<any[]>([
    { id: '1', type: 'text', html: 'Start typing your story here...', color: 'text-slate-300', content: '' }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const templates = [
    { id: 'h2', name: "Section Heading", icon: Heading1, fields: ['text'], color: "text-white" },
    { id: 'alert', name: "Feature Note", icon: AlertCircle, fields: ['title', 'message'], color: "text-amber-400" },
    { id: 'list', name: "Step List", icon: List, fields: ['item1', 'item2', 'item3'], color: "text-green-400" },
    { id: 'bento', name: "Bento Grid (2 Images)", icon: Columns, fields: ['url1', 'url2'], color: "text-indigo-400" },
    { id: 'code', name: "Code Block", icon: Code, fields: ['lang', 'code'], color: "text-blue-400" },
    { id: 'quote', name: "Design Quote", icon: Quote, fields: ['text', 'author'], color: "text-purple-400" }
  ];

  // const updateBlockColor = (id: string, colorClass: string) => {
  //   setBlocks(blocks.map(b => b.id === id ? { ...b, color: colorClass } : b));
  // };

  const addTextBlock = (content : string) => {
    setBlocks(prev => [...prev, { id: Math.random().toString(), type: 'text', content }])
  };

  const addBlock = () => {
    const newBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type: activeTemplate.id,
      data: { ...formData }
    };
    setBlocks([...blocks, newBlock, { id: Math.random().toString(), type: 'text', content: '' }]);
    setIsDialogOpen(false);
    setFormData({});
  };

  const deleteBlock = (id: string) => {
    if (blocks.length > 1) {
        setBlocks(blocks.filter(b => b.id !== id));
    }
  };

  const handlePublishBlog = () => {
    blocks.map((block)=>{
        console.log(block?.content || block);
    });
  };

  // Function to apply styles to selected text
  // const applyStyle = (command: string, value?: string) => {
  //   document.execCommand(command, false, value);
  // };

  const isAutoFocus = (block : any) => {
    const size = blocks.length;
    const newblock = blocks[size - 1];
    if(newblock?.id === block?.id){
        return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <nav className="h-16 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between px-6 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <ChevronLeft className="text-slate-500 hover:text-white cursor-pointer" />
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Auto-saving</span>
          </div>
        </div>
        <button 
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-full text-sm font-bold 
            shadow-lg shadow-indigo-500/20 transition-all"
            onClick={handlePublishBlog}
        >
          Publish Article
        </button>
      </nav>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12">
        <main className="lg:col-span-8 p-10 lg:p-20 space-y-4">
          <input 
            placeholder="The Title of Your Masterpiece" 
            className="w-full bg-transparent text-6xl font-black outline-none placeholder:text-slate-900 mb-12 tracking-tighter"
          />

          {blocks.map((block) => (
            <div key={block.id} className="relative group min-h-5">
              {/* --- TEXT BLOCK --- */}
              {block.type === 'text' && (
                <input
                  value={block.content || ''}
                  onChange={(e) => setBlocks(blocks.map(b => b.id === block.id ? {...b, content: e.target.value} : b))}
                  onKeyUp={(e) => {
                    if(e.key === "Enter") addTextBlock(block.content)
                  }}
                  autoFocus={isAutoFocus(block)}
                  placeholder="Type '/' for commands or use the sidebar..."
                  className="w-full bg-transparent text-xl leading-relaxed outline-none resize-none placeholder:text-slate-900/50"
                />
              )}

              {/* --- HEADING BLOCK --- */}
              {block.type === 'h2' && (
                <h2 className="text-3xl font-bold text-white mt-12 mb-4 tracking-tight border-b border-slate-900 pb-2">
                  {block.data.text}
                </h2>
              )}

              {/* --- STEP LIST BLOCK --- */}
              {block.type === 'list' && (
                <div className="my-8 space-y-3">
                  {[block.data.item1, block.data.item2, block.data.item3].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-900/30 border border-slate-800 rounded-2xl">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <span className="text-slate-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* --- BENTO GRID BLOCK --- */}
              {block.type === 'bento' && (
                <div className="grid grid-cols-2 gap-4 my-8 h-64">
                   <div className="rounded-3xl bg-slate-900 overflow-hidden border border-slate-800">
                     <img src={block.data.url1} className="w-full h-full object-cover opacity-80" alt="Bento 1" />
                   </div>
                   <div className="rounded-3xl bg-slate-900 overflow-hidden border border-slate-800">
                     <img src={block.data.url2} className="w-full h-full object-cover opacity-80" alt="Bento 2" />
                   </div>
                </div>
              )}

              {/* --- PREVIOUS BLOCKS (Alert, Code, Quote) --- */}
              {block.type === 'alert' && (
                <div className="p-6 my-6 bg-amber-500/5 border-l-4 border-amber-500 rounded-r-2xl">
                  <h4 className="text-amber-500 font-bold mb-1 uppercase text-xs tracking-widest">{block.data.title}</h4>
                  <p className="text-slate-300">{block.data.message}</p>
                </div>
              )}

              {block.type === 'code' && (
                <div className="my-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 font-mono">
                  <div className="bg-slate-900 px-4 py-2 text-[10px] text-slate-500 uppercase tracking-widest">{block.data.lang}</div>
                  <pre className="p-6 text-indigo-300 text-sm overflow-x-auto"><code>{block.data.code}</code></pre>
                </div>
              )}

              {block.type === 'quote' && (
                <div className="my-16 px-12 border-l-2 border-indigo-500/30">
                   <p className="text-4xl font-serif italic text-white/90 leading-tight">"{block.data.text}"</p>
                   <p className="text-indigo-500 font-bold mt-4 uppercase tracking-widest text-xs">— {block.data.author}</p>
                </div>
              )}

              {/* ACTION: DELETE */}
                <button 
                  onClick={() => deleteBlock(block.id)}
                  className={`absolute -left-12 top-1/2 -translate-y-1/2 p-2 text-slate-700 opacity-0 
                  group-hover:opacity-100 transition-all bg-slate-900 rounded-lg border border-slate-800 shadow-xl 
                  hover:text-red-500`}
                >
                  <Trash2 size={16} />
                </button>
            </div>
          ))}
        </main>

        <aside className="lg:col-span-4 border-l border-slate-900 p-8 h-[calc(100vh-4rem)] sticky top-16 bg-slate-950/50">
          <div className="mb-10">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-6 flex items-center gap-2">
              <Plus size={14}/> Add Content Block
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {templates.map(temp => (
                <button 
                  key={temp.id}
                  onClick={() => { setActiveTemplate(temp); setIsDialogOpen(true); }}
                  className="w-full flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-indigo-500/50 hover:bg-slate-900 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-slate-950 ${temp.color}`}><temp.icon size={18} /></div>
                    <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">{temp.name}</span>
                  </div>
                  <MousePointer2 size={14} className="text-slate-700 group-hover:text-indigo-500" />
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-lg rounded-4xl">
          <DialogHeader><DialogTitle className="text-2xl font-bold">Configure Block</DialogTitle></DialogHeader>
          <div className="grid gap-6 py-4">
            {activeTemplate?.fields.map((field: string) => (
              <div key={field} className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">{field}</label>
                <textarea 
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
                  placeholder={`Enter ${field}...`}
                  rows={field === 'code' || field === 'text' ? 5 : 2}
                  onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <button onClick={addBlock} className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20">
              Insert Block
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisualBlogEditor;