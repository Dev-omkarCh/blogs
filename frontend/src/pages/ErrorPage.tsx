import React from 'react';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-slate-950 flex flex-center items-center justify-center p-4">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 text-center">
        {/* Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl animate-bounce">
            <FileQuestion size={48} className="text-blue-400" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-8xl font-bold text-white mb-2 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-slate-200 mb-4">
          Page not found
        </h2>
        <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or perhaps it never existed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white 
            rounded-lg transition-colors duration-200 font-medium"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 hover:bg-blue-500 text-white 
            rounded-lg transition-all duration-400 font-medium shadow-lg shadow-blue-500/20"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;