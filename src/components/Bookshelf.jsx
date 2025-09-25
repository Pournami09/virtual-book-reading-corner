import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import BookSpine from './BookSpine';
import PlantDecoration from './PlantDecoration';
import { libraryService } from '../services/libraryService';

const Bookshelf = ({ onBookSelect, onSearchClick }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = () => {
    const libraryBooks = libraryService.getBooks();
    setBooks(libraryBooks);
  };

  const handleBookSelect = (book) => {
    onBookSelect?.(book);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Simple Header with Search */}
      <div className="text-center mb-32 pt-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-handwriting text-slate-800">
            welcome to your cozy reading corner, Poro
          </h1>
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200"
            aria-label="Search for books"
          >
            <Search className="w-4 h-4" />
            Search Books
          </button>
        </div>
      </div>

      {/* Bookshelf container */}
      <div className="relative">
        {/* Bookshelf base */}
        <div className="relative bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-xl shadow-lg h-12 flex items-center justify-center max-w-2xl mx-auto wooden-texture">
          {/* Wood grain effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-700/30 via-transparent to-amber-700/30 rounded-t-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-amber-600/20 to-transparent rounded-t-xl"></div>
          
          {/* Wood grain lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1 left-0 right-0 h-px bg-amber-600"></div>
            <div className="absolute top-3 left-0 right-0 h-px bg-amber-600"></div>
            <div className="absolute top-5 left-0 right-0 h-px bg-amber-600"></div>
            <div className="absolute top-7 left-0 right-0 h-px bg-amber-600"></div>
            <div className="absolute top-9 left-0 right-0 h-px bg-amber-600"></div>
          </div>
          
          {/* Shelf details */}
          <div className="absolute top-1 left-2 right-2 h-0.5 bg-amber-600/50 rounded-full"></div>
          <div className="absolute top-2 left-3 right-3 h-0.5 bg-amber-500/30 rounded-full"></div>
        </div>

        {/* Books container */}
        <div className="absolute -top-48 left-1/2 transform -translate-x-1/2 flex items-end space-x-1">
          {books.length > 0 ? (
            books.slice(0, 5).map((book, index) => (
              <BookSpine 
                key={book.id} 
                book={book} 
                index={index}
                onClick={() => handleBookSelect(book)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-amber-700 text-lg">Your bookshelf is empty</p>
              <p className="text-amber-600 text-sm mt-2">Search for books above to add them to your library</p>
            </div>
          )}
        </div>

        {/* Plant decoration - positioned on top of shelf */}
        <div className="absolute -top-6 right-8 md:right-12">
          <PlantDecoration />
        </div>
      </div>

      {/* Library Statistics */}
      <div className="mt-16 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-slate-50/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-slate-600/30">
            <h3 className="font-semibold text-slate-800 mb-1">Total Books</h3>
            <p className="font-bold text-slate-600">{books.length}</p>
          </div>
          <div className="bg-slate-50/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-slate-600/30">
            <h3 className="font-semibold text-slate-800 mb-1">Books Read</h3>
            <p className="font-bold text-slate-600">
              {books.filter(book => book.isRead).length}
            </p>
          </div>
          <div className="bg-slate-50/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-slate-600/30">
            <h3 className="font-semibold text-slate-800 mb-1">In Progress</h3>
            <p className="font-bold text-slate-600">
              {books.filter(book => book.readingProgress > 0 && book.readingProgress < 100).length}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Bookshelf;
