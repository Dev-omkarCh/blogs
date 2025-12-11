import { ArrowLeft, User, Calendar, Tag, FileText } from 'lucide-react'; 
import type { Blog } from '@/types/Blog';
import { useLocation, useParams } from 'react-router-dom';

const SingleBlogPage = () =>{
  
  const { id } = useParams();
  const location = useLocation();
  const blog = location.state?.blog; 

  if (!blog) {
    return (
      <div className="text-center py-20 text-gray-400 bg-gray-900 min-h-screen min-w-screen">
        <p className="text-xl">Blog post not found.</p>
        <button 
          onClick={()=> window.history.back()} 
          className="mt-6 text-sky-400 hover:text-sky-300 font-medium inline-flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go Back to Blogs
        </button>
      </div>
    );
  }

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8 w-screen">
      <div className="max-w-4xl mx-auto py-8">
        
        {/* Back Button */}
        <button 
          onClick={()=> window.history.back()} 
          className="text-lg text-sky-400 hover:text-sky-300 font-medium inline-flex items-center mb-8 transition duration-150"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Posts
        </button>

        {/* Blog Content Container (Card Style) */}
        <article className="bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-2xl border border-gray-700">
          
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-white mb-6 border-b border-gray-700 pb-4">
            {blog.title}
          </h1>

          {/* Metadata Section */}
          <div className="text-sm text-gray-400 mb-6 flex flex-col sm:flex-row sm:gap-6">
            <p className="flex items-center">
              <User className="w-4 h-4 mr-2 text-sky-400" />
              <span className="font-medium text-gray-200">Author: {blog.author}</span>
            </p>
            <p className="flex items-center mt-2 sm:mt-0">
              <Calendar className="w-4 h-4 mr-2 text-sky-400" />
              Published: {formattedDate}
            </p>
          </div>

          {/* Keywords/Tags */}
          <div className="mb-8 pt-2 border-b border-gray-700 pb-4">
            <div className="flex items-center text-md text-gray-400 mb-3">
                <Tag className="w-5 h-5 mr-2 text-sky-400" />
                <span className="font-semibold text-gray-300">Keywords:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.keywords && blog.keywords.map((keyword : string, index : number) => (
                <span 
                  key={index}
                  className="px-4 py-1 text-sm font-medium text-sky-300 bg-gray-700 rounded-full"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content Body */}
          <div className="text-lg text-gray-300 leading-relaxed space-y-6">
            <div className="flex items-center text-md text-gray-400 mb-3">
                <FileText className="w-5 h-5 mr-2 text-sky-400" />
                <span className="font-semibold text-gray-300">Article:</span>
            </div>
            {/* Split content by paragraph to render with spacing (e.g., using two newlines as a separator) */}
            {blog.content.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
            ))}
            {/* Note: Since our dummy data is short, this paragraph splitting is a nice touch for structure. */}
            <p className="pt-4 italic text-gray-500">
                --- End of Article ---
            </p>
          </div>

        </article>
      </div>
    </div>
  );
};

export default SingleBlogPage;