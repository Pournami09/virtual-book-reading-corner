import { useState } from 'react';
import { Plus, BookOpen, Star, Clock, ExternalLink } from 'lucide-react';
import { libraryService } from '../services/libraryService';

const SearchResults = ({ results, isLoading, onAddBook }) => {
  const [addingBooks, setAddingBooks] = useState(new Set());

  const handleAddBook = async (book) => {
    setAddingBooks(prev => new Set(prev).add(book.id));
    
    try {
      const success = libraryService.addBook(book);
      if (success) {
        onAddBook?.(book);
      }
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

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(' and ');
    return `${authors[0]} and ${authors.length - 1} others`;
  };

  const formatPageCount = (pageCount) => {
    if (!pageCount) return 'Unknown pages';
    return `${pageCount} pages`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4" role="status" aria-label="Loading search results">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="flex space-x-4">
              <div className="w-16 h-24 bg-amber-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-amber-200 rounded w-3/4"></div>
                <div className="h-3 bg-amber-200 rounded w-1/2"></div>
                <div className="h-3 bg-amber-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12" role="status">
        <BookOpen className="w-16 h-16 text-amber-400 mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-amber-800 mb-2">No books found</h3>
        <p className="text-amber-600">Try searching for a different book or author.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" role="region" aria-label="Search results">
      {results.map((book) => {
        const isAdding = addingBooks.has(book.id);
        const isInLibrary = libraryService.hasBook(book.id);
        
        return (
          <div 
            key={book.id} 
            className="card hover:shadow-lg transition-shadow duration-200"
            role="article"
            aria-label={`Book: ${book.title} by ${formatAuthors(book.authors)}`}
          >
            <div className="flex space-x-4">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={`Cover of ${book.title}`}
                    className="w-16 h-24 object-cover rounded-lg shadow-md"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-16 h-24 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg flex items-center justify-center shadow-md">
                    <BookOpen className="w-8 h-8 text-amber-600" aria-hidden="true" />
                  </div>
                )}
              </div>

              {/* Book Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-amber-900 mb-1 line-clamp-2">
                  {book.title}
                </h3>
                
                <p className="text-amber-700 mb-2">
                  by {formatAuthors(book.authors)}
                </p>

                {/* Book Details */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-amber-600 mb-3">
                  {book.publishedDate && (
                    <span>{new Date(book.publishedDate).getFullYear()}</span>
                  )}
                  {book.pageCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {formatPageCount(book.pageCount)}
                    </span>
                  )}
                  {book.averageRating > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                      {book.averageRating.toFixed(1)} ({book.ratingsCount} ratings)
                    </span>
                  )}
                </div>

                {/* Description */}
                {book.description && (
                  <p className="text-amber-700 text-sm line-clamp-3 mb-3">
                    {book.description}
                  </p>
                )}

                {/* Categories */}
                {book.categories && book.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {book.categories.slice(0, 3).map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                {isInLibrary ? (
                  <span className="text-amber-600 text-sm font-medium px-3 py-2">
                    In Library
                  </span>
                ) : (
                  <button
                    onClick={() => handleAddBook(book)}
                    disabled={isAdding}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Add ${book.title} to library`}
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    {isAdding ? 'Adding...' : 'Add to Library'}
                  </button>
                )}

                {book.previewLink && (
                  <a
                    href={book.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2 text-center"
                    aria-label={`Preview ${book.title} on Google Books`}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Preview
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
