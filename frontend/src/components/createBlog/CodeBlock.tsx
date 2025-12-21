import React, { useState } from 'react';
import { Copy, Check, Terminal, Palette, ChevronDown, Trash2 } from 'lucide-react';

const CodeBlock = ({ data }: { data: any, onDelete: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState('github');

  // 1. Theme Configuration with specific Syntax Colors
  const codeThemes = {
    github: { 
      name: 'GitHub Dark', 
      bg: 'bg-[#0d1117]', 
      header: 'bg-[#161b22]',
      border: 'border-[#30363d]',
      syntax: { kw: 'text-pink-500', str: 'text-emerald-400', num: 'text-orange-400', fn: 'text-sky-400', tag: 'text-indigo-400' }
    },
    dracula: { 
      name: 'Dracula', 
      bg: 'bg-[#282a36]', 
      header: 'bg-[#21222c]',
      border: 'border-[#44475a]',
      syntax: { kw: 'text-[#ff79c6]', str: 'text-[#f1fa8c]', num: 'text-[#bd93f9]', fn: 'text-[#50fa7b]', tag: 'text-[#ffb86c]' }
    },
    monokai: { 
      name: 'Monokai', 
      bg: 'bg-[#272822]', 
      header: 'bg-[#1e1f1c]',
      border: 'border-[#3e3d32]',
      syntax: { kw: 'text-[#f92672]', str: 'text-[#e6db74]', num: 'text-[#ae81ff]', fn: 'text-[#a6e22e]', tag: 'text-[#66d9ef]' }
    },
    nord: { 
      name: 'Nordic', 
      bg: 'bg-[#2e3440]', 
      header: 'bg-[#3b4252]',
      border: 'border-[#4c566a]',
      syntax: { kw: 'text-[#81a1c1]', str: 'text-[#a3be8c]', num: 'text-[#b48ead]', fn: 'text-[#88c0d0]', tag: 'text-[#ebcb8b]' }
    },
    vscode: { 
    name: 'VS Code Dark+', 
    bg: 'bg-[#1e1e1e]', 
    header: 'bg-[#252526]',
    border: 'border-[#333333]',
    syntax: { 
      kw: 'text-[#569cd6]',      // Classic VS Code Blue
      str: 'text-[#ce9178]',     // Terracotta/Ginger
      num: 'text-[#b5cea8]',     // Light Green
      fn: 'text-[#dcdcaa]',      // Soft Gold/Yellow
      tag: 'text-[#808080]',     // Gray for braces
      attr: 'text-[#9cdcfe]',    // Light Blue for attributes
      type: 'text-[#4ec9b0]'     // Teal for types/classes
    }
  },
  };

  const active = codeThemes[theme as keyof typeof codeThemes];

  // 2. Dynamic One-Pass Highlighter
  const highlightCode = (code: string) => {
  if (!code) return "";
  let escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const s = active.syntax; 

  return escaped.replace(
    /\/\/.*|(&quot;.*?&quot;|'.*?'|`.*?`)\b(const|let|var|function|return|if|else|import|export|from|class|await|async|default|public|private|interface|type|enum)\b|\b(string|number|boolean|any|void|unknown|never|Object|Array|Promise)\b|\b(true|false|null|undefined)\b|\b(\d+)\b|\b([A-Z]\w+|[a-z_]\w*(?=\s*\())|([a-zA-Z\-]+)(?=\s*=\s*{|&quot;|')|(&lt;\/?[a-z0-9]+|&gt;|\{|\})/g,
    (match) => {
      // 1. Comments
      if (match.startsWith('//')) return `<span class="text-slate-500 italic">${match}</span>`;
      
      // 2. Strings
      if (match.startsWith('&quot;') || match.startsWith("'") || match.startsWith("`")) 
        return `<span class="${s.str}">${match}</span>`;
      
      // 3. Keywords (const, function, etc.)
      if (/\b(const|let|var|function|return|if|else|import|export|from|class|await|async|default|public|private|interface|type|enum)\b/.test(match)) 
        return `<span class="${s.kw}">${match}</span>`;

      // 4. Built-in Types (string, number, any)
      if (/\b(string|number|boolean|any|void|unknown|never|Object|Array|Promise)\b/.test(match))
        return `<span class="text-amber-400 font-medium">${match}</span>`;

      // 5. Booleans & Nulls
      if (/\b(true|false|null|undefined)\b/.test(match))
        return `<span class="text-orange-500 font-bold">${match}</span>`;
      
      // 6. Numbers
      if (/^\d+$/.test(match)) 
        return `<span class="${s.num}">${match}</span>`;
      
      // 7. Functions & Components
      if (/^[A-Z]/.test(match) || match.includes('(')) 
        return `<span class="${s.fn}">${match}</span>`;

      // 8. Attributes (The part before the '=')
      if (/^[a-zA-Z\-]+$/.test(match) && !/\b(const|let|var)\b/.test(match))
        return `<span class="text-teal-400 italic">${match}</span>`;
      
      // 9. Tags & Braces
      if (match.startsWith('&lt;') || match === '&gt;' || match === '{' || match === '}') 
        return `<span class="${s.tag}">${match}</span>`;
      
      return match;
    }
  );
};

  return (
    <div className="group relative my-10 font-sans">

      <div className={`rounded-2xl border ${active.border} ${active.bg} overflow-hidden shadow-2xl transition-all duration-500`}>
        <div className={`px-5 py-3 ${active.header} border-b ${active.border} flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
            </div>
            
            <div className="h-4 w-px bg-white/5 mx-1" />

            <div className="relative group/theme">
              <button className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${active.syntax.fn} opacity-80 hover:opacity-100 transition-all`}>
                <Palette size={12} /> {active.name} <ChevronDown size={10} />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-44 bg-[#161b22] border border-slate-800 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover/theme:opacity-100 group-hover/theme:visible transition-all z-50">
                {Object.keys(codeThemes).map((id) => (
                  <button 
                    key={id} 
                    onClick={() => setTheme(id)}
                    className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    {codeThemes[id as keyof typeof codeThemes].name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{data.lang || 'JS'}</span>
             <button onClick={() => {navigator.clipboard.writeText(data.code); setCopied(true); setTimeout(()=>setCopied(false), 2000)}} className="text-slate-500 hover:text-white transition-colors">
               {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
             </button>
          </div>
        </div>

        <div className="p-8 overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed transition-colors duration-500">
            <code 
              className="block whitespace-pre"
              dangerouslySetInnerHTML={{ __html: highlightCode(data.code) }} 
            />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;