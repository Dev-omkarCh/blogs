import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  UserCircle,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  EyeOff,
  Eye
} from 'lucide-react';
import GenderDropdown from '@/components/GenderDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useSignup from '@/hooks/useSignup';
import LoadingSpinner from '@/components/LoadingSpinner';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    gender: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const {isLoading, signup} = useSignup();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log('Account created:', formData);
    await signup(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === 'fullName') {
      setFormData(prev => ({
        ...prev,
        fullName: value
      }));
    }
    else if (name === 'username') {
      setFormData(prev => ({
        ...prev,
        username: value
      }));
    }
    else if (name === 'email') {
      setFormData(prev => ({
        ...prev,
        email: value
      }));
    }
    else if (name === 'password') {
      setFormData(prev => ({
        ...prev,
        password: value
      }));
    }
    else if (name === 'gender') {
      console.error("Gender Input Field does not Exists");
    }
    else{
      console.error("No Such Input Field Exists");
    };
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-slate-950">
      {/* Left Side: Brand/Info (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 border-zinc-800  items-center justify-center relative overflow-hidden border-r">
        <div className="absolute top-0 left-0 w-full h-full from-indigo-500/10 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-md text-center p-8">
          <div className="inline-flex p-3 bg-indigo-600 rounded-2xl mb-6 shadow-2xl shadow-indigo-500/20">
            <BookOpen size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Join our community of blogs.</h1>
          <p className="text-slate-400 text-lg mb-8">Start your journey today and share your stories with millions of readers around the world.</p>

          <div className="space-y-4 text-left">
            {['Personalized feed', 'Ad-free reading', 'Weekly newsletters'].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 size={20} className="text-indigo-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="bg-zinc-900/50 w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden text-center">
            {/* <div className="inline-flex p-2 bg-indigo-600 rounded-lg mb-4">
              <BookOpen size={24} className="text-white" />
            </div> */}
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
          </div>

          <div className="mb-8">
            <h2 className="hidden lg:block text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400">Join DevJournal and start writing today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                Full Name
              </label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <UserCircle className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="block w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-3 text-zinc-200 placeholder-zinc-600 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="chris_evans12"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Group Username & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Username Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                  Username
                </label>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="username"
                    required
                    className="block w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-3 text-zinc-200 placeholder-zinc-600 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="chris_evans12"
                    onChange={handleInputChange}
                    value={formData.username}
                  />
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                  Gender
                </label>
                <div className="mt-1.5 relative">
                  <GenderDropdown formData={formData} setFormData={setFormData} />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                Email address
              </label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-3 text-zinc-200 placeholder-zinc-600 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                  Password
                </label>
              </div>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-10 text-zinc-200 placeholder-zinc-600 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 
              rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 
              flex items-center justify-center gap-2 group ${isLoading && 'bg-indigo-900 hover:bg-indigo-900'}`}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Create Account"}
              {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-[#151518] px-4 text-zinc-500">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="mt-6">
            <button
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              onClick={() => navigate("/google-auth")}
            >
              <FcGoogle className="h-5 w-5" />
              <span>Google</span>
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-slate-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Log in</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;