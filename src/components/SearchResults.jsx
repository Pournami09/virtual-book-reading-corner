import { useState } from 'react';
import { Plus, BookOpen, User, Calendar } from 'lucide-react';
import { libraryService } from '../services/libraryService';

const SearchResults = ({ results, isLoading, onAddBook }) => {
  const [addingBooks, setAddingBooks] = useState(new Set());

  const handleAddBook = async (book) => {
    setAddingBooks(prev => new Set(prev).add(book.id));
    
    try {
      await libraryService.addBook(book);
      onAddBook?.(book);
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setAddingBooks(prev => {
        const newSet = new Set(prev);
        newSet.delete(book.id);
        return newSet;
      });
    }
  };

  const isBookInLibrary = (bookId) => {
    const libraryBooks = libraryService.getBooks();
    return libraryBooks.some(book => book.id === bookId);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Searching for books...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-800 mb-2">No books found</h3>
        <p className="text-slate-600">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">
        Search Results ({results.length})
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((book) => {
          const isAdding = addingBooks.has(book.id);
          const inLibrary = isBookInLibrary(book.id);
          
          return (
            <div
              key={book.id}
              className="bg-slate-50/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-slate-600/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Book Cover */}
              <div className="flex justify-center mb-4">
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={`Cover of ${book.title}`}
                    className="w-32 h-48 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-32 h-48 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center shadow-md">
                    <BookOpen className="w-12 h-12 text-slate-500" />
                  </div>
                )}
              </div>

              {/* Book Info */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800 line-clamp-2">
                  {book.title}
                </h4>
                
                <div className="flex items-center gap-1 text-slate-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm">
                    {book.authors?.join(', ') || 'Unknown Author'}
                  </span>
                </div>
                
                {book.publishedDate && (
                  <div className="flex items-center gap-1 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(book.publishedDate).getFullYear()}
                    </span>
                  </div>
                )}
                
                {book.description && (
                  <p className="text-slate-600 text-sm line-clamp-3">
                    {book.description}
                  </p>
                )}
              </div>

              {/* Add Button */}
              <div className="mt-4">
                {inLibrary ? (
                  <div className="w-full py-2 px-4 bg-green-100 text-green-800 rounded-lg text-center font-medium">
                    ✓ In Library
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddBook(book)}
                    disabled={isAdding}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 text-white rounded-lg transition-colors duration-200 font-medium"
                  >
                    {isAdding ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add to Library
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
