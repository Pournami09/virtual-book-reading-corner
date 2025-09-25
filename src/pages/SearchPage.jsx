import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { bookService } from '../services/bookService';
import SearchResults from '../components/SearchResults';

const SearchPage = ({ onBack, onAddBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    setRecentSearches(bookService.getRecentSearches());
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await bookService.searchBooks(query);
      setSearchResults(results);
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
    onAddBook?.(book);
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div className="min-h-screen">
      {/* Simple Header */}
      <div className="py-4 px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200"
            aria-label="Back to library"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </button>
          <h1 className="font-handwriting text-slate-800 text-xl">
            Search Books
          </h1>
        </div>
      </div>

      {/* Search Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books, authors, genres..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full px-4 py-3 bg-slate-800/90 border border-slate-600/50 rounded-lg text-slate-50 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm text-lg"
              aria-label="Search for books"
            />
          </div>
        </div>

        {/* Search Results or Recent Searches */}
        {searchQuery ? (
          <SearchResults 
            results={searchResults} 
            isLoading={isSearching}
            onAddBook={handleAddBook}
          />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Start Searching</h3>
            <p className="text-slate-600 mb-6">Enter a book title, author, or genre to find books</p>
            
            {recentSearches.length > 0 && (
              <div className="max-w-md mx-auto">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">Recent Searches</h4>
                <div className="space-y-2">
                  {recentSearches.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(query)}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition-colors border border-slate-200"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
