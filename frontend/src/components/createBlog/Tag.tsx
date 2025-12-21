import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react'; // Using lucide-react for the icon

interface TagsInputProps {
    tags : string[],
    setTags : (tags : React.SetStateAction<string[]>) => void
}

const TagsInput = ({ tags, setTags }: TagsInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== "") {
      e.preventDefault();
      // Prevent duplicate tags
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    } else if (e.key === 'Backspace' && inputValue === "" && tags.length > 0) {
      // Remove last tag if backspace is pressed on empty input
      removeTag(tags.length - 1);
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full max-w-2xl h-fit flex flex-col gap-4">
      
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg border bg-slate-900 border-slate-800 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
        {/* Render existing tags */}
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-md"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="hover:bg-blue-500/20 rounded-full p-0.5 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}

        {/* The Actual Input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Add tags..." : ""}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-gray-200 placeholder:text-gray-600 py-1"
        />
      </div>
      
      <p className="text-xs text-gray-500">Press Enter to add a tag</p>
    </div>
  );
};

export default TagsInput;