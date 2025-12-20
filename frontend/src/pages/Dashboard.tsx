// components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { User, Lock, Mail, Settings, LogOut, ChevronRight, ChevronLeft, ArrowBigLeft, ArrowDown, ArrowLeft } from 'lucide-react';
import axiosInstance from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import axios from 'axios';
import type { FormData } from '@/types/Signup';
import { Link } from 'react-router-dom';
import useRefreshToken from '@/hooks/useRefreshToken';
import { setCredentials } from '@/features/auth/authSlice';
// import { setAuthUser } from '@/features/auth/authSlice';

// Mock list of sections for the right panel
const dashboardSections = [
    { name: 'Profile Settings', icon: User, key: 'profile' },
    { name: 'Security & Access', icon: Lock, key: 'security' },
    { name: 'Billing & Plans', icon: Mail, key: 'billing' },
];

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const authUser = useSelector((state: RootState) => state.authUser.user);
  const [user, setUser] = useState<FormData | null>(null);
  const refresh = useRefreshToken();

  // --- Sidebar Component ---
  const Sidebar: React.FC = () => (
    // Fixed width, dark background, border, subtle shadow
    <div className={`shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 shadow-xl h-full flex flex-col`}>
      
      {/* Sidebar Header/Toggle */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <Link to={"/login"}><ArrowLeft className='text-white mr-8' /></Link>
        {isSidebarOpen && <h2 className="text-xl font-semibold text-white">Account Center</h2>}
        <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="text-sky-400 hover:text-sky-300 transition duration-150 p-1 rounded-full hover:bg-gray-700"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Profile Summary */}
      <div className={`p-4 ${!isSidebarOpen && 'items-center'} flex flex-col border-b border-gray-700`}>
        <button onClick={async()=> {
          const token = await refresh();
          console.log(token)
        }}>Refresh</button>
        <img 
          src={authUser?.profileImage} 
          alt={`${authUser?.username}'s profile`} 
          className="w-16 h-16 rounded-full object-cover border-2 border-sky-400 mb-2" 
        />
        {isSidebarOpen && (
            <>
                <p className="text-lg font-medium text-white">{authUser?.username}</p>
                <p className="text-sm text-gray-400">{authUser?.email}</p>
            </>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="grow p-2 space-y-1">
        {dashboardSections.map((section) => {
          const Icon = section.icon;
          const isActive = section.key === activeSection;

          return (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`w-full flex items-center p-3 rounded-lg transition duration-200 ${
                isActive 
                  ? 'bg-sky-600/30 text-sky-400 font-semibold' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="ml-3 text-left grow">{section.name}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer/Logout */}
      <div className="p-4 border-t border-gray-700">
        <button className={`w-full flex items-center p-3 rounded-lg text-red-400 hover:bg-gray-700 transition duration-200`}>
          <LogOut className="w-5 h-5 shrink-0" />
          {isSidebarOpen && <span className="ml-3 text-left grow">Logout</span>}
        </button>
      </div>
    </div>
  );

  // --- Content Panel Component ---
  const ContentPanel: React.FC = () => {
    // Placeholder rendering based on activeSection
    const activeData = dashboardSections.find(s => s.key === activeSection) || { name: 'Unknown', icon: Settings };
    const ActiveIcon = activeData.icon;

    return (
      <div className="grow p-8 bg-gray-900 overflow-y-auto">
        
        {/* Title Block */}
        <header className="mb-8 pb-4 border-b border-gray-800 flex items-center">
            <ActiveIcon className="w-8 h-8 text-sky-400 mr-3" />
            <h1 className="text-3xl font-bold text-white">{activeData.name}</h1>
        </header>

        {/* Placeholder Content */}
        <div className="flex flex-col items-center justify-center p-16 bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700 h-[70vh]">
            <Settings className="w-16 h-16 text-gray-500 mb-6 animate-spin-slow" />
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">Feature In Building</h2>
            <p className="text-gray-500 text-center max-w-md">
                This area will contain the controls and settings for **{activeData.name}**. 
                Check back soon for updates on your account management tools.
            </p>
        </div>

        {/* You would replace the placeholder above with actual forms/data tables */}
        {/* Example: {activeSection === 'profile' && <ProfileSettingsForm user={mockUser} />} */}
      </div>
    );
  };

  const dispatch = useDispatch();

  useEffect(()=>{
    let isMounted = true;
    const controller = new AbortController();

    const fetchUserProfile = async() => {
    try {
      const response = await axiosInstance.get("/api/users/profile", {
        signal: controller.signal,
      });

      console.log(response.data);
      isMounted && setUser(response.data);
      dispatch(setCredentials({ user : response.data }));
    } catch (error : any) {
      console.error(error);
    }
    
    return () => {
      isMounted =  false;
      controller.abort();
    }
    };

  fetchUserProfile();
  },[]);

  // --- Main Render ---
  return (
    // Main wrapper ensures the dashboard takes up the whole viewport below any top nav
    <div className="flex h-screen w-screen bg-gray-900">
      <Sidebar />
      <ContentPanel />
    </div>
  );
};

export const dashboardLoader = () => {
  
};

export default Dashboard;