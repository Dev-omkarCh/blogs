import Header from '@/components/blogs/Header';
import SideBar from '@/components/blogs/SideBar';
import BlogsFeed from '@/components/blogs/BlogsFeed';

/*
    id: ...,
    title: rust,
    excerpt : Exploring the deep architectural patterns that modern engineering teams use to maintain high availability...
    author : Omkar
    category : Backend
    stats: {
        views: 10, # only Auth users are counted
        anoymys: 100, # only Non-Auth users are counted
        likes: 5, # Only Auth users can like
        comments: 24, # Only Auth users can comment
        readTime: 8min
        isHot: blog.latest + ( blog.mostLikes + blog.mostComments + blog.mostAnoymysViews )
        image: ...
        isPopular : blog.mostLikes + blog.mostComments
    }

*/


const BlogExplorer = () => {

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <SideBar />
          <BlogsFeed />
        </div>
      </div>
    </div>
  );
};

export default BlogExplorer;