import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Menu, X, PenSquare,
  ArrowRight, Sparkles,
  Terminal, Globe, Shield,
  ChevronRight, Github, Twitter, Linkedin,
  Eye, Clock, Flame
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContactForm from '@/components/home/ContactForm';

const FullLandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();

  const testimonials = [
    { name: "Alex Rivera", role: "Senior Engineer @ Vercel", text: "DevJournal changed how I share my technical knowledge. The markdown support is elite." },
    { name: "Sarah Drasner", role: "Staff Designer", text: "The cleanest blogging interface I have ever used. Finally, a home for my thoughts." },
    { name: "Mike Ross", role: "CTO @ StartupX", text: "Built for developers. The SEO optimization out of the box is a game changer for our team." }
  ];

  const hotTopics = [
    {
      title: "The Rise of Agentic AI: Beyond LLMs",
      author: "Dr. Aris",
      tags: ["AI", "Future"],
      views: "42k",
      time: "12 min",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      hot: true
    },
    {
      title: "React Server Components: The Good, Bad & Ugly",
      author: "Dan Abramov",
      tags: ["React", "Frontend"],
      views: "38k",
      time: "8 min",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      hot: false
    },
    {
      title: "Rust for Pythonistas: Speed up your Backend",
      author: "Lydia Hallie",
      tags: ["Rust", "Backend"],
      views: "29k",
      time: "15 min",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
      hot: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 top-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">DevJournal</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Articles</a>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20">
              <PenSquare size={16} /> Write
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-400">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#4f46e533,transparent_70%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <Sparkles size={14} /> <span>Join the developer community</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tighter">
            Think. Code. <br /> <span className="text-indigo-500">Publish.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed italic">
            "The best way to learn is to teach others." 
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl 
              font-bold transition-all flex items-center justify-center gap-2 group"
              onClick={() => navigate("/blog/create")}
            >
              Start Your Blog <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* --- HOT TOPICS SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Flame className="text-orange-500" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Trending Now</h2>
            </div>
            <a href="#" className="text-slate-400 hover:text-indigo-400 text-sm font-semibold flex items-center gap-1 group">
              View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {hotTopics.map((topic, i) => (
              <div key={i} className="group relative bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={topic.image} alt={topic.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    {topic.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {topic.title}
                  </h3>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/50">
                    <span className="text-xs text-slate-500 font-medium">By {topic.author}</span>
                    <div className="flex items-center gap-4 text-slate-500">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Eye size={14} /> {topic.views}
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        <Clock size={14} /> {topic.time}
                      </div>
                    </div>
                  </div>
                </div>
                {topic.hot && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-orange-500/40">
                    HOT
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {[
              { icon: Terminal, t: "Zero Config", d: "Beautiful code syntax highlighting built-in." },
              { icon: Globe, t: "Custom Domains", d: "Host your blog on your own domain for free." },
              { icon: Shield, t: "Privacy First", d: "No tracking, no ads, no bloat. Just content." }
            ].map((f, i) => (
              <div key={i} className="p-8">
                <f.icon className="text-indigo-500 mb-4 mx-auto md:mx-0" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">{f.t}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL CAROUSEL --- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="min-h-[160px] flex items-center justify-center">
            {testimonials.map((t, i) => (
              <div key={i} className={`${i === activeTestimonial ? 'block animate-in fade-in slide-in-from-bottom-4 duration-500' : 'hidden'}`}>
                <p className="text-2xl md:text-4xl text-slate-200 font-medium tracking-tight mb-8 leading-tight">"{t.text}"</p>
                <div className="flex flex-col items-center">
                   <div className="w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-full mb-3 flex items-center justify-center text-indigo-400 font-bold">
                     {t.name.charAt(0)}
                   </div>
                   <h4 className="font-bold text-white">{t.name}</h4>
                   <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT FORM --- */}
      <ContactForm />

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 p-1 rounded-md"><BookOpen size={18} className="text-white" /></div>
                <span className="text-2xl font-bold text-white tracking-tighter">DevJournal</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">Empowering fellow developers to document their journey and share their expertise with the world.</p>
              <div className="flex gap-6 text-slate-600">
                <Github size={22} className="hover:text-indigo-500 cursor-pointer transition-colors" />
                <Twitter size={22} className="hover:text-indigo-500 cursor-pointer transition-colors" />
                <Linkedin size={22} className="hover:text-indigo-500 cursor-pointer transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div>
                <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Ecosystem</h4>
                <ul className="text-slate-500 space-y-3 text-sm font-medium">
                  <li><a href="#" className="hover:text-white transition-colors">Showcase</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Plugins</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Company</h4>
                <ul className="text-slate-500 space-y-3 text-sm font-medium">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[11px] gap-6 uppercase tracking-widest font-semibold">
            <p>© 2025 DEVJOURNAL INC. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FullLandingPage;