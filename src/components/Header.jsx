import { useState, useEffect } from 'react';
import { BookOpen, Search, User, Moon, Sun, X } from 'lucide-react';
import { bookService } from '../services/bookService';
import SearchResults from './SearchResults';

const Header = ({ onLibraryUpdate, onSearchClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Kept for visual consistency, but search logic moved
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    setRecentSearches(bookService.getRecentSearches());
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearchResults && !event.target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearchResults]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await bookService.searchBooks(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleAddBook = (book) => {
    onLibraryUpdate?.();
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  return (
    <header className="bg-slate-900/20 backdrop-blur-md border-b border-slate-600/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-700 rounded-lg flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <h1 className="font-handwriting text-slate-100 font-bold">
              Vibe Book Library
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 relative search-container">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search books, authors, genres..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => {
                  onSearchClick?.(); // Triggers navigation to SearchPage
                }}
                className="w-full pl-10 pr-10 py-2 bg-slate-800/90 border border-slate-600/50 rounded-lg text-slate-50 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm cursor-pointer"
                aria-label="Search for books"
                readOnly // Made readOnly as it now navigates to a new page
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown - Removed as search is now a page */}
            {/* ... */}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-slate-800/20 hover:bg-slate-800/30 text-slate-100 transition-colors duration-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button 
              className="p-2 rounded-lg bg-slate-800/20 hover:bg-slate-800/30 text-slate-100 transition-colors duration-200"
              aria-label="User profile"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;