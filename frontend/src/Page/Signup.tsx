// components/SignUpForm.tsx
import React, { useState, useMemo } from 'react';
import { Mail, Key, User, Image, Zap, ChevronRight, ChevronLeft, Check, AlertCircle, Loader2 } from 'lucide-react';
import type { FormData, InputFieldProps, Gender, AuthUser } from '../types/Signup'; // Assume types are imported
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// --- Helper Component: InputField (TypeScript) ---
const InputField: React.FC<InputFieldProps> = ({ 
  icon: Icon, 
  name, 
  type = 'text', 
  label, 
  required = false, 
  placeholder, 
  value, 
  onChange 
}) => (
  <div className="mb-6">
    <label htmlFor={name} className={`block text-sm font-medium ${required ? 'text-sky-400' : 'text-gray-300'} mb-2`}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-400" />
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} // Cast for input elements
        placeholder={placeholder}
        required={required}
        className="w-full py-3 pl-10 pr-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 shadow-md placeholder-gray-500"
      />
    </div>
  </div>
);

// --- Main Component: SignUpForm (TypeScript) ---
const SignUpForm = () => {
  const [tab, setTab] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    username: '',
    profileImage: '',
    gender: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const requiredFields: (keyof FormData)[] = ['email', 'password', 'username'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  // Use useMemo for optimized required field validation check
  const isRequiredValid = useMemo(() => {
    return requiredFields.every(field => formData[field].trim() !== '');
  }, [formData]);

  const validateRequired = (): boolean => {
    if (!isRequiredValid) {
      setError(`Please fill in all required fields.`);
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (tab === 1 && !validateRequired()) {
      return;
    }
    setTab(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateRequired()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
        const response = await axios.post("/api/auth/signup/", formData);
        const user = response.data.user;
        setAuthUser(user);

        localStorage.setItem("authUser", JSON.stringify(user));
        setAccessToken(response.data?.accessToken);

        toast.success("Signup successful");
        navigate("/dashboard");
    } catch (error : any) {
        console.error("Error during signup: ", error?.message);
        toast.error(error?.message || "Signup failed");
    } finally{
        setIsSubmitting(false);
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 min-w-screen">
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        
        <h2 className="text-3xl font-bold text-white text-center mb-8">
            <span className="text-sky-400">Gemini</span> Sign Up
        </h2>

        {/* --- Tabs Navigation --- */}
        <div className="flex mb-8 border-b border-gray-700">
          <button
            type="button"
            onClick={() => setTab(1)}
            className={`flex-1 py-3 text-center text-lg font-medium transition-colors ${
              tab === 1 ? 'border-b-4 border-sky-400 text-sky-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Zap className="inline w-5 h-5 mr-2" />
            1. Required Info
          </button>
          <button
            type="button"
            onClick={() => setTab(2)}
            className={`flex-1 py-3 text-center text-lg font-medium transition-colors ${
              tab === 2 ? 'border-b-4 border-sky-400 text-sky-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <User className="inline w-5 h-5 mr-2" />
            2. Optional Details
          </button>
        </div>

        {/* --- Form Content --- */}
        <form onSubmit={handleSubmit}>
          
          {error && (
            <div className="flex items-center p-4 mb-4 text-sm text-red-300 bg-red-900 border border-red-700 rounded-lg" role="alert">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">{error}</span>
            </div>
          )}

          {/* --- Tab 1: Required Fields --- */}
          {tab === 1 && (
            <>
              <InputField icon={Mail} name="email" type="email" label="Email Address" required placeholder="Enter a valid email" value={formData.email} onChange={handleChange} />
              <InputField icon={Key} name="password" type="password" label="Password" required placeholder="Min 8 characters" value={formData.password} onChange={handleChange} />
              <InputField icon={User} name="username" label="Username" required placeholder="Unique username" value={formData.username} onChange={handleChange} />
            </>
          )}

          {/* --- Tab 2: Optional Fields --- */}
          {tab === 2 && (
            <>
              <InputField icon={User} name="fullName" label="Full Name" placeholder="Your first and last name" value={formData.fullName} onChange={handleChange} />
              
              <InputField icon={Image} name="profileImage" type="url" label="Profile Image URL" placeholder="Link to your profile picture" value={formData.profileImage} onChange={handleChange} />

              <div className="mb-6">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                  Gender
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-400" />
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full py-3 pl-10 pr-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 shadow-md"
                    >
                        <option value="" disabled>Select your gender (Optional)</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">other</option>
                    </select>
                </div>
              </div>
            </>
          )}

          {/* --- Navigation Buttons --- */}
          <div className="flex justify-between mt-8">
            {tab === 2 && (
              <button
                type="button"
                onClick={() => setTab(1)}
                className="flex items-center px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition duration-200"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
            )}

            {tab === 1 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isRequiredValid} // Disable if required fields are empty
                className="ml-auto flex items-center px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200 disabled:opacity-50"
              >
                Continue to Optional Info
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}

            {tab === 2 && (
              <button
                type="submit"
                disabled={isSubmitting || !isRequiredValid} // Disable if required fields are empty
                className="flex items-center px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Signing Up...
                    </>
                ) : (
                    <>
                        <Check className="w-5 h-5 mr-2" /> Sign Up Now
                    </>
                )}
              </button>
            )}
          </div>
          
          {tab === 2 && (
            <p className="text-center text-sm text-gray-400 mt-4">
                You can submit the form without filling the optional fields.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;