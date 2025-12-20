import React, { useState, type FormEvent } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '@/hooks/useLogin';
import LoadingSpinner from '@/components/LoadingSpinner';

const Login = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email : '',
    password : '',
  });
  const navigate = useNavigate();
  const { isLoading, login } = useLogin();

  // Example handler with FormEvent type
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
    if (name === 'email') {
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
    else{
      console.error("No Such Input Field Exists");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] min-w-screen flex items-center justify-center p-4 font-sans text-zinc-100">
      <div className="w-full max-w-md space-y-8">
        {/* Branding/Header */}
        <div className="text-center">
          {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 shadow-inner">
            <LogIn className="h-6 w-6 text-blue-500" />
          </div> */}
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Please enter your details to Log in
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <Link to="/reset-password" className="text-sm font-semibold text-blue-500 hover:text-blue-400">
                  Forgot password?
                </Link>
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative flex w-full justify-center items-center rounded-lg bg-blue-600 
              px-3 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 
              disabled:opacity-70 disabled:cursor-not-allowed ${isLoading && 'bg-blue-900 hover:bg-blue-900'}`}
              
            >
              {isLoading ? <LoadingSpinner /> : "Sign in"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
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
              onClick={()=> navigate("/google-auth")}
              >
              <FcGoogle className="h-5 w-5" />
              <span>Google</span>
            </button>
          </div>
        {/* Footer Link */}
        <p className="mt-8 text-center text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign up</Link>
        </p>
        </div>

      </div>
    </div>
  );
};

export default Login;