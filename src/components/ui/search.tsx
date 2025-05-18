import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  debounceTime?: number;
}

export const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = "Pesquisar ferramenta...",
  className = "",
  debounceTime = 300
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, debounceTime);
    
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onSearch, debounceTime]);
  
  // Clear search
  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };
  
  return (
    <motion.div 
      className={`relative w-full ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className={`
          relative flex items-center w-full rounded-lg 
          bg-[#1A1A1A]/90 backdrop-blur-sm
          border transition-all duration-200
          ${isFocused 
            ? 'border-[#9333EA] shadow-[0_0_0_1px_rgba(147,51,234,0.3)]' 
            : 'border-zinc-700 hover:border-[#9333EA]/50'
          }
        `}
      >
        <SearchIcon 
          className={`
            absolute left-3 h-4 w-4 transition-colors duration-200
            ${isFocused ? 'text-[#9333EA]' : 'text-zinc-400'}
          `}
        />
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            w-full bg-transparent py-2 pl-10 pr-10 text-white 
            placeholder:text-zinc-400 focus:outline-none
          "
        />
        
        <AnimatePresence>
          {inputValue && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={handleClear}
              className="absolute right-3 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Search;
