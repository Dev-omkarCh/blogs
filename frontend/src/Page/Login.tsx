// components/LoginPage.tsx
import React, { useState, useMemo } from 'react'; // <-- Import useMemo
import { LogIn, Loader2, AlertCircle, Icon, User, Mail, Key } from 'lucide-react';
import useLogin from '@/hooks/useLogin';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

// Define the type for the form data
interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const { login, loading } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setFormData(prev => ({ ...prev, email: value }));
    }
    if (name === "password") {
      setFormData(prev => ({ ...prev, password: value }));
    }
    if (error) setError('');
  };

  const isFormValid = useMemo(() => {
    // This value is ONLY recalculated when formData changes
    return formData.email.trim() !== '' && formData.password.trim() !== '';
  }, [formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 min-w-screen">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">

        <h2 className="text-3xl font-bold text-white text-center mb-10">
          <span className="text-sky-400">Welcome!</span> Login
        </h2>

        <form onSubmit={handleSubmit}>

          {error && (
            <div className="flex items-center p-4 mb-6 text-sm text-red-300 bg-red-900 border border-red-700 rounded-lg" role="alert">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">{error}</span>
            </div>
          )}
          <div className="mb-6">
            <label htmlFor={"email"} className={`block text-sm font-medium text-sky-400 mb-2`}>
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-400" />
              <Input
                name="email" type="email"
                placeholder="Enter your email"
                value={formData.email} onChange={handleChange}
                className="w-full mb-3 py-3 pl-10 pr-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg  transition duration-200 shadow-md placeholder-gray-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor={"password"} className={`block text-sm font-medium text-sky-400 mb-2`}>
              Password <span className="text-red-500">*</span>
            </label>
            <div style={{ position : "relative"}}>
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-400" />
              <Input
                name="password" type="password"
                placeholder="Enter your password"
                value={formData.password} onChange={handleChange}
                className="w-full mb-3 py-3 pl-10 pr-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg  transition duration-200 shadow-md placeholder-gray-500"
              />
            </div>
          </div>

            {/* Corrected Button Usage */}
            <button
              type="submit"
              // ✅ NOW CORRECT: Use the memoized boolean state instead of calling a function
              disabled={loading || !isFormValid}
              className="w-full mt-6 flex items-center justify-center px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200 disabled:opacity-50 shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Logging In...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" /> Log In
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-400 mt-6">
              Don't have an account?
              <Link to="/signup" className="text-sky-400 hover:text-sky-300 ml-1 font-medium">Sign Up Here</Link>
            </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;