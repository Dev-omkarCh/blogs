import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { type RootState } from '@/app/store';
import useLogout from '../hooks/useLogout';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.authUser);
  const { logout, isLoading } = useLogout();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none group"
      >
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold border-2 border-gray-800 group-hover:border-indigo-400 transition-all duration-200 shadow-lg">
          {user.profileImage ? (
            <img src={user.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-sm">{user.email?.charAt(0).toUpperCase()}</span>
          )}
        </div>
      </button>

      {/* Dropdown Menu (Dark Theme) */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-[#1e1e1e] border border-gray-700 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-150">
          
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-500">Account</p>
            <p className="text-sm font-medium text-gray-200 truncate mt-1">{user.email}</p>
          </div>

          {/* Navigation Links */}
          <div className="py-2">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Your Profile
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Dashboard
            </Link>
          </div>

          {/* Logout Section */}
          <div className="mt-1 border-t border-gray-700 pt-1">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              disabled={isLoading}
              className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              {isLoading ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;