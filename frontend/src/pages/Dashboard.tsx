import type { RootState } from "@/app/store";
import BlogsFeed from "@/components/blogs/BlogsFeed";
import AnalyticsOverview from "@/components/dashboard/Analytics";
import MyBlogs from "@/components/dashboard/MyBlogs";
import DashboardOverview from "@/components/dashboard/Overview";
import SettingsOverview from "@/components/dashboard/Settings";
import axiosInstance from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import BlogExplorer from "./Blogs";

const BlogDashboard = ({ activeItem = 'dashboard' }: { activeItem?: string }) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const userId = useSelector((state: RootState) => state.authUser.user?._id);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    const fetchMyBlogs = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/blogs/user/${userId}`);
        setBlogs(response.data.blogs);
      } catch (err : any) {
        console.error(err.message || "Failed to fetch blogs");
        toast.error(err.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, [userId]);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="text-indigo-500 animate-spin" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-12 font-sans selection:bg-indigo-500/30">

      {/* Dashboard Tab: Shows Stats + Recent Activity */}
      {activeItem === 'dashboard' && (
        <DashboardOverview blogs={blogs} onViewAll={() => {}} />
      )}

      {/* My Posts Tab: Shows your existing Filter/Search/Grid logic */}
      {activeItem === 'posts' && (
        <MyBlogs blogs={blogs} />
      )}

      {/* Analytics Tab */}
      {activeItem === 'analytics' && (
        <AnalyticsOverview />
      )}

      {/* Analytics Tab */}
      {activeItem === 'explore' && (
        <BlogExplorer />
      )}

      {/* Analytics Tab */}
      {activeItem === 'settings' && (
        <SettingsOverview />
      )}
    </div>
  );
};

export default BlogDashboard;