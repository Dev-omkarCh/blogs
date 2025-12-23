import React, { useState } from 'react';
import { 
  Coffee, Heart, Beer, Pizza, Gift, 
  ArrowRight, ShieldCheck, Star, Sparkles,
  ChevronRight, CreditCard, Wallet,
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BuyMeCoffee = () => {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [message, setMessage] = useState('');

  const tiers = [
    { amount: 5, label: 'Coffee', icon: Coffee, desc: 'A small boost for a long coding night.' },
    { amount: 15, label: 'Pizza', icon: Pizza, desc: 'Fuel for building the next big feature.' },
    { amount: 50, label: 'Special Gift', icon: Gift, desc: 'Deep support for the project journey.' },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 lg:p-12 font-sans selection:bg-amber-500/30">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)}>
            <ChevronLeft />
        </button>
        {/* --- HERO SECTION --- */}
        <div className="relative p-12 rounded-[3rem] bg-gradient-to-br from-amber-500/10 via-slate-900/40 to-slate-950 border border-amber-500/20 mb-12 overflow-hidden text-center">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -ml-32 -mb-32" />

          <div className="relative">
            <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/20">
              <Coffee size={32} className="text-amber-500" />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-4">Support My Work</h1>
            <p className="text-slate-400 max-w-lg mx-auto leading-relaxed text-sm">
              If you find my articles helpful or enjoy the tools I build, consider supporting the journey. Every coffee fuels more open-source content.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT: DONATION OPTIONS (7 Cols) --- */}
          <div className="lg:col-span-7 space-y-8">
            <section className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 px-2 flex items-center gap-2">
                <Star size={12} /> Select a Tier
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tiers.map((tier) => (
                  <button
                    key={tier.amount}
                    onClick={() => setSelectedAmount(tier.amount)}
                    className={`p-6 rounded-3xl border text-left transition-all relative overflow-hidden group ${
                      selectedAmount === tier.amount 
                      ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/5' 
                      : 'bg-slate-900/20 border-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <tier.icon size={20} className={selectedAmount === tier.amount ? 'text-amber-500' : 'text-slate-600'} />
                    <div className="mt-4">
                      <span className="text-2xl font-black text-white">${tier.amount}</span>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">{tier.label}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 px-2">Leave a Message (Optional)</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Say something nice..."
                  className="w-full bg-slate-900/20 border border-slate-900 rounded-[2rem] p-6 text-sm focus:border-amber-500/50 outline-none transition-all h-32 resize-none placeholder:text-slate-700"
                />
            </section>

            <button className="w-full py-5 bg-amber-500 text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-400 transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-500/20 group">
              Complete Payment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* --- RIGHT: SUMMARY & TRUST (5 Cols) --- */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/30 border border-slate-900 rounded-[2.5rem] p-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-6">Support Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Selected Tier</span>
                  <span className="text-white font-bold">${selectedAmount}.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Platform Fee</span>
                  <span className="text-emerald-500 font-bold">$0.00</span>
                </div>
                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-slate-400">Total Contribution</span>
                  <span className="text-2xl font-black text-amber-500">${selectedAmount}.00</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">Secure Checkout</p>
                <div className="flex items-center gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 opacity-60">
                   <CreditCard size={18} className="text-slate-500" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Card / Stripe</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 opacity-60">
                   <Wallet size={18} className="text-slate-500" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PayPal / Crypto</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="px-4 space-y-4">
                <div className="flex items-start gap-3">
                    <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                    <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-bold tracking-tighter">Encrypted Transactions. Your data is never stored on our servers.</p>
                </div>
                <div className="flex items-start gap-3">
                    <Sparkles size={16} className="text-indigo-400 shrink-0" />
                    <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-bold tracking-tighter">Top supporters get featured on the global dashboard hall of fame.</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BuyMeCoffee;