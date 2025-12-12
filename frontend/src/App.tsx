import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import type { Blog } from "@/types/Blog";
import BlogCard from "./components/BlogCard";
import toast from 'react-hot-toast';
import LoadingSpinner from "./components/LoadingSpinner";
import SearchBar from "./components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { decrement, increment, incrementByAmount } from "./features/counter/counterSlice";

const App = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const count = useSelector((state: RootState) => state.counter.value);
  const autUser = useSelector((state: RootState) => state.authUser);
  const accessToken = useSelector((state: RootState) => state.accessToken);
  const dispatch = useDispatch();

  const fetchBlogs = async() => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blogs");
      console.log(response.data.blogs);
      setBlogs(response.data.blogs);
      // toast.success("Blogs fetched successfully!");
      
    } catch (error) {
      toast.error("Failed to fetch blogs. Please try again later.");
      console.error("Error fetching blogs:", error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchBlogs();
  },[]);

  const filteredBlogs = useMemo(() => {
    if (!searchTerm) {
      return blogs; // Return all blogs if search term is empty
    }

    const lowerCaseSearch = searchTerm.toLowerCase();

    return blogs.filter(blog => {
      // Check Title Match
      const titleMatch = blog.title.toLowerCase().includes(lowerCaseSearch);
      if (titleMatch) return titleMatch;
      
      // Check Content Match (description)
      const contentMatch = blog.content.toLowerCase().includes(lowerCaseSearch);
      if (contentMatch) return contentMatch;

      // Check Author Match
      const authorMatch = blog.author.toLowerCase().includes(lowerCaseSearch);
      if (authorMatch) return authorMatch;

      // Check Keywords Match
      const keywordsMatch = blog.keywords.some(keyword => 
        keyword.toLowerCase().includes(lowerCaseSearch)
      );
      if(keywordsMatch) return keywordsMatch;

      return titleMatch || contentMatch || keywordsMatch || authorMatch;
    });
  }, [blogs, searchTerm]); // Recalculate only when blogs or searchTerm changes

  const handleSearchChange = (query: string) => {
    setSearchTerm(query);
  };

  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 w-screen">
        <LoadingSpinner size="w-12 h-12" />
        <div>
      <div>
        {count}
        <span className="text-white">{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          className="text-white"
        >
          Increment
        </button>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(incrementByAmount(10))}
          className="text-white"
        >
          Increment By 10
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          className="text-white"
        >
          Decrement
        </button>
      </div>
    </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8 min-w-screen overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header: Light text for contrast */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-50 text-center mb-12 pt-6">
          <span className="text-blue-400">Dragon</span> Blogs
        </h1>
        {/* Search Bar */}
            <SearchBar
              searchTerm={searchTerm} 
              onSearchChange={handleSearchChange} 
        />

        {/* Blog Grid: Responsive layout (1, 2, or 3 columns) */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 text-lg">
              No blog posts found. Please check back later!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
