import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange } : {searchTerm: string, onSearchChange: (value: string) => void}) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-10">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-400" />
      <input
        type="text"
        placeholder="Search by title, keywords, or content..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full py-3 pl-12 pr-4 bg-gray-800 text-gray-200 border border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 shadow-md placeholder-gray-500"
      />
    </div>
  );
};

export default SearchBar;