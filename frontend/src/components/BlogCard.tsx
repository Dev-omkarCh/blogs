import { ArrowRight, User, Calendar, Tag } from 'lucide-react'; // Import necessary icons
import type { Blog } from '@/types/Blog';
import { Navigate, useNavigate } from 'react-router-dom';
const BlogCard = ({blog} : {blog: Blog}) => {
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const navigate = useNavigate();
  const handleNavigateBlog = (id: string) => {
    navigate(`/blog/${id}`,{ state: { blog }});
  };

  return (
    // Card Container: Dark card background (gray-800), elevated on hover.
    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-[1.01] cursor-pointer border border-gray-700">
      
      {/* Title */}
      <h2 className="text-xl font-semibold text-white mb-3">
        {blog.title}
      </h2>
      
      {/* Metadata */}
      <div className="text-sm text-gray-400 mb-4 flex flex-col sm:flex-row sm:gap-4 border-b border-gray-700 pb-2">
        
        {/* Author */}
        <p className="flex items-center">
          <User className="w-4 h-4 mr-1 text-sky-400" />
          <span className="font-medium text-gray-200">{blog.author}</span>
        </p>

        {/* Date */}
        <p className="flex items-center mt-1 sm:mt-0">
          <Calendar className="w-4 h-4 mr-1 text-sky-400" />
          {formattedDate}
        </p>
      </div>

      {/* Keywords Section */}
      <div className="mb-4 pt-1">
        <div className="flex items-center text-sm text-gray-400 mb-2">
            <Tag className="w-4 h-4 mr-1 text-sky-400" />
            <span className="font-semibold text-gray-300">Tags:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {blog.keywords && blog.keywords.slice(0, 3).map((keyword, index) => ( // Show max 3 keywords
            // Keyword Pill Style: Dark background, light text, rounded edges
            <span 
              key={index}
              className="px-3 py-1 text-xs font-medium text-sky-300 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-150"
            >
              #{keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Content Preview */}
      <div className="text-gray-300 leading-relaxed mb-4">
        {blog.content.substring(0, 120)}...
      </div>

      {/* Read More Link */}
      <button className="text-sky-400 hover:text-sky-300 font-medium inline-flex items-center" onClick={() => handleNavigateBlog(blog.id)}>
        Read More
        <ArrowRight className="ml-1 w-4 h-4" />
      </button>
    </div>
  );
};

export default BlogCard;